---
grand_parent: API
layout: default
nav_order: 70
parent: Other Nodes
title: genrule()
---

# genrule()
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




```python
genrule(...)
```

A genrule() enables you to run a bash command or a python function either during the prepare or the build process to generate files.

Inherits all attributes from [ActionNode]({{ "/docs/api/base_nodes/action_node" | relative_url }}).

| Attribute | Type | Description |
|-----------|------|-------------|
| `inputs` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of files that could invalidate the results of this command. |
| `extra_srcs` | | Backwards compatible alias for `inputs`. ]
| `outputs` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of files that are expected to be generated by this command. If the generated files are older than the sources the rule will be executed again. If the files are not present after the command is finished running, an exception is raised. |
| `gen_srcs` | | Backwards compatible alias for `outputs`. ]
| `cwd` | `filename` | The directory to use as the current working dir when the bash command is invoked. Defaults to a folder owned by MB. |
| `srcs` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of files that MB copies into a custom directory before invoking the bash script. This is only useful when invoking script that require a specific input file structure inside the CWD. Most scripts can just use `inputs` instead. |
| `cmd` | `string` | The generation rule specified as a `bash` command (by default or specified with `target.shell("bash")`) or `batch` command (specified with the filter `target.shell("batch")`). |
| `exec` | `string` | The generation rule specified as a command that is execute from the python process (`subprocess.Popen`). |
| `env_vars` | `dict<string, string>` | If the rule is based on a `bash`, `batch` or `exec` command, you can pass user defined custom environment variables to it via this argument. |
| `env_paths` | `dict<string, string>` | If the rule is based on a `bash`, `batch` or `exec` command, you can pass user defined custom environment variables that are treated as paths (they will be escaped properly for the shell and if a list is passed, they are gonna be merged with the `environment_expansion_separator`) to it via this argument. |
| `environment_expansion_separator` | `string` | String used to separate the file paths injected into the ENV when invoking the bash command. Defaults to `" "`, so using paths that contain spaces inside variables might not work correctly |
| `py` | [`<py method>`]({{ "/docs/guides/general/py_method" | relative_url }}) | The generation rule specified as a Python method. |
| `args` | `dictionary` | Arguments that can be passed to the Python method above (see [Example 2](#example-2) below).|

One and only one of the arguments `py`, `cmd` or `exec` must be specified. `py` is the preferred way. The other methods are planned for deprecation and their development has stopped.
{: .label .label-yellow}

If `py` is used, the genrule will run a Python function. If `cmd` is specified, the genrule will run a bash or batch script. To run `cmd` based genrules on Windows, MetaBuild uses `cmd.exe`or MSYS2 environment if invoked with `bash`. In this case MetaBuild either needs to have the path to a preinstalled MSYS2 or it will automatically download its own copy when not available. Read more [here]({{ "/docs/api/remote_nodes/meta_tool" | relative_url }}).

To write to a file within a Python function, it is recommended to use the `update_file(file, contents)` function instead of the native `write()` function in Python. `update_file` does not alter the timestamp of the file in case the file has not changed, which will not invalidate the builds unnecessarily.

## Python methods

There are a number of properties that `genrule.py` injects on top of the methods of the [``ctx``]({{ "/docs/guides/general/py_method" | relative_url }}).
Any property not listed here is exposed by accident and should not be used. We plan to clean up any argument exposed that should not be used in [METAB-540](https://jira.corp.adobe.com/browse/METAB-540).

| `ctx.out` | `string` | The output path where generated files are supposed to be created. |
| `ctx.status_file` | `string` | Path to the status file that MB generates automatically after the script is finished. |
| `ctx.args` | `dict` | The values from the `args` passed from `genrule` |
| `ctx.srcs_dir` | `string` | A temporary folder that can be used for intermediate files. |
| `ctx.copy_cmds` | `list(tuple<source, dest>)` | List of copy commands generated from the `srcs` property of the `genrule`. All files are copied over to `srcs_dir` before invoking the method. |
| `ctx.inputs` | `list<string>` | List of input files. |
| `ctx.outputs` | `list<string>` | List of output files. |

### Example 1

```python
MAJOR_VERSION = 0
MINOR_VERSION = 20
PATCH_VERSION = 8

def pxr_header_generator(ctx):
    template_file = ctx.inputs[0]
    output_file = ctx.outputs[0]

    with open(template_file, "r") as f:
        template_ = f.read()
    template_ = template_.replace("@PXR_MAJOR_VERSION@", str(MAJOR_VERSION))
    template_ = template_.replace("@PXR_MINOR_VERSION@", str(MINOR_VERSION))
    template_ = template_.replace("@PXR_PATCH_VERSION@", str(PATCH_VERSION))

    update_file(output_file, template_)

genrule(
    name = "pxr_header",
    phase = "prepare",
    py = pxr_header_generator,
    inputs = [
        "$(location :usd_git)/pxr/pxr.h.in",
    ],
    outputs = [
        "pxr/pxr.h",
    ],
)
```

### Example 2

Here, we show the usage of `args`. 

- Prefer to use args, instead of calling `ctx.eval_async()` inside the genrule. `args` are evaluated at prepare time and saved in an action_data.json file. Using `ctx.eval_async` instead of args can slow down the execution if the genrule is for the build phase.
- To pass lists as arguments via the `args` parameter, use the `"property_name[]"` notation for the key (to prevent the list from being flatten) - see the example above.
- `List[Tuple]` is also a special case - you can pass a list of tuples directly because MetaBuild will try to interpret it as a filter (`Error: MetaException: Invalid filter used for tuple value`). To work around that limitation either:
    - split it as two lists:
        ```python
        args = {
            "one[]" : [t[0] for t in tuples]
            "two[]" : [t[1] for t in tuples]
        }
        ```
    - convert it into a dictionary:
        ```python
        args = {
            "tuples[]" : [{index : value for index, value in enumerate(t)} for t in tuples]
        }
        ```

```python
def _write_exe_location(ctx):
    output_file = ctx.outputs[0]
    update_file(output_file, json.dumps(ctx.args))

genrule(
    name = "write_exe_location",

    # We will have to generate a file for each config and architecture that we support.
    sharing = "build_arch",

    phase = "prepare",
    py = _write_exe_location,

    # Note: 
    args = {
        "my_exe": "$(exe :myexe)",

        # By default MB treat arrays as alternative values for the same property.
        # If for any reason you need to collect multiple values in this JSON inside
        # an array value, then you need to let MB know that's your intent by adding
        # the `[]` suffix to the end of the property name:
        "my_generated_files[]" : "$(generated_files :my_script)",
        "cpp_files[]" : glob_cpp("./srcs/**"),
    },

    outputs = [
        "file.json",
    ],
)
```

## Bash/Batch scripts

Scripts are planned for deprecation. We are not planning to add features to them or fix any bugs. Please use the python scripts instead.
{: .label .label-yellow}

MB generates a `.sh` or a `.bat` file using the `cmd` arguments. As a result, the cmd can actually contain `\n` characters which can be used to generate more complex bash/batch scripts or add more commands into a single command.

The values inside the `env` dictionary are automatically injected into the script.

On top of the `env` properties, these are a number of builtin variables injected automatically:

| `ROOTDIR` | Path to the `dist` folder of the entire project. |
| `OUT` | Folder where the generated files should be placed. Defaults to a folder created by MB. Can be changed using the `out` property of the `genrule`. |
| `SRCDIR` | The folder where MB copies the files from the `srcs` property. |
| `CWD` | The CWD used to invoke the `genrule` command. Can be changed using the `cwd` property. |
| `SRCS` | List of input files copied into the `SRCDIR`. |
| `INPUTS` | List of input files. These files are not copied by MB and point directly to their original locations. |
| `OUTPUTS` | List of output files that MB expects the script to generate. |
| `SRCS_NATIVE` | Same as `SRCS`, but uses the native file format of the platform. This is useful when running Windows apps from bash scripts via `MSYS2` on Windows. |
| `INPUTS_NATIVE` | Same as `INPUTS`, but uses the native file format of the platform. |
| `OUTPUTS_NATIVE` | Same as `OUTPUTS_NATIVE`, but uses the native file format of the platform. |

Use the `environment_expansion_separator` property to change the separator token used for the list of files above: `SRCS`, `INPUTS`, `OUTPUTS`, `SRCS_NATIVE`, `INPUTS_NATIVE`, `OUTPUTS_NATIVE`.

```python
git_checkout(
    name = "git_checkout",
    repo = "git@git.corp.adobe.com:meta-build/meta-build.git"
)

genrule(
    name = "run_bash",
    phase = "prepare",

    env_paths = {
        "GIT_FOLDER": "$(location :git_checkout)"
    },

    cmd = [
        "cd ${GIT_FOLDER}\n",

        # {OUT} is defined by MetaBuild.
        "git rev-parse HEAD > ${OUT}/commit.txt\n",
    ],

    outputs = [
        # Let MB know we expect to generate this file.
        "commit.txt",
    ],

    # Let MB know to run this all the times as the value might
    # change due to external factors.
    cache = False,
)
```

### Example

Here, we show how an external generator executable can be downloaded from artifactory and get used.

```python
http_file(
    name="generation_machinery",
    urls="http://www.generationmachinery.com/generator.exe",
)
genrule(
    name = "example_rule_02",
    # {OUT} will be defined by metabuild.
    cmd = "${GENERATION_MACHINERY} config.h.in > ${OUT}/config.h",
    inputs = [
        "config.h.in"
    ],
    outputs = [
        "config.h"
    ],
    env_paths = {
        "GENERATION_MACHINERY": "$(location :generation_machinery)"
    },
    phase = "prepare",
    deps = [":generation_machinery"],
)
```

## Exec command

`Exec` is planned for deprecation. We are not planning to add features to them or fix any bugs. Please use the python scripts instead.
{: .label .label-yellow}

The `exec` api is used to run an application from the metabuild python process (`subprocess.Popen`). The values inside the `env` dictionary are used in the environment of the newly created process.

### Example

```
genrule(
    name = "test_exec",
    env_vars = {
        "GENRULE_TEST_ENV": "env_var_value",
    },

    sharing = "build_arch",

    outputs = [
        "test_file_read_env.h"
    ],

    exec = ["$(exe :read_env#host)", "$(location)"],

    deps = [
        ":read_env#host"
    ],
)
```


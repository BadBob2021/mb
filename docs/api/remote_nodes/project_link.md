---
grand_parent: API
layout: default
nav_order: 10
parent: Remote Nodes
title: project_link()
---

# project_link()
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
project_link(name, root = None)
```

Inherits all attributes from [OutMetaNode]({{ "/docs/api/base_nodes/out_meta_node" | relative_url }}).

| Attribute | Type | Description |
|-----------|------|-------------|
| `root` | [`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }}) | Optional. The location of the Meta Project. Useful when overriding the project (see [example](https://git.corp.adobe.com/meta-samples/custom_repos)) |

Informs MetaBuild that your project will use another project that has its own META.py file.

## How does MetaBuild resolve the project?

There are multiple ways to tell MetaBuild where to find the path to the `META.py` file of the project that we would like to link to. The most common way is using the `version` configuration.

### TL;DR

| Parameter | Meaning | Location |
|-----------|-------------|-------------|
| |__Variant 1__| | 
| `repo` | The repository where the spec file (META.py) lives. | config files (e.g. `META.lock`) |
| `commit` | The commit of the repository where the spec file (META.py) lives. | config files (e.g. `META.lock`) |
| `path` | Alternative to repo. While repo is assumed to be a string, this param is assumed to be a path. It is useful for the `type=folder`. | config files (e.g. `META.lock`) |
| `type` | Optional. The type of repository. Current accepted values: `git`, `folder`. Default is `git`. | config files (e.g. `META.lock`) |
| `submodules` | Optional. Should the submodules of the repo be checked out too. Default is `false`. | config files (e.g. `META.lock`) |
| |__Variant 2__| | 
| `version` | If the repo is registered in [`meta-libs`](https://git.corp.adobe.com/meta-build/meta-libs), you can just use a single version value. | config files (e.g. `META.lock`) |
| |__Variant 3__| | 
| `inherit_from=other_project` | Tell MetaBuild to read the lock file of another project and use whatever value is specified there. If you use this variant, you also need to have a `project_link()` to `other_project` and specify how `other_project` should be retrieved. | config files (e.g. `META.lock`) |
| |__Variant 4__| | 
| `local_link` | Path to META.py file on disk. (relative paths are made absolute w.r.t to config file directory). | config files (e.g. `META.lock`) |
| |__Variant 5__| | 
| `root` | Path to META.py file on disk. | spec files (`*.meta.py` for `META.py`) |

`lib_version`: This is not a part of the package management machinery. Some MetaBuild projects are stored separately from the source code and support multiple source code versions. By conventions such projects have an option named `lib_version` that says what the version of the source code should be. For example, see [here](https://git.corp.adobe.com/meta-specs/FBX/blob/v3000.1.16/META.py#L12-L19).
{: .label .label-green }


### Variant 1: `repo` and `commit` are used

These are also MetaBuild [configs]({{ "/docs/cli/metabuild_config" | relative_url }}). They are the link and commit to a git repo, respectively, which contains the META.py file of the project (the path should be either `META.py` or `META/META.py` within the repo). See an example usage [here](https://git.corp.adobe.com/euclid/stager/blob/f7c29c0e73f9e75307d2f9d32019684743e1fea8/META/META.lock#L174-L176).

### Variant 2: `version` is used

When only `version` is used (see [example here](https://git.corp.adobe.com/euclid/stager/blob/develop/META/META.lock#L132-L133)), MetaBuild will look for a folder with the project's name inside the [meta-libs](https://git.corp.adobe.com/meta-build/meta-libs/tree/main/libs). First, MetaBuild looks if there is a file having the same name as the version, e.g., [googletest/1.8.1.py](https://git.corp.adobe.com/meta-build/meta-libs/blob/main/libs/googletest/1.8.1.py). If such file is found, MetaBuild will use the information in that file to find the repository and sha1 where the `META.py` file is located. If such file is not found, MetaBuild will look for a `META.py` file inside meta-libs, e.g., [googletest/META.py](https://git.corp.adobe.com/meta-build/meta-libs/blob/main/libs/googletest/META.py). This is a special file with a `git_tags()` command which tells MetaBuild the repository where the actual `META.py` file is located and how to map the `version` to a tag in that repo. If none of these files are found, MetaBuild will print an error that the project cannot be loaded.

If nothing is supplied in the configs, MetaBuild will find the latest version in `meta-libs` and add that to the `META.lock` file after running `metabuild prepare`.

If `version` is used, and you try to only override the `commit` via a config, MetaBuild will add the missing info (e.g. repo) to the
lock file too. See [reason]({{ "/docs/changelog/0.2#0275-pr1-pr2" | relative_url }}).

**Note**: Only SemVer based version strings are supported by MetaBuild for now. If any project that uses 4 numbers for versions, MetaBuild would currently reject such versions. To accommodate that, use `a.b.c-build.d`. For example, to have a version 6.6.0.24 represented in meta-libs, use `6.6.0-build.24`.
{: .label .label-green }


### Variant 3: `inherit_from` is used

This is useful when you simply want to tell MetaBuild to trust the version specified by one of your upstream dependencies. This is especially useful when the root project would like to [disambiguate diamond shape dependencies](#include-what-you-use). See an example usage [here](https://git.corp.adobe.com/euclid/stager/blob/f7c29c0e73f9e75307d2f9d32019684743e1fea8/META/META.lock#L59-L60).

Note that when `[a]inherit_from=b` is used there should exist a `project_link` from your project to both `a` and `b`, i.e., you should have
```python
project_link("a")
project_link("b")
```
in your specs.


### Variant 4: `local_link` is used

Explicitly tells MetaBuild where the folder containing the META.py file of the project is locally. Note that relative paths are resolved according to [`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }}) docs. [Example](https://git.corp.adobe.com/meta-samples/custom_repos/blob/58c85444c47eafc66f4f1ecbb51ef25952bb93a9/META.py#L11).

If you use this `local_link=other_project`, you also need to have a `project_link()` to `other_project` and specify how `other_project` should be retrieved.
{: .label .label-yellow }

### Variant 5: `root` parameter is used

__Deprecated__, This is similar to using the `local_link` config, but it is a parameter passed to the `project_link` function. We support this for backward compatibility, but it is deprecated. Avoid using it. It does not work properly if [inherit_from](#variant-3-inherit_from-is-used) is used.

## Note on `lib_version`

Note that for third party libraries we often do not place the `META.py` file (specs) besides the source code, and instead place them in a repo under [meta-specs](https://git.corp.adobe.com/meta-specs). This allows a single version of the spec to support multiple version of the third party. In this scenario, `version` would be the version of the spec and not the version of the third party. It is up the the spec to decide what version of the third party itself should be used. By convention we use a option named `lib_version` within the specs (see an example of the [spec](https://git.corp.adobe.com/meta-specs/glad/blob/bb09ea6c9bfca8bdb8abc82ffc6e1352cd621ebd/options.meta.py#L5-L14) and downstream [usage](https://git.corp.adobe.com/euclid/stager/blob/f7c29c0e73f9e75307d2f9d32019684743e1fea8/META/META.lock#L147-L149). Note that this is entirely up to the spec, and is not a feature of MetaBuild itself.

## Include what you use

Note that MetaBuild will never load a project more than once. The root project's specification on how the project should be loaded always takes priority over what its dependencies request. 

If two dependencies A and B both request for a common third dependency C via project_link (diamond shape dependency), MetaBuild will emit an error, and ask the root project to disambiguate and explicitly say how project C should be resolved. See [the different available methods](#how-does-metabuild-resolve-the-project).

**Note**  This is a potentially breaking change introduced in MB version `0.1.303`. Prior to this version, you could experience random failures due to the project loading order in this scenario. The new version makes MB more strict with project loading logic in order to make this failure predictable.
{: .label .label-yellow }

## Fixing faulty `project_link`s in upstream projects

If you get an error that a downstream subproject cannot load another project, you can find which one actually defined the `project_link` and then add a reference to it as if your own project needed that dependency directly. That is similar to the `inherit_from` example above, which should tell MB how to find that dependency.

Note that the project used by the `inherit_from` property now becomes your own dependency, so you may need to do that recursively until you reach a project that is already linked directly from your own project.

Projects are allowed to load a `project_link` introduced by a parent project. That model is not introducing an undefined behavior, so MB doesn't restrict it.

As a result, a root project can fix any of its subprojects by adding the `project_link` to their own project as a temporary measure until the upstream projects fix their own dependencies.


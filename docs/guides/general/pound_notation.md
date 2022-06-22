---
grand_parent: User Guides
layout: default
nav_order: 200
parent: General
title: The Pound Notation
---

# The Pound Notation
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>


## Overview

The xcode and msvs backends of MetaBuild support scenarios where a target (e.g., c++ executable) from one build config, architecture or platform, depends on a target from another platform via the `#` notation, e.g. `stager//:binary#arch=x64`

This workflow can be complicated, so we advise you to avoid it unless necessary (as in you considered other alternatives in the docs, and also asked about better workflows in #metabuild slack channel). Do not start using this workflow just because it might do the job.

The main useful scenario for this workflow is when you are generating a project for a mobile device (e.g. android, ios) but you have a tool executable that needs to be built for the host platform (i.e. macos or win32). That being said since CMake does not support this workflow, using the alternative workflow of using a genrule (https://git.corp.adobe.com/meta-samples/bottlenecks-other-compiler-example) instead. 

We support this workflow to make it easier for project that relied on this behaviour already and are transitioning to MetaBuild.


| Item | Xcode | MSVS | CMake | Possible values | Notes | 
|------|-------|------|-------|-----------------|-------|
|`#<full_target_ref_of_flavor>=<value>`|Yes|Yes|Yes|The values that the flavornode supports (see https://git.corp.adobe.com/pages/meta-build/docs/api/flavor/).|This can be used to mention which flavor of a flavored target you are referring to. Related: https://git.corp.adobe.com/pages/meta-build/docs/api/flavor/Caveat: For the flavor target reference (https://git.corp.adobe.com/pages/meta-build/docs/guides/target_refs/) you have to use the full value and not the shortcuts (Note for Robert: should we also add this note to the https://git.corp.adobe.com/pages/meta-build/docs/api/flavor/ page?). aims to fix this.|
|`#host`|Yes|Yes|No|N/A|Behaviour: sets the arch and platform accordingly to something that can run on the builder machines. E.g if you are building for ios on an intel Mac laptop the #host will request a target that has arch=macos and arch=x64.Known caveat: If you are building a project for "macos" arm64 only (mb.active_arch=arm64 https://git.corp.adobe.com/meta-build/meta-build/blob/main/metabuild/config/default_config.yaml#L15-L16) and need an executable to run on host#host (and the host is x64) this will not work.A workaround is available https://git.corp.adobe.com/DVA/dva/blob/e5eab165944d15c915e42e63dc7f109ad9862091/shared/third_party/projects/luac/project/luac.meta.py#L5 for this scenario.
|`#compat_host`|No|Unknown|No|N/A|Do not use this, it is not officially supported. We have a task to investigate why usages of it exist in github (METAB-841 - Investigate `<target_ref>#compat_host` and `<target_ref>#arch=host` TO DO) .|
|`#arch=<value>`|No|Yes|No|arm64, arm32, x86, x64|You might also see #arch=host. Do not use this, it is not officially supported. We have a task to investigate why usages of it exist in github (METAB-841 - Investigate `<target_ref>#compat_host` and `<target_ref>#arch=host` TO DO ).|
|`#platform=<value>`|Yes|Yes|No|Xcode: ios, macos. MSVS: uwp, win32.|||
|`#config=<value>`|No|Yes|No|Release, Debug, Coverage|||


**Note:** Multiple values can come after # separate by `, ,` -- e.g. `stager//:binary#stager//flavors:backend=vulcan,arch=x64`


## Example

Inspired from our unit test (https://git.corp.adobe.com/meta-build/meta-build/blob/0.2.88/tests/generator/__fixtures__/gen_rule_app/A.meta.py#L1-L103).

```
# This will create an executable that should generate some files needed for the build.
# As mentioned this is not supported for platform that need CMake as backend, so for those cases, consider
# We support this workflow to make it easier for project that relied on this behaviour already and are transitioning to MetaBuild.
cxx_binary(
    name = "generator",
    srcs = [
        "generator.cpp"
    ],
    xcode_product_type = (~target.ios, "tool"),
)
 
async def _run_binary(ctx):
    binary = ctx.inputs[0]
    output_file = ctx.outputs[0]
    output_txt = await ctx.execute([binary])
    update_file(output_file, output_txt)
 
genrule(
    name = "gen_test_file_h",
    inputs = [
        "$(exe :generator#host)"
    ],
    outputs = [
        "test_file.h"
    ],
    py = _run_binary,
    deps = [
        # Does not matter what platform we are building for
        # this will refer to the one that is suitable for running on the builder.
        ":generator#host"
    ],
)
 
cxx_binary(
    name = "application",
    srcs = [
        "main.cpp",
         "$(generated_files :gen_test_file_h)",
     ],
    include_directories = [
        "$(location :gen_test_file_h)",
    ],
    deps = [
        ":gen_test_file_h",
    ]
)
```

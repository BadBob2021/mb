---
grand_parent: User Guides
layout: default
nav_order: 50
parent: MSVS Specific
title: Invoking Alternative MSVS Builders
---

# Invoking Alternative MSVS Builders
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




By default the command `metabuild build` will use the [`MSBuild`](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild?view=vs-2019) software to build your MSVS projects. Incredibuild BuildConsole and devenv.com (command line version of visual studio) are also supported. To change the builder, you can use the following config value `msvs.builder`. Accepted values are
```
msbuild              -> use msbuild, default
devenv               -> use devenv
incredibuild         -> use incredibuild with msbuild backend
incredibuild-msbuild -> use incredibuild with msbuild backend
incredibuild-devenv  -> use incredibuild with devenv backend
```

[Passing extra args]({{ "/docs/cli/metabuild_build#passing-arguments-to-build" | relative_url }}) is supported all the builders. Also, you can use all the [usual methods]({{ "/docs/cli/metabuild_config" | relative_url }}) to set the values of this config.

---
grand_parent: User Guides
layout: default
nav_order: 110
parent: General
title: Checking MetaBuild Version
---

# Checking MetaBuild Version
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




You can check MetaBuild's version in your MetaBuild specs, so if users try to access your project with an unsupported MetaBuild version, they get an informative error. The function is
`requires_metabuild(`[`<version_constraints>`]({{ "/docs/api/global/target#semver-constraints" | relative_url }})`)`.
For example, `requires_metabuild('>0.1.521')` or `requires_metabuild('>0.1.521 <0.1.600')`.

Similarly, the function `uses_metabuild(`[`<version_constraints>`]({{ "/docs/api/global/target#semver-constraints" | relative_url }})`)` will return true if the current version of MetaBuild satisfies the constraints. This function can be used if you need a spec to support older MetaBuild versions.

Only applications that have no dependencies are allowed to restrict the maximum version of MetaBuild. Libraries are only allowed to use `requires_metabuild` to specify a minimum version and must always try to support the latest version of MetaBuild. Read more in [Which version of MB should I use?]({{ "/docs/basics/versioning#note" | relative_url }})
{: .label .label-yellow }

It is possible to bypass this check for debugging purposes, using the configs


| Config | Type | Effect |
|-----------|------|-------------|
| `mb.disable_metabuild_version_check`| `bool` | Disable the MetaBuild version checks globally |
| `<projectname>.disable_metabuild_version_check` | `bool` | Disable the MetaBuild version check within project named `<projectname>`. This config has priority over the `mb` counterpart. |
| `mb.override_metabuild_version_check`| `version` | Fakes the MetaBuild version to be the specified value for all version checks |
| `<projectname>.override_metabuild_version_check`| `version` | Fakes the MetaBuild version to be the specified value within the project with name `<projectname>`.  This config has priority over the `mb` counterpart. |

Finally, you can filter items based on MetaBuild version. See [target.metabuild()]({{ "/docs/api/global/target#metabuild-version" | relative_url }})

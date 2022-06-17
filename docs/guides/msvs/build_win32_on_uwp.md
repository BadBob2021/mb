---
grand_parent: User Guides
layout: default
nav_order: 20
parent: MSVS Specific
title: Building as WIN32 on UWP
---

# Building as WIN32 on UWP
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




Some UWP projects require using regular WIN32 targets instead of compiling as Universal Projects. Use the [`target_remap`]({{ "/docs/api/base_nodes/meta_node" | relative_url }}) property to force all dependents that request a regular `UWP` configuration to switch to using the `WIN32` version instead.

```python
cxx_library(
    name = "win32_lib",
    target_remap = {
        target.uwp: target.win32
    }
    ...
)
```

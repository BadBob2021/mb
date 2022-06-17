---
grand_parent: API
layout: default
nav_order: 10
parent: Base Node Types
title: MetaNode
---

# MetaNode
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




*Abstract class*

Direct subclasses:

- [group()]({{ "/docs/api/nodes/group" | relative_url }})
- [meta_tool()]({{ "/docs/api/remote_nodes/meta_tool" | relative_url }})
- [SharedNode]({{ "/docs/api/base_nodes/shared_node" | relative_url }})

Most APIs in MetaBuild are actually MetaNode constructors with different types.

All types of meta nodes inherit attributes from the base `MetaNode` class.

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | `string` | The name of the meta node. This is used to uniquely identify the node across the project. |
| `project_name` | `string` | The name used to create the Xcode/MSVS/Cmake targets. By default MB uses the `name` property. |
| `project_subpath` | `string` | The subfolder used for this project inside the MSVS solution explorer. Other project types like Xcode use this path to change the scheme naming to allow better grouping. |
| `deps` | `list<`[`target_ref`]({{ "/docs/guides/general/target_refs" | relative_url }})`>` | List of nodes that the node depends on. |
| `excluded_deps` | `list<`[`target_ref`]({{ "/docs/guides/general/target_refs" | relative_url }})`>` | CxxNode's can use this to excluded flavors getting propagated to them to not get flavored. Also you can use this to escape flags getting inheritted from other CxxNode's. Note thate the latter usage has performance costs (needs reocomputation of the dependency graph), so it should be used with caution and only for MetaBuild default flags stored in the [bultin](https://git.corp.adobe.com/meta-build/meta-build/blob/0.2.68/metabuild/builtin/META.py) project. |
| `licenses` | `list<string>` | Reserved for future use. |
| `labels` | `list<string>` | Each MetaBuild node can be assigned a label. This can be used in the `resource_map` of `copy_artifacts()` and `cxx_binary()`. |
| `filter` | [`filter`]({{ "/docs/api/global/target" | relative_url }}) | Use this property to remove the node from specific platforms or configurations. |
| `target_remap` | `dict<`[`src_platform_filter`]({{ "/docs/api/global/target#platform-filters" | relative_url }})`, `[`dest_platform_filter`]({{ "/docs/api/global/target#platform-filters" | relative_url }})`>` | Remaps from the `src_platform_filter` platform to the `dest_platform_filter` platform. When a project needs to use `src_platform_filter`, MetaBuild will automatically switch to using the `dest_platform_filter` version instead. <br /><br />For example, on UWP sometimes it is needed to build some of the targets as regular Win32 projects. For more info check the [Building Win32 projects on UWP guide]({{ "/docs/guides/msvs/build_win32_on_uwp" | relative_url }}). <br/><br/>**Note** that this remapping can only be used with platform `filters` like `target.uwp`, `target.win32`, etc. |
| `tests` | `list<`[`target_ref`]({{ "/docs/guides/general/target_refs" | relative_url }})`>` | List of tests for the node, see [`test()`]({{ "/docs/api/nodes/test" | relative_url }}). |

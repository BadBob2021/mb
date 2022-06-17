---
grand_parent: API
layout: default
nav_order: 30
parent: Base Node Types
title: OutMetaNode
---

# OutMetaNode
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

This is the base node type used by targets that generate or download files on disk. By default these targets automatically allocate a folder in the build directory. However, the `out` attribute can be used to customize the output folder.

Direct subclasses:

- [project_link()]({{ "/docs/api/remote_nodes/project_link" | relative_url }})
- [git_checkout()]({{ "/docs/api/remote_nodes/git_checkout" | relative_url }})
- [http_archive()]({{ "/docs/api/remote_nodes/http_archive" | relative_url }})
- [http_file()]({{ "/docs/api/remote_nodes/http_file" | relative_url }})
- [cxx_header_map()]({{ "/docs/api/nodes/cxx_header_map" | relative_url }})
- [ActionNode]({{ "/docs/api/base_nodes/action_node" | relative_url }})
- [CxxNode]({{ "/docs/api/base_nodes/cxx_node" | relative_url }})

**Note:** By default the `out` attribute should only be used for extraordinary cases where no other solution is available. Otherwise, let MetaBuild automatically allocate a folder for the target.
{: .label .label-None }

Inherits all attributes from [SharedNode]({{ "/docs/api/base_nodes/shared_node" | relative_url }}).

| Attribute | Type | Description |
|-----------|------|-------------|
| `out` | [`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }}) | Defaults to an automatically generated path. Use this to customize the location where the content is generated / downloaded. |

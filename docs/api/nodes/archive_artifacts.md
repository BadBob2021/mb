---
grand_parent: API
layout: default
nav_order: 100
parent: Other Nodes
title: archive_artifacts()
---

# archive_artifacts()
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
archive_artifacts(...)
```

`archive_artifacts` has the same behavior as `copy_artifacts` except that it places all the artifacts into an archive file instead. The name of the generated archive is based on the name of the node.

Inherits all attributes from [copy_artifacts]({{ "/docs/api/nodes/copy_artifacts" | relative_url }}).

| Attribute | Type | Description |
|-----------|------|-------------|
| `type` | `"zip"` | The type of archive to generate. Only `"zip"` is supported at the moment. |

The `extract_files()` from `copy_artifacts` is not currently supported with the `archive_artifacts` node type.
{: .label .label-yellow}
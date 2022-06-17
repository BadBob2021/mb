---
grand_parent: API
layout: default
nav_order: 50
parent: Other Nodes
title: cxx_binary()
---

# cxx_binary()
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
cxx_binary(...)
```

Inherits all attributes from [CxxNode]({{ "/docs/api/base_nodes/cxx_node" | relative_url }}).

| Attribute | Type | Description |
|-----------|------|-------------|
| `cli` | `bool` | *deprecated* Default is `false`. When `true` the generated Xcode target builds a command line executable target instead of an `.app` bundle. This property is deprecated, use `xcode_product_type = "tool"` instead. |


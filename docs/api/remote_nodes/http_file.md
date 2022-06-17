---
grand_parent: API
layout: default
nav_order: 20
parent: Remote Nodes
title: http_file()
---

# http_file()
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
http_file(...)
```

Inherits all attributes from [OutMetaNode]({{ "/docs/api/base_nodes/out_meta_node" | relative_url }}).

Downloads a file from the web. MetaBuild automatically adds the required headers for files coming from Artifactory.

| Attribute | Type | Description |
|-----------|------|-------------|
| `urls` | `list<string>` | List of fallback urls to use for the download. |
| `url` | `list<string>` | Alias for `urls` |
| `link_from_cache` | `boolean` | Links the `$(location)` of the node directly from the cache. Defaults to `False`. |
| `sha256` | `string` | The expected `sha256` of the file. The hash can also be added the the `META.lock` file, so this attribute is optional. |

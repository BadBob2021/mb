---
grand_parent: API
layout: default
nav_order: 30
parent: Remote Nodes
title: http_archive()
---

# http_archive()
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
http_archive(...)
```

Inherits all attributes from [OutMetaNode]({{ "/docs/api/base_nodes/out_meta_node" | relative_url }}).

Downloads and extracts an archive from the web. MetaBuild automatically adds the required headers for archives coming from Artifactory.

| Attribute | Type | Description |
|-----------|------|-------------|
| `urls` | `list<string>` | List of fallback urls to use for the download. |
| `trim` | `int` | Number of folders to trim from the root of the archive. |
| `sha256` | `string` | The expected `sha256` of the file. The hash can also be added the the `META.lock` file, so this attribute is optional. |

Note: python must be compiled/installed with support for the specific archive types needed, for tar.xz support on MAC use
```brew install xz && pyenv install 3.x.x```

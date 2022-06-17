---
grand_parent: API
layout: default
nav_order: 20
parent: Globbing
title: cpp_glob()
---

# cpp_glob()
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
cpp_glob(...)
```

Alias for [`glob()`]({{ "/docs/api/globbing/glob" | relative_url }}) that automatically sets the `exts` parameter to well known set of C++ extensions:

- **Headers:** `.h`, `.hpp`, `.hxx`, `.hh`, `.h++`
- **Sources:** `.c`, `.cxx`, `.cc`, `.cpp`, `.c++`, `.m`, `.mm`

| Attribute | Type | Description |
|-----------|------|-------------|
| `include` | `list<glob_pattern>` or `glob_pattern` | Include glob patterns. If a file matches any of the `glob_patterns`, then the file is included in the resulting list. If no pattern is specified, then all files are considered recursively. |
| `exclude` | `list<glob_pattern>` or `glob_pattern` | Exclude glob patterns. If a file matches any of the `glob_patterns`, then the file is excluded from the resulting list. |
| `filters` | `list<filter_tuples>` | Defaults to `None`. List of filter tuples to apply on the resulting list. |
| `root_dir` | [`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }}) | Defaults to the root directory of the current module. Use this attribute to change the start point of the glob search. |

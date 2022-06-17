---
grand_parent: API
layout: default
nav_order: 10
parent: Global API
title: load()
---

# load()
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
load(...)
```

`load()` allows you to bring python objects (variables or functions) from one `.meta.py` file to another. The use is `load(`[`module_ref`]({{ "/docs/guides/general/target_refs#module-reference" | relative_url }})`, *args)`. The input to the function is a reference to a MetaBuild module


| Attribute | Type | Description |
|-----------|------|-------------|
| `module` | [`module_ref`]({{ "/docs/guides/general/target_refs#module-reference" | relative_url }}) | The file needed for upload. |
| `*args` | `string` | Name of object(s) to be loaded. |


## Examples

- [pybind11](https://git.corp.adobe.com/meta-specs/pybind11/blob/main/test.meta.py#L1) provides its users with `pybind11_module`.
- [pitchfork](https://git.corp.adobe.com/meta-specs/pitchfork/blob/main/sample/META.py#L4) provides its users with the object `pitchfork`.
- Here is an [internal usage of load](https://git.corp.adobe.com/meta-specs/boost/blob/main/deps.meta.py#L1) within a project, to bring in a variable, `boost_sha1`, from one file in the project to another.

---
grand_parent: API
layout: default
nav_order: 10
parent: Other Nodes
title: group()
---

# group()
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
group(...)
```

Direct subclasses: [build_group()]({{ "/docs/api/nodes/build_group" | relative_url }})

Inherits all attributes from [MetaNode]({{ "/docs/api/base_nodes/meta_node" | relative_url }}).

Groups all of the `node.deps` under a single name.

For example, if you need a to add multiple separate targets to the same specification you can use a `group` target to wrap all targets under a single name.

Note that the default target that `metabuild` is trying to generate is `//:main`. Naming the group `main` removes the need to add the `--target` argument to the `prepare` command.

`groups()` do not create targets in the generated project. As a result, `group` nodes cannot be used as a `--build-target`. Use the [build_group]({{ "/docs/api/nodes/build_group" | relative_url }}) node to make a group that shows up in the generated project.
{: .label .label-green}

```python
group(
    name = "main",
    deps = [
        ":gude",
        ":gude_tests",
        ":gude_sample"
    ]
)

cxx_library(
    name = "gude",
    ...
)

cxx_binary(
    name ="gude_tests",
    deps = [
        # Note that targets should still add the correct dependencies,
        # even if they are part of the group.
        ":gude"
    ],
    ...
)

cxx_binary(
    name ="gude_sample",
    deps = [
        ":gude"
    ],
    ...
)
```


Another example is grouping dependencies:

```python
group(
    name = "ios_deps",
    filter = target.ios,
    deps = [
        ":ios_dep1",
        ":ios_dep2"
    ]
)

group(
    name = "macos_deps",
    filter = target.macos,
    deps = [
        ":macos_dep1",
        ":macos_dep2"
    ]
)

cxx_library(
    name ="gude",
    deps = [
        ":ios_deps",
        ":macos_deps"
    ]
)
```

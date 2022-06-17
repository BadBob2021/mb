---
grand_parent: User Guides
layout: default
nav_order: 20
parent: General
title: Root Target
---

# Root Target
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




The project from which you run the `metabuild prepare` command is known as the root project. By default, MetaBuild will look for a target named `main` inside the `META.py` file of the root project. Then, it includes any target reached by tracing back the dependencies of this node inside the generated MSVS, Xcode, or Cmake project. This node is known as the `root` node. 

You can change the root node by passing the argument `--target <target_reference>` (replace `<target_reference>` with a proper [Target references]({{ "/docs/guides/general/target_refs" | relative_url }})) to `metabuild prepare`. You can also use the [MetaBuild config]({{ "/docs/cli/metabuild_config" | relative_url }}) `mb.root_target`, to change the root target.

## Using groups as root targets

It is recommended to use a `group()` as the root target, otherwise, executable dependencies of MetaBuild `test()` nodes will not be built with the command `metabuild build`, and the MetaBuild "testing" workflow might not work properly. For example, in the following case,
```py
set_project_name("example")

cxx_binary(
    name = 'hello',
    srcs = 'main1.cpp',
    tests = ':test_runner',
)

cxx_binary(
    name = 'hello_tester',
    srcs = 'main2.cpp',
)

async def run_test(ctx):
    ctx.invoke(':hello_tester')

test(
    name = 'test_runner',
    py = run_test,
    deps = [':hello_tester'],
)
```
If you set `hello` as your root target, running `metabuild build` will not build the executable `hello_tester` that is needed by `metabuild test` (`metabuild build --build-target :hello_tester` has to be ran separately).

Note that you can wrap any node within a group node as follows.
```py
group(
    name = 'my_lib',
    deps = ':_my_lib',
)
```
And then use group `my_lib` as your target instead of the cxx_library `_my_lib`.

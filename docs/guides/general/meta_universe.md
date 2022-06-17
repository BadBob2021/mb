---
grand_parent: User Guides
layout: default
nav_order: 10
parent: General
title: Meta Node Tree
---

# Meta Node Tree
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




There are 4 concepts used in MetaBuild specifications:

1. Meta Universe
2. Meta Projects
3. Meta Modules
4. Meta Nodes

## Meta Universe

There's a single Meta Universe. The Universe contains one or more MetaProjects. Each MetaProject has a unique name.

## Meta Projects

By default MetaBuild loads the `META.py` file inside the current folder. This file becomes the root MetaProject of the current build.

Other projects can be linked into the Universe via the [`project_link()`]({{ "/docs/api/remote_nodes/project_link" | relative_url }}) directive. The root of a project must contain a `META.py` file which is the main entry point into the project.

By default external projects are only loaded if and only if it has been requested directly or indirectly via a the dependency tree.

## Meta Modules

When a project is loaded, MetaBuild automatically runs the `META.py` file. This file becomes the main MetaModule of the project.

Other Python files can be used to better structure the specification of the project. All of these files are MetaModules.

## Meta Nodes

Each Meta Module defines a set of nodes. Each of these nodes must have a unique name inside the enclosing meta module. These nodes have different types depending on the task they need to complete.

For example, there are nodes that download GIT repos, HTTP archives, build C++ libraries, group other nodes or invoke bash scripts.

## Dependency model

MetaBuild computes the dependency tree starting with the root target. All Meta nodes can use the `filter` property to announce that a node is only available on specific platforms.

A missing `filter` property means the node should be considered on all platforms.

Nodes that are not part of the dependency tree are completely ignored.

External projects that are linked using the [`project_link()` method]({{ "/docs/api/remote_nodes/project_link" | relative_url }}), but are not needed by any of nodes in the dependency tree are completely ignored as well.

As a result external repositories are only downloaded if they are need by the current target that is being prepared.

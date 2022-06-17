---
layout: default
nav_order: 110
parent: Command Line Interface
title: metabuild graph
---

# metabuild graph
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




Generates a .dot file or .dgml file graph using the dependencies from the current project.

```
metabuild graph [--format {dot,dgml}] GRAPH_FILE
```

`.dot` files are in [GraphViz](https://graphviz.org/doc/info/command.html) format; use the `dot` tool to render them. 

`.dgml` files can be interactively viewed and manipulated in Visual Studio; be sure to install "Tools > Get tools and features... > Individual Component > Code tools > DGML Editor"

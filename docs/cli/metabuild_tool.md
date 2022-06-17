---
layout: default
nav_order: 70
parent: Command Line Interface
title: metabuild tool
---

# metabuild tool
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




MB requires a bash shell to run the `genrule` commands. It can also use shell package managers like `brew`, `msys2` or `apt` to install various required external packages.

This command allows running commands using the package manager installed by MB.

```
    shell               Run the `tool` shell.
    install             Install the `tool` package.
    which               Check the `tool` package.
```

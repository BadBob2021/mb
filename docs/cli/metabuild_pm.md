---
layout: default
nav_order: 80
parent: Command Line Interface
title: metabuild pm
---

# metabuild pm
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




MB is also a package manager for C++ libraries. This command can be used to clone repositories using the internal package manager of MB.

  metabuild pm clone [package_name] [dest_path]

[dest_path] is optional. MB creates a folder with the name of the package by default.
{: .label .label-green}

Example:

  metabuild pm clone "boringssl == 1.0.4"

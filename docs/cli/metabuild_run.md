---
layout: default
nav_order: 60
parent: Command Line Interface
title: metabuild run
---

# metabuild run
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




Runs nodes like `genrule` that are designed to run during the `prepare` phase. This is useful when a script is used to generated files.

When using `metabuild run` only a subset of the `prepare` sequence is invoked, so it should be faster to use `metabuild run` instead of using the full `metabuild prepare`.

For example:

  metabuild run --target :generate_files

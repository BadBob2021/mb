---
layout: default
nav_order: 30
parent: Basics
title: Which version of MB should I use?
---

# Which version of MB should I use?
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




You can find versions of MB by taking a look at the tags in the MB repo: [MB version tags](https://git.corp.adobe.com/meta-build/meta-build/tags). You can use the GitHub interface to find out the associated tag of any commit in the history.

## `stable` and `latest`

* 1
  - 1
  - 2

In addition to the version tags, there are two other special tags `latest` and `stable`. `latest` is simply a git tag pointing to the latest MetaBuild version. `stable` is the latest version that has passed the [stable Jenkins pipeline]({{ "/docs/basics/becoming_a_user#metabuild-stable-pipeline" | relative_url }}).

## General recommendation

If you are just starting working with MB, start using the version that the `stable` tag points to. If you have a blocking issue we will try to address it as soon as possible or provide a temporary workaround. Feel free to send a message on the #metabuild Slack channel when you have an issue.

We have pretty good coverage with MB and all versions are tested before the `latest` and `stable` tags are updated. However, there are very complicated scenarios that can be built with MB and it is hard to cover 100% of the cases. MB tries to be backwards compatible with any project.

We are still very actively developing MB, so there are new use-cases that introduce breaking changes.

#### Note
It is possible to check the version of MetaBuild in your spec files. See [checking MetaBuild version]({{ "/docs/guides/general/checking_metabuild_version" | relative_url }}).

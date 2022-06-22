---
layout: default
nav_order: 40
parent: Tutorials
title: Metabuild configuration and lock files
---

# Metabuild configuration and lock files
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>


## Resources

* A video resource for this section is available [here](https://adobe-my.sharepoint.com/:v:/p/hoshyari/EUU9UNeRYMFEkMdPRRgJcTABVWHc9bXUzOfYbGd947aESA?e=aopMpv)
* The project used in the video is [here](https://git.corp.adobe.com/meta-samples/tutorial_examples/tree/hoshyari/config/meta_config)
(It might need improvement; just for the purpose of having something so we can iterate for:

## Overview

In MetaBuild, "configurations" are a means for users to interact with MetaBuild. Each configuration has a form: `<prefix>.<name>` 
For example:

Configuration | Prefix | Name
|----------|----------|----------
|`xcode.valid_archs`|xcode|valid_archs
|`projA//deps:googletest_git.commit`|projA//deps:googletest_git|commit

## Configuring the behaviour of the core of MetaBuild

Some configurations configure the behaviour of the core of MetaBuild.
* We try to list all these configs under the `default_config.yaml` file within MetaBuild: https://git.corp.adobe.com/meta-build/meta-build/blob/main/metabuild/config/default_config.yaml (if any is missing, please inform us: <Link to creating a JIRA ticket and #metabuild)
* Some of these configs are associated with the `option()` nodes within the MetaBuild builtin project:
-- builtin project: https://git.corp.adobe.com/meta-build/meta-build/tree/0.2.92/metabuild/builtin
-- Examples `option()` node; the associated config is the value passed to the config= field: https://git.corp.adobe.com/meta-build/meta-build/blob/0.2.92/metabuild/builtin/cmake.meta.py#L40-L55

## Configuring the behaviour of user's code

Other configurations control behaviour of user's code (will get back to this -- tbd).

## Setting the value of these configs

There are two ways to set the value of these configs:

**Method 1 : Edit the config files** 

See this link: https://git.corp.adobe.com/pages/meta-build/docs/guides/config_files/

* You can open the config files and change the values.
-- Each file has a different format: https://git.corp.adobe.com/pages/meta-build/docs/guides/config_files/#metalock-file. In each format, see how <prefix> and <name> should be specified.
* Or you can use the `metabuild config` command line executable: https://git.corp.adobe.com/pages/meta-build/docs/cli/metabuild_config/
-- This is an interface to acheive the same goal as editing the file.

**Method 2 : Override value of configs**
* As an alternative to the method above, during MetaBuild prepare you can override value of the configs. This is via the `–define <prefix>.<name>=<value>` argument https://git.corp.adobe.com/pages/meta-build/docs/cli/metabuild_config/#command-line-args: (this entry is in this file by mistake, it should be moved to https://git.corp.adobe.com/pages/meta-build/docs/guides/config_files/)
* Note about `inherit_from`: You can use `<project_name>.inherit_from=other_project_name`. This will cause MetaBuild to read the config file of the other_project and set configs with `prefix=<project_name>` from the lock file of that project. When doing this you have ot make sure that you have a `project_link()` to other_project as well.
* Note about platform suffix: If you set `<prefix>.<name>_<platform>=value` in a config file, it only sets it for that <platform>. (I think this is missing from the docs).

## How the behaviour of user's code is modified

I just mentioned above at that that option can modify the behaviour of user's code too. Let's see how it is done.

* Some of metabuild's nodes (like `git_checkout()`) can be modfied via configurations. If the target reference (https://git.corp.adobe.com/pages/meta-build/docs/guides/target_refs/) of the `git_checkout` node is `my_proj//deps:my_repo`, the following configs mentioned here (https://git.corp.adobe.com/pages/meta-build/docs/api/git_checkout/) can be used to override the repo or commit of the git_checkout node.
-- Similarly for `option()` nodes, you can use `target_ref.value`.
-- In addition `option()` node also has a `config= entry`. This allows setting the value of the option with configs other than target_ref.value. See this [link](https://git.corp.adobe.com/pages/meta-build/docs/api/option/#config). It is always recommended that options have one config with prefix equal to the name of the project they belong to. This will make the config files much more readable.
* When MetaBuild loads dependency projects with `project_link()`, the means by which that project can be loaded can be configured via configs: https://git.corp.adobe.com/pages/meta-build/docs/api/project_link/#tldr
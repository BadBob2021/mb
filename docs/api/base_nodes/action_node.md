---
grand_parent: API
layout: default
nav_order: 50
parent: Base Node Types
title: ActionNode
---

# ActionNode
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




*Abstract class*

Direct subclasses:

- [genrule]({{ "/docs/api/nodes/genrule" | relative_url }})
- [copy_artifacts]({{ "/docs/api/nodes/copy_artifacts" | relative_url }})
- [http_upload]({{ "/docs/api/remote_nodes/http_upload" | relative_url }})

Inherits all attributes from [OutMetaNode]({{ "/docs/api/base_nodes/out_meta_node" | relative_url }}).

| Attribute | Type | Description |
|-----------|------|-------------|
| `phase` | `"prepare"` or `"build"` | The phase when the action node is going to be executed. If `prepare` is used, then MetaBuld runs the node during the prepare command. If `build` is used, then the node is executed during the build phase inside Xcode or Visual Studio.  Default value is `"build"`. |
| `version` | `string` or `int` | The version number of the action node. You can increment the version to force rebuild the node even when MetaBuild cannot detect any other changes. |
| `cache` | `bool` | MB caches the result of the action nodes and will not try to invoke the command again when no inputs have changed. If you turn it off, the command will always run again without checking for invalidated inputs. This is needed for cases where the command should always update a file based on values that are not easy to validate. Defaults to `true`. |

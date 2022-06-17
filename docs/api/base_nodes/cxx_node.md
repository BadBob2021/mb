---
grand_parent: API
layout: default
nav_order: 40
parent: Base Node Types
title: CxxNode
---

# CxxNode
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

- [cxx_library]({{ "/docs/api/nodes/cxx_library" | relative_url }})
- [cxx_binary]({{ "/docs/api/nodes/cxx_binary" | relative_url }})

Inherits all attributes from [OutMetaNode]({{ "/docs/api/base_nodes/out_meta_node" | relative_url }}).

| Attribute | Type | Description |
|-----------|------|-------------|
| `srcs` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of files to be added to this target. Both headers and sources can be added using property. Targets can have 0 or more source files. |
| `carbon_resources` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` |  List of Carbon resources to be added to the Xcode target. |
| `cmake_flags` | [`cmake_flags`]({{ "/docs/guides/cmake/cmake_flags" | relative_url }}) | Custom flags added to the current target in the generated CMake project. |
| `xcode_resources` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` |  List of Xcode resources to be added to the Xcode target. |
| `xcode_product_type` | [`xcode_product_type`]({{ "/docs/guides/xcode/xcode_product_type" | relative_url }}) | Sets the Xcode product type of the target. Use this property to create Xcode Frameworks. Defaults to `"application"` for `cxx_binary` targets and `"library"` for `cxx_library` targets. |
| `xcode_headers` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of headers to be added to the Xcode Framework Header Copy rule. Use [`target.xcode_private`]({{ "/docs/api/global/target#xcode-header-filters" | relative_url }}) or [`target.xcode_public`]({{ "/docs/api/global/target#xcode-header-filters" | relative_url }}) filters to make the headers private or public. |
| `data` | [`resource_spec`]({{ "/docs/guides/embedding_resources/resource_spec" | relative_url }}) or `list<`[`resource_spec`]({{ "/docs/guides/embedding_resources/resource_spec" | relative_url }})`>` | List of files to copy into the executable bundle. Check the [`resource_spec`]({{ "/docs/guides/embedding_resources/resource_spec" | relative_url }})documentation for more info and examples. |
| `raw_headers` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of header files to be added to this target. Similar to `srcs` above, but the files will never be compiled, even if using a ".cpp" extension. |
| `headers` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | Reserved for future use. |
| `exported_headers` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | Reserved for future use. |
| `header_namespace` | string | Reserved for future use. |
| `preprocessor_flags` | `list<string>` | List of preprocessor flags to be used when compiling the files of the current target. |
| `preprocessor_macros` | `list<string>` | List of preprocessor macros to be used when compiling the files of the current target. |
| `compiler_flags` | `list<string>` | List of compiler flags to be used when compiling the files of the current target. |
| `linker_flags` | `list<string>` | List of linker flags to be used when compiling/linking the files of the current target. |
| `linker_libraries` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})` or `[`system_lib`]({{ "/docs/api/global/system_lib" | relative_url }})` or `[`user_lib`]({{ "/docs/api/global/user_lib" | relative_url }})`>` | List of libraries to be linked to the target. See the [Linking binaries]({{ "/docs/guides/build_artifacts/linking_binaries" | relative_url }}) page for more details. |
| `xcode_flags` | [`xcode_flags`]({{ "/docs/guides/xcode/xcode_flags" | relative_url }}) | Custom flags added to the current target in the generated Xcode project. |
| `xcode_plist` | [`xcode_plist`]({{ "/docs/guides/xcode/xcode_plist" | relative_url }}) | List of properties added to the generated Xcode plist file for the current target. |
| `msvs_flags` | [`msvs_flags`]({{ "/docs/guides/msvs/msvs_flags" | relative_url }}) | Custom flags added to the current target in the generated Microsoft Visual Studio project. |
| `msvs_generator` | `bool` | By default MetaBuild avoid linking Microsoft Visual Studio targets between each other to improve performance. Set this property to true to force adding this target as a reference dependency to all of its dependents. This is commonly used for projects that generate IDL fils using the MIDL compiler. |
| `include_directories` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of include directories used when compiling the files of the current target. |
| `system_include_directories` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | Same as `include_directories` above, but allows using the `#include <name_of_file>` syntax to include the files. This property is exactly the same as `include_directories` when using the Microsoft Visual Studio generator. |
| `linker_directories` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of linker directories used when compiling / linking the files of the current target. |
| `framework_directories` | `list<`[`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }})`>` | List of Xcode framework directories used when compiling / linking the files of the current target. |
| `precompiled_header` | [`file_ref`]({{ "/docs/guides/general/file_refs" | relative_url }}) | Header file that is automatically inserted before the first line when compiling the source files in this target. |
| `generated_include_path` | `string` | Path used to generate headers like the `ExportMacro.h` file. Defaults to `{project_name}/{module_name}/{target_name}`. If the target is inside the root module, then the `module_name` is skipped and the folder becomes `{project_name}/{target_name}`. Read more about the generated `ExportMacro.h` file in the [DLLs on MetaBuild]({{ "/docs/guides/general/dlls" | relative_url }}) guide. |
| `product_name` | `string` | The name used by the generated binary file. Defaults to the name of the target. |
| `product_extension` | `string` | The extension of the generated binary file. Must include the `.`. |
| `pre_link_scripts` | `list<`[`target_ref`]({{ "/docs/guides/general/target_refs" | relative_url }})`>` | Link to action nodes that run before linking this target. |
| `post_build_scripts` | `list<`[`target_ref`]({{ "/docs/guides/general/target_refs" | relative_url }})`>` | Link to action nodes after building this target. |
| `xcode_tests` | `list<`[`target_ref`]({{ "/docs/guides/general/target_refs" | relative_url }})`>` | Link to xcode tests for the target. |
| `xcode_test_target` | [`target_ref`]({{ "/docs/guides/general/target_refs" | relative_url }}) | Link to the host application for an xcode test. |
| `project_subpath` | `string` | Define a folder in the code editor (Xcode, Visual Studio) to store the source code contained in this node. |


## Adding post build scripts

When a `genrule` is referenced from the `post_build_scripts`, the `OUT` of the genrule is automatically changed to match the location of the target that was built.

```python
cxx_library(
    name = "my_target",
    post_build_scripts = ":process_file",
)

genrule(
    name = "process_file",
    cmd = "process_file ${OUT}/my_target.a",
)
```

The same `genrule` can be referenced by multiple CXX Nodes.
{: .label .label-green}

The same `genrule` can be both a standalone script and `pre_link_scripts` / `post_build_scripts`. MB will handle those separately as if they were completely different `genrule` commands.
{: .label .label-green}

---
grand_parent: User Guides
layout: default
nav_order: 30
parent: Build Artifacts
title: Using prebuilts to save time
---

# Using prebuilts to save time
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




There are two methods that MetaBuild plans to help with build result caching.
1. ccache
2. automatic upload and download of prebuild components based on target hashes computed via build environment (compiler flags, compiler version, etc.)

## ccache

MetaBuild has ccache integration. To enable ccache, pass the `ccache.enabled = true` config to MetaBuild. See [ccache.meta.py](https://git.corp.adobe.com/meta-specs/ccache/blob/main/ccache.meta.py) for the implementation, and all the configs accepted by MetaBuild to configure ccache behaviour.

MetaBuild ccache integration after version [0.2.98]({{ "/docs/changelog/0.2#0298" | relative_url }}) supports almost all build and host platforms.

| host platform | build platform | generator | works |
|------------|----------|----------| ----------|
| win32 | win32 | msvs | ✅ | 
| win32 | uwp | msvs | ✅ |
| win32 | android | CMake | ✅ |
| win32 | wasm | CMake | ❌ (see [METAB-846](https://jira.corp.adobe.com/browse/METAB-846)) |
| macos | macos | xcode | ✅ | 
| macos | ios | xcode | ✅ |
| macos | macos | CMake | ✅  |
| macos | android | CMake | ✅ |
| macos | wasm| CMake | ✅  |
| linux | linux | CMake | ✅ |
| linux | android | CMake | ✅  |
| linux | wasm| CMake | ✅ |

See example of using ccache at [the MetaBuild ccache unit test](https://git.corp.adobe.com/meta-build/meta-build/tree/0.2.94/tests/generator/__fixtures__/ccache_test_app). Some important setting in this project are
  - Settings needed to make ccache get hits when building same code from different directories (based on [ccache instructions](https://ccache.dev/manual/4.6.1.html#_compiling_in_different_directories))
    - Setting the `ccache.base_dir` option.
    - Usage of `cmake.base_dir` option, set it to be the same as `ccache.base_dir`. This makes MetaBuild use a symlink to reference files in CMakeFiles, so that CMake puts object files in path agnostic locations.
  - Settings needed for windows.
    - See [this part in universe_flags](https://git.corp.adobe.com/meta-build/meta-build/blob/0.2.98/tests/generator/__fixtures__/ccache_test_app/META.py#L18-L25) and the note [here](https://git.corp.adobe.com/meta-build/meta-build/blob/0.2.98/tests/generator/__fixtures__/ccache_test_app/META.py#L62-L67) in the MetaBuild ccache usage example.
  - Setting that is helpful for clang:
    - See [this part in universe_flags](https://git.corp.adobe.com/meta-build/meta-build/blob/0.2.98/tests/generator/__fixtures__/ccache_test_app/META.py#L14) in the MetaBuild ccache usage example.
    
## Sharing prebuilt components

Automatic sharing of prebuilt components is in MetaBuild's backlog, though we do have a proof of concept [METAB-11](https://jira.corp.adobe.com/browse/METAB-11).

However, do not despair. It is still possible to build prebuilt binaries and share them with your teammates. The process is just a little less automatic.

Imagine that you are project `R`, and depend on `usd` which have MetaBuild specs. You wish to be able to optional use prebuilt binaries for `usd`.

### Using artifacts built in external env (e.g. CI of dependency itself)

If you wish to download something uploaded by `usd` and don't want to build them in your environment, then your initial work is less. But you risk not building in save env and are not able to regenerate artifacts whenever you want independent of external forces. See [sharing_built_dependencies/build_externally](https://git.corp.adobe.com/meta-samples/sharing_built_dependencies/tree/master/build_externally).

### Building and using artifacts in your own build env

It is strongly recommended not to directly download what `usd` build in their own build environments. Instead MetaBuild allows you to build them in your own build environments and upload them to artifactry. You can then switch between build from source and consuming artifacts via MetaBuild options. See how this can be done in in the [sharing_built_dependencies/build_in_my_env](https://git.corp.adobe.com/meta-samples/sharing_built_dependencies/tree/master/build_in_my_env) sample. This example allows the final app to build and upload deps. This is nice since you can upload artifacts on demand and build them exactly with your own env (c++ version, compiler flags, iterator_debug_level, etc).



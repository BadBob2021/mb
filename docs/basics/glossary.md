---
layout: default
nav_order: 60
parent: Basics
title: Glossary
---

# Glossary
{: .no_toc }

| Item | Description |
|-----------|---------|
|Buck|A build system developed and used by Facebook that encourages the creation of small, reusable modules consisting of code and resources, and supports a variety of languages on many platforms.|
|Ccache|A compiler cache that speeds up recompilation by caching previous compilations and detecting when the same compilation is being done again. MetaBuild has ccache integration.|
|CDB|Microsoft Console Debugger can used with MetaBuild to perform debugging tasks.|
|CMake|CMake is an open-source, cross-platform family of tools designed to build, test and package software. CMake for MetaBuild has three kinds of properties. 1. Global level flag 2. Target properties. 3. Source file properties.|
|Conda|The Conda package manager can be installed locally at any desired location on your system.|
|Docker|An open platform for developing, shipping, and running applications. If you do not have a Linux machine, you can use Docker on your usual os (Windows or Mac) to do Linux development.|
|EMSDK|The Emscripten SDK is a small package manager for tools that are used in conjunction with Emscripten.|
|Flavor Node|Allows you to have multiple variants of the same target within the same project. For example, both the static and dynamic variants of a library.|
|Homebrew|A free and open-source software package management system that simplifies the installation of software on Apple's operating system, macOS, as well as Linux.|
|Linting|MetaBuild uses the following linting tools and enforces them in Jenkins. pylint - general checks for errors and inconsistencies, mypy - type checker, isort - formats the import statements at the top of files., black - code formatter.|
|Meta Modules|When a project is loaded, MetaBuild automatically runs the META.py file. This file becomes the main MetaModule of the project.|
|Meta Nodes|Each Meta Module defines a set of nodes. Each of these nodes must have a unique name inside the enclosing meta module. These nodes have different types depending on the task they need to complete.|
|Meta Projects|By default MetaBuild loads the META.py file inside the current folder. This file becomes the root MetaProject of the current build.|
|Meta Tool|A meta_tool() enables you to install packages via MetaBuild.|
|Meta Universe|There's a single Meta Universe. The Universe contains one or more MetaProjects. Each MetaProject has a unique name. MetaUniverse object is the root object that needs to be created in order to bootstrap MetaBuild. The object holds information about everything needed to prepare the projects.|
|MetaBuild|A distributed C++ package manager and project generator.|
|MetaProject|By default there's a single MetaProject. This project is created by loading the initial META file referenced by the main --meta file references via the command line arguments.|
|MSVS|Microsoft Visual Studio|
|MSVS IDL Resources|If you have a library that uses IDL Resources, you have to set the msvs_generator property to true when creating your library.|
|MSYS2|Minimal SYStem 2 is open source software that provides a native build environment toolset to enable better interoperability with native Windows software.|
|PFX key|MetaBuild ships a default Personal Information Exchange (.pfx) key that is needed for MSVS UWP projects.|
|PLIST|An information property list file is a structured text file that contains essential configuration information for a bundled executable.|
|PR jobs|Every PR commit kicks off a Jenkins job that you can access by clicking on the Details at the bottom of the PR page on github.|
|PR template|The info from the PR template is used to automatically update the MetaBuild. Do not delete the template.|
|Root Project|The project from which you run the metabuild prepare command is known as the root project.|
|Safe Mode|Safe mode is a sandboxing system for specifications built with MetaBuild.|
|State File|Wrapper over Sqlite DB API to make it easy to read/write JSON based values in a DB file.|
|Tracing|High level tracing. MetaBuild comes with a profiler. If you run any MetaBuild command with the additional argument --trace /path/to/trace/file.json, MetaBuild will write a chrome trace file.|
|UWP|Universal Windows Platform is one of many ways to create client applications for Windows.|
|Version Configuration|There are multiple ways to tell MetaBuild where to find the path to the META.py file of the project that we would like to link to. The most common way is using the version configuration.|
|VS Code|Visual Studio Code is a source-code editor made by Microsoft for Windows, Linux and macOS.|
|WASM|WebAssembly is a binary format for executing code on the web.|
|YAML|A human-readable data serialization standard that can be used in conjunction with all programming languages and is often used to write configuration files. MetaBuild has a set of YAML config files at different locations.|
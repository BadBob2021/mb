---
layout: default
nav_order: 130
parent: Command Line Interface
title: metabuild test
---

# metabuild test
{: .no_toc }


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>




Invokes the tests of a specific target. Before running the `metabuild test` command, `prepare` and `build` commands must be run.
For more information regarding how to define tests in the meta file see the test node documentation [test()]({{ "/docs/api/nodes/test" | relative_url }})

Similarly to [metabuild build]({{ "/docs/cli/metabuild_build" | relative_url }}) you can specify the platform, generator and you can use one or more `--config` arguments to compile different / multiple configurations at once.

Tests can be selected by using the `--labels` parameter and specifying a test `label`. Only tests that have a matching `label` in the test node will run. This selection is secondary to filtering tests at `prepare` stage through the `META.lock` file (see the `Test Filtering` section in [test()]({{ "/docs/api/nodes/test" | relative_url }})).


While running tests (`metabuild test`) MetaBuild generates a test report file. The path to the report file can be configured using the `test.report_path` parameter (relative to the the project output directory). There are two options for the format of the report file xml and csv, which can be configured using the `test.report_format` parameter.


```
metabuild test --platform win32 --config Debug --config Release --verbose --generator msvs --label smoke --define test.report_path=report_path/from/cli --define test.report_format=csv
```

## Parallel tests

For running tests in parallel Metabuild provides the `num_jobs` parameter that can be set in the lock file or used from the CLI:

```
metabuild test --platform win32 --config Debug --config Release --define test.num_jobs=5
```

By default MetaBuild will run all tests sequentially (`num_jobs=1`).


## Remote test invocation

An archive containing all the dependencies needed to run the tests can be created by using the `--create-bundle` parameter and specifying a destination file i.e. `metabuild tests --create-bundle test_package.zip`. The archive file is generated inside the specified output folder (default is `dist`) in `tests\out`.
On a remote machine the tests inside a bundle can be run with the `--use-bundle` parameter: `metabuild tests --use-bundle /path/to/bundle/test_package.zip`.
Note that running the test bundle only works if the command is run from inside the project repository which should have the same version of code that was used to create the bundle.



#!/usr/bin/env groovy

properties([
	buildDiscarder(logRotator(daysToKeepStr: '180', numToKeepStr: '900'))
])

def profiles = [
	[name:'WebSite',  label: 'meta-build-linux||meta-build-mac'],
]

def computePlatform() {
	if (env.NODE_LABELS) {
		def labels = env.NODE_LABELS.tokenize()
		for (label in labels) {
			for (prefix in ["win", "linux", "mac"]) {
				if (label.startsWith(prefix)) {
					return prefix
				}
			}
		}
	}
	throw new Exception("Missing node label [win, linux, mac], labels are ${labels}");
}

def runScript(cmd) {
	echo cmd.script
	if (computePlatform() in ["linux", "mac"]) {
		sh cmd
	} else {
		powershell cmd
	}
}

def runInConda(String command, Boolean returnStdOut = false) {
	platform = computePlatform()
	cmd = ''

	if (platform == 'win') {
		cmd = cmd + "& ./.miniconda3/shell/condabin/conda-hook.ps1\n"
		cmd = cmd + 'conda activate .venv/\n'
		cmd = cmd + '$ENV:PYTHONIOENCODING="utf-8"\n'
		cmd = cmd + command
		echo "Running `${command}`"
		return powershell(
			label: command,
			returnStdout: returnStdOut,
			script: cmd,
		)
	} else {
		cmd = cmd + 'set +x\n'
		cmd = cmd + "source ./.miniconda3/bin/activate\n"
		cmd = cmd + 'conda activate .venv/\n'
		cmd = cmd + command
		echo "Running `${command}`"
		return sh(
			label: command,
			returnStdout: returnStdOut,
			script: cmd,
		)
	}
}

def build(profile) {
	node(profile.label) {
		platform = computePlatform()
		timeout([time: 1, unit: 'HOURS']) {
			try {
				stage("Setup") {
					def install_command = ""
					if (platform == 'win') {
						install_command = "& ./script/install-conda.ps1 ./.miniconda3"
					} else {
						install_command = "source ./script/install-conda.sh ./.miniconda3"
					}
					echo "Machine Host: ${env.NODE_NAME}"
					deleteDir()
					checkout scm
					runScript script: """
						${install_command}
						conda create -y -q --prefix .venv/
						conda activate .venv/
						conda env update -q --file script/conda.yaml --prefix .venv/
						conda activate .venv/
					"""
				}
				stage("Install Jekyll") {
					runInConda("gem install bundler")
					runInConda("bundle update")
				}
				stage("Test") {
					runInConda("bundle exec rake test")
				}
			} finally {
				deleteDir()
			}
		}
	}
}

// Cancel old jobs on the same branch
def buildNumber = BUILD_NUMBER as int;
if (buildNumber > 1) milestone(buildNumber - 1);
milestone(buildNumber)


timestamps {
	parallel profiles.collectEntries { profile ->
		[ "${profile.name}" : {
			build(profile)
		} ]
	}
}
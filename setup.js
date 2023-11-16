const shell = require('shelljs');
const semver = require('semver');

function parseVersion(output) {
    const versionMatch = output.match(/\d+\.\d+\.\d+/);
    return versionMatch ? versionMatch[0] : null;
}

function checkDependency(dep, minVersion) {
    if (!shell.which(dep)) {
        console.log(`${dep} is not installed.`);
        return;
    }

    const rawVersionOutput = shell.exec(`${dep} --version`, {silent: true}).stdout;
    const version = parseVersion(rawVersionOutput);

    if (version && semver.lt(version, minVersion)) {
        console.log(`${dep} version ${version} is older than the minimum required version ${minVersion}.`);
    } else if (version) {
        console.log(`${dep} version ${version} is sufficient.`);
    } else {
        console.log(`Could not parse the version for ${dep}.`);
    }
}

// Example usage
const requiredDeps = {
    'node': '12.0.0',
    'npm': '6.0.0',
    'git': '2.20.0',
    // Add other dependencies here
};

Object.keys(requiredDeps).forEach(dep => {
    checkDependency(dep, requiredDeps[dep]);
});

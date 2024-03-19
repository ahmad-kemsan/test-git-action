const { execSync } = require('child_process');
const core = require('@actions/core')
const semver = require('semver');

// Function to get the latest released version from manifest
function getLatestVersion() {
  const latestTag = execSync(`cat .release-please-manifest.json | jq -r '."."'`, { stdio: 'pipe' });
  const version = latestTag.toString().trim();
  if (!version) {
    throw new Error('No version found in the repository.');
  }
  return semver.parse(version);
}

// Function to create a new version based on type and increment value
function createVersion(type, increment = 1) {
  const latestVersion = getLatestVersion();

  switch (type) {
    case 'patch':
      return latestVersion.inc('patch');
    case 'minor':
      return latestVersion.inc('minor');
    default:
      throw new Error(`Invalid version type: ${type}`);
  }
}

try {
  const releaseAs = core.getInput('release-as');
  const token = core.getInput('token');
  const repoUrl = core.getInput('url');
  const label = 'a'
  
const newVersion = createVersion(releaseAs);

console.log(`Releasing with version: ${newVersion}`);
  
execSync(`npx release-please release-pr --release-as ${newVersion} --repo-url ${repoUrl} --token ${token} --no-labels`, { stdio: 'inherit' });
execSync(`npx release-please release-pr --release-as ${newVersion} --repo-url ${repoUrl} --token ${token} --label ${label}`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}
import { execSync } from 'child_process';
import semver from 'semver';

export function getLatestVersion() {
  const latestTag = execSync(`cat .release-please-manifest.json | jq -r '."."'`, { stdio: 'pipe' });
  const version = latestTag.toString().trim();
  if (!version) {
    throw new Error('No version found in the repository.');
  }
  return semver.parse(version);
}

export function createVersion(type, increment = 1) {
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
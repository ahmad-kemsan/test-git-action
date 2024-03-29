import { execSync } from 'child_process';
import semver from 'semver';

export function getLatestVersion(): string  {
  const latestTag: Buffer = execSync(`cat .release-please-manifest.json | jq -r '."."'`, { stdio: 'pipe' });
  const version:string = latestTag.toString().trim();
  if (!version) {
    throw new Error('No version found in the repository.');
  }
  console.log("latest manifest version: ", version )
  return version;
}

export function createVersion(type: string): semver.SemVer {
  const latestVersion = getLatestVersion();
  let newVersion: semver.SemVer | null = semver.parse(latestVersion);
  if (!newVersion) {
    throw new Error(`Failed to parse version: ${latestVersion}`);
  }
  switch (type) {
    case 'patch':
      newVersion = newVersion.inc('patch');
      break;
    case 'minor':
      newVersion = newVersion.inc('minor');
      break;
    default:
      throw new Error(`Invalid version type: ${type}`);
  }
  return newVersion;

}

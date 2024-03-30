import core from '@actions/core';
import { createVersion, getLatestVersion } from './version.js';
import { releaseVersion } from './release.js';
import { getLatestRemoteTag, pushTag } from './tags.js';
import { SemVer } from 'semver';

try {
  const releaseAs: string = core.getInput('release-as');
  const operationMode: string = core.getInput('operation-mode');

  if (operationMode === 'update-version') {
  const newVersion: SemVer = createVersion(releaseAs);
  releaseVersion(newVersion);
  }
  else if (operationMode === 'push-tags') {
    // get the latest remote tag
    // get the latest manifest tag
    // comapre the two & if remote is < manifest push the tags
    const latestRemoteTagVersion: string = getLatestRemoteTag()
    const latestManifestVersion: string = getLatestVersion()
    // add check for remote is not empty
    if (latestManifestVersion > latestRemoteTagVersion) {
      pushTag(latestManifestVersion)
    }
    else {
      throw new Error(`Conflict of tags ${operationMode}`);
    }
  }
  else {
    throw new Error(`Operation mode not supported: ${operationMode}`);
  }
} catch (error: any) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}
import core from '@actions/core';
import { createVersion } from './version.js';
import { releaseVersion } from './release.js';

try {
  const releaseAs = core.getInput('release-as');

  const newVersion = createVersion(releaseAs);

  core.setOutput('released-version', newVersion.version);
  releaseVersion(newVersion);
} catch (error) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}
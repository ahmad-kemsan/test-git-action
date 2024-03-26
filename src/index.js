import core from '@actions/core';
import { createVersion } from './version.js';
import { releaseVersion } from './release.js';

try {
  const releaseAs = core.getInput('release-as');
  const token = core.getInput('token');
  const repoUrl = core.getInput('url');

  // const newVersion = createVersion(releaseAs);

  // core.setOutput('released-version', newVersion.version);

  releaseVersion(repoUrl, token);
} catch (error) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}
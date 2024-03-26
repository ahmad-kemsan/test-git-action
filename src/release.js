import { execSync } from 'child_process';
import core from '@actions/core';

export function releaseVersion(newVersion, repoUrl, token) {
  core.setOutput('released-version', newVersion.version);

  console.log(`Releasing with version2: ${newVersion}`);
  execSync(`git config user.name "ahmad-kemsan"`);
  execSync(`git config user.email "ahmadkemsan@gmail.com"`);
  execSync(`git commit --allow-empty -m "chore: inside action empty commit version bump"`);
  // TODO: check release-as commit 
  execSync(`git push`);

  execSync(`npx release-please release-pr --release-as ${newVersion} --repo-url ${repoUrl} --token ${token} --skip-labeling`, { stdio: 'inherit' });
}
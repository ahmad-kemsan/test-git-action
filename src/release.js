import { execSync } from 'child_process';
import core from '@actions/core';

const token = core.getInput('token');
const repoUrl = core.getInput('url');
const gitUserName = core.getInput('git-user-name');
const gitUserEmail = core.getInput('git-user-email');
const justBumpVersion = core.getInput('just-bump-version');

export function releaseVersion(newVersion) {
  core.setOutput('released-version', newVersion.version);

  console.log(`Releasing with version2: ${newVersion}`);

  if (justBumpVersion === 'true') {
    console.log(`yes, it is just a bump version`);
    execSync(`git config user.name ${gitUserName}`);
    execSync(`git config user.email ${gitUserEmail}`);
    execSync(`git commit --allow-empty -m "chore: Just a bump version"`);
    // TODO: check release-as commit 
    execSync(`git push`);
  }
  execSync(`npx release-please release-pr --release-as ${newVersion} --repo-url ${repoUrl} --token ${token} --skip-labeling`, { stdio: 'inherit' });
}
import { execSync } from 'child_process';
import core from '@actions/core';
import { SemVer } from 'semver';

const token: string = core.getInput('token');
const repoUrl: string = core.getInput('url');
const gitUserName: string = core.getInput('git-user-name');
const gitUserEmail: string = core.getInput('git-user-email');
const emptyCommit: boolean = core.getInput('empty-commit') === 'true';


export function releaseVersion(newVersion: SemVer): void {

  if (emptyCommit) {
    console.log('Yes, it is just a bump version.');
    execSync(`git config user.name "${gitUserName}"`);
    execSync(`git config user.email "${gitUserEmail}"`);
    execSync('git commit --allow-empty -m "chore: Just a bump version"');
    execSync('git push');
  }
  execSync(`npx release-please release-pr --release-as ${newVersion.version} --repo-url ${repoUrl} --token ${token} --skip-labeling`, { stdio: 'inherit' });
}
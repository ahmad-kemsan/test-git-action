import { execSync } from 'child_process';
import core from '@actions/core';
import semver from 'semver';
import { createVersion } from './create-version';

/**
 * The personal access token used to authenticate against the GitHub API.
 * This token is required to perform operations like creating release PRs.
 * It should have sufficient permissions to create branches and pull requests.
 * @type {string}
 */
const token: string = core.getInput('token');

/**
 * The URL of the GitHub repository where operations will be performed.
 * This should be in the format 'owner/repo', e.g., 'octocat/Hello-World'.
 * @type {string}
 */
const repoUrl: string = core.getInput('url');

/**
 * The name of the user for git operations. This name will be associated with
 * the git commits made by this action.
 * @type {string}
 */
const gitUserName: string = core.getInput('git-user-name');

/**
 * The email of the user for git operations. This email will be associated with
 * the git commits made by this action.
 * @type {string}
 */
const gitUserEmail: string = core.getInput('git-user-email');

/**
 * A flag indicating whether an empty commit should be created as part of the
 * version update process. This can be useful for triggering workflows or
 * actions that require a new commit.
 * Expected to be a string 'true' or 'false' which is converted to a boolean.
 * @type {boolean}
 */
const emptyCommit: boolean = core.getInput('empty-commit') === 'true';

/**
 * Updates the project version and creates a PR using the Release Please CLI based on the specified `releaseAs` type.
 * Configures git user details for the commit, supports creating an empty commit, and then pushes changes to the remote repository.
 * 
 * This function requires several environment variables to be set: token, url, git-user-name, git-user-email, and empty-commit, 
 * which are fetched from the GitHub Actions workflow context.
 * 
 * @param {string} releaseAs The type of version update to perform. Accepts 'patch' or 'minor'.
 * check if it will be encapsulated in try-catch and accordingly throw error
 */
export function updateVersion(releaseAs: string): void {
    const newVersion: semver.SemVer = createVersion(releaseAs);
    if (emptyCommit) {
        execSync(`git config user.name "${gitUserName}"`);
        execSync(`git config user.email "${gitUserEmail}"`);
        execSync('git commit --allow-empty -m "chore: Just a bump version"');
        execSync('git push');
    }
    execSync(`npx release-please release-pr --release-as ${newVersion.version} --repo-url ${repoUrl} --token ${token} --skip-labeling`, { stdio: 'inherit' });
}
import { execSync } from 'child_process';
import core from '@actions/core';
import { getLatestRemoteTag } from './get-latest-remote-tag';
import { getLatestManifestVersion } from './get-latest-manifest-version';
import semver from 'semver';

/**
 * If the manifest version is newer, the function creates and pushes a new tag to the remote repository.
 *
 * It sets a GitHub Actions output 'tagging-status' to 'true' upon successful tag creation and push, or 'false' if the process fails.
 *
 * @throws {Error} If no remote tag version is found or if the remote tag version is ahead of the manifest version.
 */
export function pushTag(): void {
    try {
        // Retrieve the latest tag version from the remote repository
        const latestRemoteTagVersion: string = getLatestRemoteTag();
        // Retrieve the version from the manifest file
        const latestManifestVersion: string = getLatestManifestVersion();
        // Compare versions and push a new tag if the manifest version is greater
        if (semver.gt(latestManifestVersion, latestRemoteTagVersion)) {
            console.log('Pushing tag');
            execSync(`git tag ${latestManifestVersion}`);
            execSync(`git push --tags`);
            core.setOutput('tagging-status', 'true')
        } else {
            throw new Error('Remote tag version is ahead of manifest verison.');
        }
    } catch (error) {
        core.setOutput('tagging-status', 'false')
        console.error('Error pushing tag:', error);
    }
}
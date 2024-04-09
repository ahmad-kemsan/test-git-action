import { execSync } from 'child_process';
import core from '@actions/core';
import { getLatestRemoteTag } from './get-latest-remote-tag';
import { getLatestManifestVersion } from './get-latest-manifest-version';
import semver from 'semver';

export function pushTag(): void {
    try {
        const latestRemoteTagVersion: string = getLatestRemoteTag();
        const latestManifestVersion: string = getLatestManifestVersion();
        if (!latestRemoteTagVersion) {
            throw new Error('No remote tag version found.');
        }
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
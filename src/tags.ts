import { execSync } from 'child_process';
import core from '@actions/core';

export function getLatestRemoteTag(): string {
    try {
    console.log('getting latest tag');
    const latestTag: Buffer = execSync(`git describe --tags --abbrev=0`);
    const version:string = latestTag.toString().trim();
    if (!version) {
        throw new Error('No version found in the repository.');
    }
    console.log("Latest remote tag version: ", version)
    return version;
} catch (error) {
    console.error('Error pushing tag:', error);
    return ""
}
}

export function pushTag(latestManifestVersion: string): void {
    try {
        console.log('Pushing tag');
        execSync(`git describe --tags --abbrev=0`);
        execSync(`git tag ${latestManifestVersion}`);
        execSync(`git push --tags`);
        core.setOutput('tagging-status', 'true')
        
    } catch (error) {
        core.setOutput('tagging-status', 'false')
        console.error('Error pushing tag:', error);
        
    }
}
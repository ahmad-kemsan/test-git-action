import { execSync } from 'child_process';

export function getLatestRemoteTag(): string {
    console.log('getting latest tag');
    const latestTag: Buffer = execSync(`git describe --tags --abbrev=0`);
    const version:string = latestTag.toString().trim();
    if (!version) {
        throw new Error('No version found in the repository.');
    }
    console.log("Latest remote tag version: ", version)
    return version;
}

export function pushTag(latestManifestVersion: string) {
    console.log('Pushing tag');
    execSync(`git describe --tags --abbrev=0`);
    execSync(`git tag ${latestManifestVersion}`);
    execSync(`git push --tags`);
}
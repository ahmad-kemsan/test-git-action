import { execSync } from 'child_process';

export function getLatestRemoteTag(): string {
    try {
        console.log('Getting latest remote tag.');
        // check if we should look for the largest value or the latest value?
        const latestTag: Buffer = execSync(`git tag --sort=-creatordate | head -n 1`);
        const version: string = latestTag.toString().trim();
        if (!version) {
            throw new Error('Could not find remote tag version.');
        }
        console.log("Latest remote tag version: ", version)
        return version;
    } catch (error) {
        console.error('Error getting remote tag version:', error);
        return ""
    }
}
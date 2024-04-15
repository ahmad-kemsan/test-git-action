import { execSync } from 'child_process';

/**
 * Retrieves the highest semantic version tag from the remote Git repository.
 * This function executes a git command to list all tags, then sorts them by their semantic version
 * in descending order, and returns the top one as the latest tag.
 * 
 * @returns {string} The latest tag version as a string. 
 * @throws {Error} If no tags are found or an error occurs, an error message is thrown.
 */
export function getLatestRemoteTag(): string {
    try {
        console.log('Getting latest remote tag.');
        execSync(`git fetch origin --tags`);
        const latestTag: Buffer = execSync(`git tag | sort -Vr | head -n 1`);
        const version: string = latestTag.toString().trim();
        if (!version) {
            throw new Error('Could not find remote tag version.');
        }
        console.log("Latest remote tag version: ", version)
        return version;
    } catch (error) {
        throw new Error(`Error getting remote tag version: ${error}`);
    }
}
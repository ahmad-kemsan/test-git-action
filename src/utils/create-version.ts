import semver from 'semver';
import { getLatestManifestVersion } from './get-latest-manifest-version';

/**
 * Creates a new version based on the specified type of version bump (`patch` or `minor`).
 * Applied to the latest version found in the `.release-please-manifest.json`.
 * 
 * @param {string} type The type of version update to perform. Accepts 'patch' or 'minor'.
 * @returns {semver.SemVer} A `semver.SemVer` object representing the new version after applying the specified increment.
 * @throws {Error} Throws an error if the latest version cannot be parsed into a valid `semver.SemVer` object or if an invalid version type is provided.
 */
export function createVersion(type: string): semver.SemVer {
    const latestVersion = getLatestManifestVersion();
    let newVersion: semver.SemVer | null = semver.parse(latestVersion);
    if (!newVersion) {
        throw new Error(`Failed to parse version: ${latestVersion}`);
    }
    switch (type) {
        case 'patch':
            newVersion = newVersion.inc('patch');
            break;
        case 'minor':
            newVersion = newVersion.inc('minor');
            break;
        default:
            throw new Error(`Invalid version type: ${type}`);
    }
    return newVersion;
}
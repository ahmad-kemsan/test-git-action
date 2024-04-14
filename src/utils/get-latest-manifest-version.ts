import { readFileSync } from 'fs';

/**
 * Retrieves the version number from the `.release-please-manifest.json` file located in the root directory.
 * 
 * @returns {string} The version as a string, trimmed of any surrounding whitespace.
 * @throws {Error} Throws an error if the manifest file cannot be read, parsed, or if the version number is not found.
 */

export function getLatestManifestVersion(): string {
  const manifest = JSON.parse(readFileSync('.release-please-manifest.json', 'utf8'));
  const version: string = manifest["."].trim();
  if (!version) {
    throw new Error('No version found in the manifest.');
  }
  console.log("Latest manifest version: ", version)
  return version;
}
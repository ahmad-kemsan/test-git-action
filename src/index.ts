import core from '@actions/core';
import { updateVersion } from './utils/create-release-pr';
import { pushTag } from './utils/push-tags';

/**
 * A GitHub Action script to automate versioning and tag management tasks.
 * Based on the provided operation mode, this script either updates the project version
 * and creates a release PR, or it pushes the tags to the remote repository.
 *
 * If the operation mode is not recognized or if any error occurs during the execution of the selected operation,
 * the script logs the error and exits with a status code of 1, indicating failure.
 */
try {
  // Specifies the type of version update (patch or minor) for the `update-version` operation.
  const releaseAs: string = core.getInput('release-as');

  //Determines the operation to perform. Valid options are 'update-version' and 'push-tags'.
  const operationMode: string = core.getInput('operation-mode');

  switch (operationMode) {
    case 'update-version':
      updateVersion(releaseAs);
      break;
    case 'push-tags':
      pushTag();
      break;
    default:
      throw new Error(`Operation mode not supported: ${operationMode}`);
  }
} catch (error: any) {
  console.error('Error message:', error.message);
  process.exit(1);
}
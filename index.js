const { execSync } = require('child_process');
const core = require('@actions/core')
const releasePlease = require('release-please');

try {
  const releaseType = core.getInput('release-type');
  const token = core.getInput('token');
  const repoUrl = core.getInput('url');
  
  // const repoUrl = 'https://github.com/ahmad-kemsan/test-custom-actions.git';

  // Run release-please with the specified release type
  console.log(`Release type: ${releaseType}`);
  
  execSync(`npx release-please release-pr --release-as ${releaseType} --repo-url ${repoUrl} --token ${token}`, { stdio: 'inherit' });

} catch (error) {
  console.error('Error updating version:', error.message);
  process.exit(1);
}

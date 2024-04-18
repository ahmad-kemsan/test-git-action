# Custom GitHub Action: Versioning and Tagging

This GitHub Action is designed to automate version updates and to push tags in your GitHub repository. It offers two operational modes: update-version (deafult) and push-tags.

## Prerequisites

Before using this action, ensure your repository includes the following files at the root directory:
- `.release-please-manifest.json`: Manages release versioning.
- `release-please-config.json`: Configures the versioning behavior and release process.

Additionally, configure the necessary secrets (`TOKEN_GITHUB`) in your GitHub repository settings under `Secrets`.

## Usage

### Setup Secrets

Set up the `TOKEN_GITHUB` secret with a GitHub token that has appropriate permissions to push to the repository and manage pull requests.

### Updating Version

This operation increments the project version and creates a pull request with the updated version. Configure it as follows:

```yaml
- name: Update Version
  uses: cryptlex/git-action@1.0.0
  with:
    operation-mode: update-version          # Operation mode
    release-as: ${{ inputs.version_type }}  # Specify the version update type: 'patch', 'minor'
    git-user-name: github-actions           # Git username for commits
    git-user-email: github-actions@github.com    # Git email for commits
    empty-commit: ${{ github.event.inputs.xyz }} # Create an empty commit if set to 'true'
    token: ${{ secrets.TOKEN_GITHUB }}      # GitHub token with appropriate permissions
    url: https://github.com/.....git        # Repository URL


### Pushing tags

This operation pushes tag to the repository. Configure it as follows:

```yaml
- name: Push Tag
  uses: cryptlex/git-action@1.0.0
  with:
    operation-mode: push-tags                 # Operation mode.
    git-user-name: github-actions             # Git username for commits
    git-user-email: github-actions@github.com # Git email for commits

tagging-status: This output indicates whether the tag pushing operation was successful. It returns true for a successful operation and false otherwise. You can use this output to conditionally execute subsequent steps in your GitHub Actions workflow based on whether the tagging was successful.
# Boilerplate

## Usage

### New Project

1. Prepare an empty git repository and clone it to your computer
2. Run the following command:

    ```bash
    TEMP_DIR="$(mktemp -d)" && git clone https://bitbucket.org/nabstudio/boilerplates "${TEMP_DIR}" && "${TEMP_DIR}/pipeline/boilerplate-init" && rm -rf "${TEMP_DIR}"
    ```

    You will be ask for the project key and project name.
    - **Project key**: used for deployment purposes (Ex. ECS cluster name, module name, ...).
    - **Project name**: used for displaying only (Ex. Title of the [`README.md`](../README.md), ...).

### Upgrade Project

Upgrade an existing project to use new boilerplates' commits.

```bash
./pipeline/boilerplate-upgrade
```

## Development

### Add New Feature

1. Branch out from its *dependency feature* (Ex. `node` is a *dependency feature* for `node-next`). The name of the new feature must be prefixed with the *dependency feature* and a "-" character.
2. Update the `branch` property in [`config.json`](./config.json) to the feature's name.

### Push Feature

After `git commit` and `git push` changes, run the following command to push those changes to *dependant features* (Ex. push changes in `node-next` to `node-next-redux`):

```bash
./.boilerplate/push
```

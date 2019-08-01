# My Project

(Short description for this project)

- [My Project](#my-project)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Development](#development)
    - [Clone](#clone)
    - [Install](#install)
    - [Debug](#debug)
    - [Run](#run)
    - [With Docker](#with-docker)
    - [Clean](#clean)
  - [Demo](#demo)
  - [Boilerplate](#boilerplate)

## Installation

(Simple instructions on how to install the project)

## Usage

(Simple instructions on how to use the project)

## Development

### Clone

After the first `git clone`, run this command to make sure all submodules are available:

```bash
git submodule update --init --recursive
```

> Note: This command is automatically run after every `git checkout`.

### Install

```bash
./pipeline/install
```

### Debug

```bash
./pipeline/debug
```

### Run

```bash
./pipeline/build
./pipeline/run
```

### With Docker

```bash
# Debug
# This uses docker-compose.debug.yml
./pipeline/docker-debug

# Run
# This uses docker-compose.yml
./pipeline/docker-build
./pipeline/docker-run
```

### Clean

```bash
./pipeline/clean
```

## Demo

## Boilerplate

See boilerplate's [README.md](./.boilerplate/README.md).

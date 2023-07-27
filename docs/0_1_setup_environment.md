# 0.1 Setup Your Environment

We are going to need `Visual Studio code` as our IDE, `git`, `docker` with `compose`, `node` with `npm` and `postman`

For this tutorial we are working on MacOS and to make things easier we are going to install `homebrew` as a package manager

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## IDE

Any IDE with a terminal will work, we are going to use VS Code. 

Let's install it if you haven't already

```bash
brew install --cask visual-studio-code
```

## git

Let's install git if it's not already present

```bash
brew install git
```

If you are working on windows you can easily do the same via winget

on Windows

```poweshell
winget install --id Git.Git -e --source winget
```

check via 

```bash
git --version
> git version 2.39.2
```

## docker

Let's install docker desktop

```bash
brew install docker
```

check version

```bash
docker --version
> Docker version 24.0.2
```

## NodeJS

Install NodeJS

```bash
brew install node@18
```

and check that node and npm are installed

```bash
node --version
> v18.17.0
```

```bash
npm --version
> 9.6.7
```

## Postman

Install postman from the [official website]() or with homebrew

```bash
brew install --cask postman
...
==> Downloading https://dl.pstmn.io/download/version/10.16.0/...
```

## Next

Ready to begin

[home](../readme.md) | [next](./1_1_setup_apollo_server.md)
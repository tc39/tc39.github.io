# TC39 website

The TC39 website aims to improve the web presence and host the documentation of TC39. We want to
make the JavaScript spec more accessible and help people understand what the committee does!

This site is built using GitHub Pages and Jekyll and is currently an MVP. We are looking for
feedback from people of all areas.

## Getting involved

This project adheres to the TC39 [Code of Conduct](https://tc39.github.io/code-of-conduct/).

### Issues

If you find that this website does not provide the information you need, please comment on our
[usability thread](https://github.com/tc39/tc39.github.io/issues/41) with
what you were looking for and where you would have expected to find it! This
helps us understand what people's needs are and how we can improve this page to address those needs.

If you notice a problem with the site itself, such as accessibility or web compatibility, open a new issue and we will try to fix it!

### Pull requests

You can also take on issues and help us improve the site.

Pull request titles should start with the issue number being addressed, followed by
the change that was made. For example, `fix #32, add a footer`.

If changes in the upstream master branch cause your PR to have conflicts, you should
rebase your branch to master and force-push it to your repo (rather than doing a
merge commit).

## Local development

Building the website requires [Docker](https://docs.docker.com/install/). This gives you a dev environment with Ruby, Bundler, and all other project dependencies already installed.

After installing Docker and cloning this repo, you can build and serve the website as follows.
```bash
cd tc39-web-draft
make install      # install the site's Docker image
make build        # run Jekyll and rebuild site folder
make serve        # run Jekyll, serve site on localhost:8000, and watch for local changes
```

## Discussion

We use IRC to communicate. The channel we use is #tc39-website on freenode. You can find
connection instructions [here](https://freenode.net/kb/answer/chat).

## Monthly planning call

We have planning meetings every month, on the _last Tuesday at 10:00 AM CEST_. If you would like to
join, come say hi at the IRC channel! The meeting is held on Google Hangouts [here](https://hangouts.google.com/call/lxrlUjS_VlOcuRU6BsFBAAEI).

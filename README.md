# TC39 website

The TC39 website aims to improve the web presence and host the documentation of TC39. We want to
make the JavaScript spec more accessible and help people understand what the committee does!

## Getting involved

This project adheres to the TC39 [Code of Conduct](https://tc39.es/code-of-conduct/).

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

### Code style

The repo contains a [prettier](https://prettier.io/) and [stylelint](https://stylelint.io/) configuration.
Code style is checked via CI. To prevent unnecessary red builds you should check locally before committing via `npm run lint`.

This website is intended as a content website. While it is a landing page for the Committee responsible for developing the language, our goal here is not to showcase what JavaScript can do, but to present an accessible interface to orient people looking for resources. In order to achieve this, the website intentionally uses as little JavaScript as possible.

## Local development

Building the website requires a relatively up to date version of NodeJS.

```bash
npm ci           # install dependencies from package-lock.json
npm start        # start 11ty server in watch mode
```

### Data files

Global data files live in [\_data](./_data), these files act at the fallback if there's no overrides.

The locale-specific data files live within each locale folder, such as [de](./de). If these have the same keys as the global data files they will override, or even merge with the global data files. Think `Object.assign(de, _data)`. The majority of this site is driven by data from these files.

For more information on how these data files work see [The Data Cascade](https://www.11ty.dev/docs/data-cascade/).

## Discussion

We use Matrix to communicate. See https://github.com/tc39/how-we-work/blob/master/matrix-guide.md for more details and join us at #tc39-website.

## Monthly planning call

The monthly planning call is currently cancelled, as all of our work is taking place asynchronously.
In case we want to start the calls again:

We have planning meetings every month, on the _last Tuesday at 10:00 AM CEST_. If you would like to
join, come say hi at the IRC channel! The meeting is held on Google Hangouts [here](https://hangouts.google.com/call/lxrlUjS_VlOcuRU6BsFBAAEI).

## Site Deployment

We use github actions to deploy the website to the branch gh-pages. If there are any issues with the
deployment, please ping @codehag and she will fix it.

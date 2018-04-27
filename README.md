# tc39 web draft


This is a sketch of a potential website to address an information orientation need for the tc39, see [website](http://tc39.github.io/tc39-web-draft/).

To learn more please get in touch with yulia at mozilla.com

## Setting up your environment
Building the website requires [Docker](https://docs.docker.com/install/) This allows you to have a dev environment set up with Ruby and Bundler already installed, along with all the depenencies this project needs.

Once installed you should be able to get set up by running
`$ make install` - This will install all the Ruby dependencies plus the environment for you to run the site
`$ make build` - This runs Jekyll, and rebuilds the  _site folder
`$ make serve` - If you're developing this is a better option, as it will run Jekyll and watch for changes, this option also sets up a dev server on `localhost:8000`

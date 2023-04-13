### Contributions

This repository's branch structure is designed similarly to the standard [gitflow](https://github.com/nvie/gitflow) model with the addition of a "test" branch between develop and release. The develop, test, and main branches each have their own backend environment. The test branch serves as a safe way for us to test features.

![](readme-assets/git-model.png)

- _Develop_ could have any environmental changes at any time.
- _Test_ will only have user testing and controlled tests running on its environment during the build process.
- _Main_ operates in the production environment.

If you would like to contribute to this repo, start by opening an issue so we can discuss the feature. Create a feature branch from develop and make a pull request into develop when you're done.

For style and linting, there is a prettier config file as well as a tailwind plugin for prettier in the dev dependencies. We use Cypress for our frontend testing, Jest for the backend, and hardhat+waffle on smart contracts. The testing requirements are that all behaviors should be tested before release, not necessarily every line of code.
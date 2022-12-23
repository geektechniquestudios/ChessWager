1. `yarn yarn-upgrade-all`
2. Revert `react-firebase-hooks` and `chessground` by looking at the package.json and yarn.lock diffs
3. `yarn`

If this doesn't work, try deleting the `yarn.lock` file and the `node_modules` folder and then running `yarn` again.
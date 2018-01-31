# Shuber Frontend
The frontend portion of the Sheriff Scheduling System (code named Shuber).

## Table of Contents

- [Getting Started](#getting-started)
- [Developing Features](#developing-features)
- [Conventions](#conventions)
- [Documentation](#documentation)
- [Available Scripts](#available-scripts)
- [Debugging in the Editor](#debugging-in-the-editor)
- [Folder Structure](#folder-structure)
- [Deployment](#openshift-deployment)
- [Getting help or issues](#getting-help-or-reporting-an-issue)
- [How to Contribute](#how-to-contribute)
- [Third Party Libraries Used](#third-party-libraries)
- [License](#license)


## Getting Started

### Developer Workstation Setup
* Install the following:
    - [Node.js]
    - [Yarn]
    - [VS Code] and extensions (below)
       - [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

* Clone Repo
* Install Dependencies
    - Run `yarn` or `npm install` in the root of the project
* Start Development Server
    - Run `yarn start` or `npm start` 
    - This should automatically open up a browser to [http://localhost:3000](http://localhost:3000)

> See [Available Scripts](#available-scripts) for more info

## Developing Features
The following process should be used when developing a feature
* Create a Branch - a branch should be created for any new piece of work
    - Switch to the branch you would like to branch from (e.g. master)
    - Create a new branch, named for the feture you are working on using kabob case (_e.g._ my-new-branch)
* Commit and Sync Often
    - When working on your branch, commit and sync your changes to github often
    - Try to logicially group and name your commits; this makes it easier for the PR
* Create a Pull Request (PR)
    - Sync your local master with origin
    - Switch to your working branch
    - Rebase your working branch (_e.g._ my-new-branch) against master 
        - Ensure all changes have been comitted and synchronized
        - Run `git rebase master`
        - Resolve any conflicts
        - Run `git rebase --continue`
        - Continue to resolve the conflicts and continue the rebase, until no conflicts remain (NOTE: the rebase can be ended at any time by running `git rebase --abort`)
    -  Force Push the rebase onto your remote brach
        - Run `git push -f`
    -  Create a Pull Request for your branch from GitHub, add at least one reviewer
* Make any suggested updates from PR and commit changes
* Merge branch into master and delete branch
* From VS Code, prune your branches
    - Run `git prune`
* From VS Code, delete your local branch  
    - Switch to a non-working branch (_e.g._ master) 
    - Hit `Ctrl+Shift+P`
    - Start typing `Git: Delete Branch` and select the option when it appears
    - Select your working branch to delete it

## Conventions

### `Index.ts` Files
- To reduce the complexity of project structure, this projet does not use `index.ts` files.

### Imports

When importing more than one item from an external library, place each import on its own line; this makes imports easier to comment out when debugging / testing an idea.

```ts
import {
    Glyphicon,
    Button,
    Image
} from 'react-bootstrap'
```
vs
```ts
import {Glyphicon, Button, Image} from 'react-bootstrap'
```

### Components

* Components are visual representations of business objects and data, and should not contain state (_i.e._ should be "dumb components")
* Components should be named using the following convention: _domain_component description, where _domain_ is a major business domain for the application (_e.g._ Assignment, Sheriff, Courthouse, Region, etc.); this will help to group related components.
## Documentation
* [React-Bootstrap Components](https://react-bootstrap.github.io/components/alerts/)
* [Bootstrap CSS](https://bootstrapcreative.com/resources/bootstrap-3-css-classes-index/)
* [Redux Forms](https://redux-form.com/7.2.0/docs/gettingstarted.md/)

## Available Scripts

[Yarn][yarn] or npm can be user for packaging and script running needs; yarn has become the perferred method, as such the following scripts are described from the **yarn** perspective.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `yarn storybook`

Starts the Storybook dev server which operates on [http://localhost:6006](http://localhost:6006)

## Debugging in the Editor

### Visual Studio Code

Ensure the latest version of [VS Code](https://code.visualstudio.com) and VS Code [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) is installed.

The [`launch.json`](.vscode/launch.json) is already configured with a launch task that allows you to launch chrome in a debugging capacity and debug through code within the editor. 

Start your app by running `yarn start`, and start debugging in VS Code by pressing `F5` or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.

## Folder Structure

```
.vscode/                  - VSCode Configuration

config/                   - React/Babel/Typescript configuration
└── jest                  - Jest testing configuration / transforms

docs/                     - Project Documentation
└── images        
└── icons         

openshift/                - OpenShift-specific files
├── scripts               - helper scripts
└── templates             - application templates

config/                   - Public HTML Assets

scripts/                  - Build, dev and test scripts

src/
└── app                   - Root of the front end application
    └── api               - temporary location for mock api
    └── components        - basic components
    └── containers        - container components (i.e using redux/state)
    └── infrastructure    - Utilities
    └── modules           - modules represent domain specific components, containers and state
        └── sheriffs      - deals with sheriffs
        └── tasks         - deals with sheriff tasks
    └── pages             - pages that can be accessed through navigation
    └── store             - the redux store and root reducer setup
└── libs                  - A place for holding additional typescript definition (d.ts) files 
└── server                - Eventual resting place of a server for the frontend (if we create one)
```

## OpenShift Deployment

See [OpenShift Readme](openshift/Readme.md)

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
* [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (stage 2 proposal).
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) and [Flow](https://flowtype.org/) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

While we recommend to use experimental proposals with some caution, Facebook heavily uses these features in the product code, so we intend to provide [codemods](https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb) if any of these proposals change in the future.

Note that **the project only includes a few ES6 [polyfills](https://en.wikipedia.org/wiki/Polyfill)**:

* [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) via [`object-assign`](https://github.com/sindresorhus/object-assign).
* [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) via [`promise`](https://github.com/then/promise).
* [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

## Getting Help or Reporting an Issue

To report bugs/issues/feature requests, please file an [issue](https://github.com/bcgov/bcjustice-shuber-frontend/issues/).

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## Third-Party Libraries
 **Todo**
 Put links to third party libraries and licenses here

## License

    Copyright 2016 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.


[Yarn]:https://yarnpkg.com/en/
[VS Code]:https://code.visualstudio.com/
[Node.js]:https://nodejs.org/en/
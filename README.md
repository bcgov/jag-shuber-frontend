# Scheriff Scheduling Frontend (Shuber)
The frontend portion of the Sheriff Scheduling System (code named Shuber).

## Project Architecture
![Context Diagram](https://github.com/bcgov/jag-shuber-api/blob/master/docs/Context%20diagram%20for%20Scheduling%20System.png)

The notes on the projects architecture as well as other development notes can be found in the [Project Docs](./docs/index.md)


## Getting Started

### Development Environment
* Install the following:
    - [Node.js](https://nodejs.org/en/)
    - [Yarn](https://yarnpkg.com/lang/en/)
    - [VS Code] and extensions (below)
       - [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
       - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* Mac Users
    - Install [Homebrew](https://brew.sh/)
    - Use Homebrew to install watchman
        `brew install watchman`
* Clone Repo
* Install Dependencies
    - Run `yarn` in the root of the project

## Environment Variables
The development scripts for this application allow customization via an environment file in the root directory called `.env.local`.  If this file is present, it will be used to override environment variables for the development environment.  Here's an example of the environment variables that can be overridden (and their default values):

```env
# Location to proxy API Traffic
API_URL="https://frontend-jag-shuber-dev.pathfinder.gov.bc.ca/"
# Fake Siteminder Header Overrides
SMGOV_USERGUID='SOMEGUIDGOESHERE'
SMGOV_USERDISPLAYNAME='Name, Your'
SMGOV_USERTYPE='user'
SMGOV_USERIDENTIFIER='yname'
```

if you had an instance of the api in minishift you can change your `API_URL` to point your development frontend at that instance instead of our running dev instance in pathfinder for instance your `.env.local` might contain:

```
API_URL="https://api-dev.192.168.99.100.nip.io/"
SMGOV_USERGUID='bnye'
```

## Commands

### Development

The following commands support various development scenarios and needs.


> `yarn start`
>
> Runs the [webpack-dev-server]() in conjuction with a [fake siteminder proxy]() to facilitate proxying API traffic to the url specified by the `API_URL` environment variable.  (See [Environment Variables](#environment-variables)).  
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.<br/>
> The page will reload if you make edits.<br/>
> You will also see any lint errors in the console.

> `yarn start:dev`
>
> The same as `yarn:start` however overrides the API_URL to point at a development instance of the API at its default port [http://localhost:3001](http://localhost:3001).  Note: you must be running the [API Project](https://github.com/bcgov/jag-shuber-api) concurrently.

> `yarn test`
>
> Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

> `yarn update-api`
>
> Upates [jag-shuber-api](https://github.com/bcgov/jag-shuber-api) package to the most recent version. 

> `yarn storybook`
>
> Starts the [Storybook](https://storybook.js.org/) dev server which operates on [http://localhost:6006](http://localhost:6006)
> <br/> <span style="color:red">CURRENTLY BROKEN</span>


### Support

These commands are here to support the continuous integration and other esoteric development concerns.  You should rarely need to run these commands.

> `yarn build`
>
> Builds the app for production to the `build` folder.
> <br/> It bundles React in production mode and optimizes the build for the best performance.
> <br/> The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
> <br/> See the section about [deployment](#deployment) for more information.

> `yarn prepare`
>
>  This command is automatically run by yarn/npm after an install operation.  In our projects case, it runs [`patch-package`](https://www.npmjs.com/package/patch-package) to address any shortcomings of packages that we are currently using.

> `yarn build-storybook`
>
> Bundles up the storybook application so that it could be deployed (for documentation purposes).

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

public/                   - Public HTML Assets (see )

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

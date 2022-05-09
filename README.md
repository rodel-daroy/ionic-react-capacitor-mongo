# Fanzone App

This repository contains the react-based client application for the Fanzone Media GmbH platform.

- Production Location: [https://fanzone.media](https://fanzone.media)
- Staging Location: [https://stage.fanzone.media](https://stage.fanzone.media)
- Dev Location: [https://fanzonedev-troao.mongodbstitch.com](fanzonedev-troao.mongodbstitch.com)

## Tech & Tools

- [MongoDB Realm Web SDK](https://docs.mongodb.com/realm/web/)
- [Ionic Framework](https://ionicframework.com/docs/react)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/) + [Apollo](https://www.apollographql.com/docs/react/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Commitizen](https://commitizen-tools.github.io/commitizen/)
- [Docker](https://www.docker.com/)

## Development

You can run the app either inside a Docker container or on your machine.

The app is running at [localhost:3000](http://localhost:3000)

**Note:** Git hooks and commitizen (for CI) are only available with the *local* strategy.

### Run this in Docker

1. Installed Docker Deamon [getDocker](https://get.docker.com) and [Docker Compose](https://docs.docker.com/compose/install/)
2. Setup docker volume with npm dependencies: `make setup` (Does this work on windows?)
3. Create a `{project-root}/secrets` folder containing required variables
    You need to create one file for each variable in .env.local (see Local Strategy).
    The file name corresponds to the variable name; the file content to the variable value
4. Start the app in development mode: `docker-compose up`

To run specific npm scripts, run `docker-compose run --rm fanzone_client npm run {script_name}` 

**Note:** To install or update npm dependencies for the Docker setup run `make install {dep}` instead of `npm install {dep}`

### Run Local

1. Install latest version of [NodeJS](https://nodejs.org/en/)
2. Install npm dependencies: `npm i`
3. Initialize Commititzen: `./node_modules/.bin/commitizen init cz-conventional-changelog --save-dev --save-exact`
4. Create `{project-root}/.env.local` file containing required variables (see Teams -> WebDevelopment -> Files -> Main App)
5. Start the app in development mode: `npm run start:local`

## Deployment

Pushes to the branches `dev`, (`stage`, `main` - not implemented, yet) trigger a build, which is automatically deployed to the respective MongoDB Realm App.
Which Realm App is handling the pushes to a branch is configured within the Realm UI of this Realm App.

**Note:** The one thing that is not automatically deployed are the `node_modules` for the Realm App.
If updated, the `mongo-realm/functions/node_modules.tar.gz` archive has to be manually uploaded in the Realm UI ([Here](https://realm.mongodb.com/groups/600ed138c4cf90557a796458/apps/6022b416b5f68f49e41afc7d/dependencies))

To manually build a production bundle run: `npm run build`.
The build output is generated in `mongo-realm/hosting/files` by default.

## Common Errors

### Updating Realm (Error: 'error validating rule: invalid schema.')

The automatic deployment to Realm will fail if the updates contain invalid configurations. Unfortunately realm provides very limited
error-details on why the deploy failed. It vaguely indicates which folder contains invalid files (e.g. `functions`, oder `services`).

While setting up the project I encountered occasional errors with the schema/roles definitions, which are very tedious to debug.

I recommend atomic updates to quickly catch faulty configurations.

### Realm Functions (Error: 'runtime error during function validation')

Realm does not support common JavaScript Modules syntax.

- This mean any top-level `import` statements break the function.
- The file has to contain one `exports = functionName` statement.

### Build for ios 

- If you haven't already, download and install Xcode and run `xcode-select --install` to install dev tools
- You also need to thave ionic installed for this, run `npm install -g @ionic/cli`
- Generate the native project, if it does not already exist `ionic capacitor add ios`
- For hot reload you can run `ionic capacitor run ios -l --external`  

#### Additional Commands: 
- To open the app in Xcode run `ionic capacitor open ios`
- To sync your latest code with the project you can run `ionic capacitor copy ios`

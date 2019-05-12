# Run the project

- Run `npm install && npm run start` in the root folder of the project to run the app.
- Run `npm install && npm run start` in the server folder to run the mock server.

# Test the project

- Run `npm run test` in the root folder of the project to test the app.
- Run `npm run test` in the server folder to test the mock server.

# What are the highlights of your logic/code writing style?

- Fronted app and Node js server are in the same repo. In real life, these will be separate repos. We need to start both separately using npm scripts mentioned above.
- Frontend App uses web socket to get the real-time data from the mock server (Node.js)
- Mock server mimics the connection with the sensors' (IoT devices) API. It only returns the
  static temperature data of beer containers for the time-being.
- Frontend App uses Web Components API to create a component.
- 'CustomEvent' is used to communicate among components.
- Environment Config are isolated and will not be checked in the source repository (Twelve-Factor App principle) in the future. For the purpose of test, I have checked into the repo. Look for env.js and config.json.
- Use of Shadow-DOM to isolate the component from the rest of the app.
- Jasmine/Karma is used for unit testing in the frontend.
- Tape is used for unit testing in the node js server.

## What could have been done in a better way? What would you do in version 2.0?

- Use Depedency Injection (DI) approach (injecting instance directly in the constructor)
- Use Template engine to help with interpolation in the component template
- Currently, there is a lack of decent library to test the web components. Unit tests needs to be optimized in the future.
- Use Typescript to reap all the benefits of static type-checking.

## What were the questions you would ask and your own answers/assumptions?

- Sensor and Node.js interconnection: It will depond upon the API of the sensor device. Assumption is that Node js will provide the real time data.
- Prod build (bundle) && depolyment: We can use webpack along with transpilers to generate the bundle in the future.

## Any other notes you feel relevant for the evaluation of your solution.

- Due to the time constraint, this app is just a basic version. We can refactor and optimize a lot of things.
- App only covers minimal unit testing. In the future, we can extend with E2E testing and make it part of CI/CD process too. We can go up to 80% of unit testing coverage.
- I have added the tsconfig and npm scripts to compile the ts files for the future.
- I have just put the basic UI with few lines of css. This can be optimzed by using SASS, which helps to achieve modularity in styles.

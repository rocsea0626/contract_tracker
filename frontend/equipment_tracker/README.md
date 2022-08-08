# Equipment Tracker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Quick start
NPM install dependencies
```sh
npm install
```
Frontend should only be deployed after backend has been deployed.
Environment variables such as `API_GATEWAY_URL` and `API_KEY` need to be added `.env` file.
```sh
# Create a .env file with content below:
touch .env
#REACT_APP_API_GATEWAY_URL=<output from backend deployment>
#REACT_APP_API_KEY=<output from backend deployment>
```

Using the `deploy.sh` script to build & deploy frontend Reactjs app into AWS S3 bucket. S3 bucket has been configured to host this web app.
```sh
./deploy.sh
```

## Local Development
Start development mode
```sh
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.s
The page will reload when you make changes. You may also see any lint errors in the console.

## Unit test
Launches the test runner in the interactive watch mode.
```sh
npm test
```
## Build for production
Builds the app for production to the `build` folder. The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
```sh
npm run build
```
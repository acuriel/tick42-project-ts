# Tick42 Project

## Requirements

* NodeJS >= 12.18.2
* npm >= 6.14.5
* yarn >= 1.22 (recommended but not mandatory)


## How to run

1. Open a console in the project direectory and run `yarn` or `npm install` for installing project dependecies.

2. Start the backend **dev** server for a mockup api with `yarn serve` and wait until the server starts. By default it runs on port 4000. You can change the port in the script inside the *package.json* file, and update the port in the *.env.development* variable

3. Open a new terminal in the project directory and run the frontend server with `yarn start` and after the server started go to [http://localhost:3000/](http://localhost:3000/).


## Known bug from json-server

You'll notice that sometimes when you remove a Project from a Company, all or some of the projects are removed. This is a [known bug](https://github.com/typicode/json-server/issues/885) from **json-server**  but would not happen with the real API. If you check the requests and the code, you could find that just one DELETE request is made to the right endpoint. Sorry for the issue, I never had it with json'serer until now.



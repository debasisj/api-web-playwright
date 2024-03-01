# api-web-playwright

A simple Playwright based project for both web and api testing

### Env set up

API tests use weatherbit api key as env variable.

#### Local

Please create and set up env variable as `weatherbitKey`.

#### GitHub actions

Weatherbit api key has been already set up as action secrets and used in the `playwright.yml`. So no futher action required

### Set Up and running scripts

#### Prerequisite

Need to have npm and node.js installed

#### Installation

After cloning the project to local, in the root run `npm install`

#### Run

1. `npm test` - run all tests in headless mode
2. `npm run test-headed`- run test in head mode
3. `npm run test-ui`- open playwright ui console to run tests
4. `npm run test-report`- open the html report

#### GitHub Action Report

After execution html report exported as artifacts which can be download to view

### Projects

This repo contains two projects

1. Web - for web base testing. Use chromium as default browser. This can be changed in `playwright.config`
2. api - for api related tests

# Rappid-Angular-Demo

A demo of getting rappid working with Angular using the kitchen sink app.

This is a start and getting Rappid integrated with Angular
Unfortunately it's still using all of the rappid dependencies
- Backbone
  - underscore
- Jquery
- Lodash
and a bunch of others 
I was able to relegate the jquery to at least not being visible in the component

ToDo:

- I need to split this up and convert each item into its own directive so that can be pulled in and manipulated seperately.

- remove backbone references and angular input events instead

- i dunno convince client.IO to do all of this for me instead? or better yet pay me to do it!




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

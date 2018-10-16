# CloudNC - Angular test

## Introduction

Hi :wave:,

Thanks for reaching out and welcome to CloudNC frontend test.

The final goal of this test is for you to add features on top of an Angular application. This application has been built using:

**A framework:**

- Angular (v6)

**A stream library (to build a reactive application):**

- [RxJS](https://github.com/ReactiveX/rxjs)

**A state management system:**  
- [Ngrx](https://github.com/ngrx/platform) including all of the following:
  - Store
  - Effects
  - Entity
  - Router store
  - Store dev-tools

## Scenario :bulb:

A frontend dashboard has been build that monitors remote machines'
task processing activity.

As each machine "comes online" it registers itself with a service which the frontend
can access over http, and begins to post status updates (either `"ON"` or `"OFF"`)
to the service which indicate the status of that machine processing a task.

This service exposes this machine info & stream of status updates to the
frontend web client for display in a dashboard. As machines come online,
they are added to the dashboard, and upon "click" of that machine label,
the live history of the status updates from when the web app first
connected to the service is shown.

The docker container we've provided simulates the backend service - it
gives you access to two things:

- One websocket which emits the status changes in real time of every machine
- One REST endpoint (`/machines/:machineId`) that returns for a given machine
  some basic information (just the `name` & `id`).


## How to get started

### Prerequisites
You will need the following before you can run the application
- Node installed (recommended version >= 8)
- Docker

### Backend

The backend is deployed into a Docker image that you'll need to run locally.
The service binds to port `3000` internally - once you're running the container
the API will be available at http://localhost:3000 (the root route will
say "Hello World" if all is working well)

The docker image is available here: https://hub.docker.com/r/cloudnc/frontend-interview-backend/

To run the image, simply execute
```sh
docker run -it -p 3000:3000 cloudnc/frontend-interview-backend
```

### Frontend

- Clone the repo (Please don't fork so that other candidates can't easily
  discover your solution)
- Open the frontend folder
- Run `yarn` to install the dependencies
- Run `ng serve` to get the app up and running on port 4200
- Go to http://localhost:4200 and you should see machines appearing and
    the statuses updating, with the total machine "uptime" & "downtime"
    being displayed in seconds.

## Your tasks :ballot_box_with_check:
1. _As a user, I'd like to be able to intuitively understand the "uptime"
& "downtime" durations rather than a decimal value of seconds_
- Implement a `Pipe` to format this output in a more human friendly format.
- Feel free to pick whichever date
[library](https://momentjs.com/)
[takes](https://moment.github.io/luxon/)
[your](https://date-fns.org/)
[fancy](https://github.com/iamkun/dayjs),
however when you do this, make sure to wrap the library in a `Service`
so that the library can be easily substituted for another.
2. _As a user I'd like to view the machines grouped by their status_
- In the `MachinesComponent` alter the ui so there are two groups
of machines; one `ON` machines and the other `OFF` machines.
3. _As a user, when viewing status listings, I'd like to see how long ago
a status occurred, formatted like "X seconds ago", "1 hour ago" etc._
- Using the same `Service` created in the first task, display the status
listing (found when clicking on one of the machines) with a `(X seconds ago)`
style label after the timestamp.
- Consider what would happen if the user keeps this page open for a long
time - a status that says `1 second ago` will very quickly become out of
date. Make sure your implementation keeps the output "correct".

## Not expected from you

- Writing unit, integration or e2e tests (this is only in the interest of saving you time)
- Adding more features than the ones required
- A beautiful UI. Angular material is already set up, use it and that will be enough

## Expected from you

- Discover the existing code to avoid duplication
- Understand what you have to build, ask us questions if you have doubts
- Write clean, reusable and optimized code. We prefer to have 50% of the final app with a good code instead of 100% with poor quality code!
- Write comments to explain your choices if needed. We believe that if you write quality code, it should be easily readable and need few comments. Here we want to know what and how you think about the app, so do not hesitate to write a lot of them
- Regularly make commits, which might be helpful to understand the way you've built the app

Finally, good luck, and don't hesitate to get in contact if you need a hand understanding the tasks.

Once completed, please send back your solution as a git repository either just as a git repo url that we
can access, or a zipped directory including the `.git` directory.

# VICE Front End Coding Exercise

Click [here](./SPEC.md) to view the original specifications for this exercise.
## Installation

Docker is optional but recommended to run everything from a single command line.

Install [Docker Desktop](https://www.docker.com/products/docker-desktop).

**NOTE:** All `docker-compose` commands are to be run from the project root.

Build the images from our Dockerfiles. This process will take a
few moments the first time but subsequent builds will be much faster.

```bash
docker-compose build --parallel
```

## Development

To start the dev server.

```bash
docker-compose up
```

Visit [http://localhost:4000](http://localhost:4000)

## Linting

With Docker

```bash
docker-compose run --rm web yarn run lint
```

Without Docker

```bash
yarn run lint
```

## Testing

With Docker

```bash
docker-compose run --rm web yarn run test
```

Without Docker

```bash
yarn run test
```

## Build for Production

To bundle the project for production.

```bash
docker-compose run --rm web yarn run build
```

This will produce a `/build` directory with an index.html and related resources.

To test the build files, start a simple http server pointing at the build
directory.

```bash
npx http-server ./build
```

Next, start just the backend

```bash
docker-comopose up backend
```

Visit [http://localhost:8080](http://localhost:8080)

## Decisions and Rationale
### Docker

Docker was used to build a container that perfectly matched the node engine
version requirement in the package.json. Docker Compose was used to serve the
main app and the api at the same time, but in separate containers.

### Typescript

There are some clearly defined data types such as "shows" that get passed around
a lot so opting in to some strict typing made sense.

### Parcel, Then Webpack

Parcel is a handy "no configuration" build tool that can get many modern web
frameworks up and running very quickly. Unfortunately, certain project
requirements exceeded the capabilities of Parcel so it was replaced with
Webpack 5.

### Tailwind and PostCSS

Tailwind, which relies on PostCSS, was used in place of SASS. This saves time by
having a flexible, well documented design system ready, instead of building a
custom one from scratch. The new "just in time" JIT compiler was used to
dramatically speed up the class aggregation across the source files.

### Page Components

The Nuxt/Next pattern of dedicated page components was used since it is well
documented and top level components are rarely embedded in anything but the app.

### Sparse components

The decision was made to use components for repetition, not encapsulation. This
keeps component nesting hiearchies shallow, requiring fewer open files to get
and overview of a page's structure.

### Happy Path Only

For reasons of time, edge cases such as the backend being offline or no shows
in the data are not being handled.

### Remote Fonts

In order to keep Webpack configuration to a minimum, the web font is sourced
remotely from Google's CDNs in the css file.

### Static Images Hack

The images directory needs to be copied to the build, rather than bundled.
The copy-webpack-plugin was conflicting so a quick hack was added to the build
script in package.json to copy the files after the build. This solution will
not work in Windows because it relies on bash commands but this shouldn't be a
problem when running in Docker.

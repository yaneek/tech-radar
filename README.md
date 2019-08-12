# Technology radar

This tool shows the current state of the methodologies, technologies, protocols and tools as used by ourselves. This is based on the pioneering work of [ThoughtWorks](https://www.thoughtworks.com/radar), [Zalando's project](https://github.com/zalando/tech-radar) and [Grzegorz Marchwiński](https://github.com/yaneek/tech-radar).

The Tech Radar is a list of technologies, methodologies, complemented by an assessment result, called ring assignment. There are four rings with the following semantics:
*ADOPT* — Used in production environment, low risk and recommended to be widely used.

*TRIAL* — Technologies that I started to use, solve a real problem; TRIAL technologies are slightly more risky

*ASSESS* — Technologies that are promising and have clear potential value-add for me; I read, learn and monitor such technolologies. Sometimes i started a prototyping effort. ASSESS technologies have higher risks.

*HOLD* — This does not always mean that technology is bad, it just means that it is not in my interest. HOLD technologies should not be used for new projects, but usually can be continued for existing projects.

*RISK* — A possible risk with the technology has been identified. This risk relates to the use of the technology within the project. For example an open source project being purchased by an organization that is likely to close source the software.

## Local Development

1. install dependencies with yarn (or npm):

```bash
yarn install
```

2. start local dev server:

```bash
yarn start
```

3. your default browser should automatically open and show the url: http://localhost:3000/

## Deployment


1. configure deployment url

```bash
export PUBLIC_URL=https://yaneek.github.io/tech-radar/
```

2. build

```bash
yarn lint
yarn build
```

## Docker Build
To build the Docker image, go to the project root and run the following:
```bash
docker build . -t tech-radar:latest
```

## Run the Docker image
```bash
docker run -p 80:8080 tech-radar:latest
```

Then open your browser to:
[http://localhost:8080/tech-radar](http://localhost:8080/tech-radar)

## History

Technology radar based on [Zalando's tech-radar](https://github.com/zalando/tech-radar). Thanks Zalando's team for their code. Base project was completely refactored but visualization concepts still exists 
- extracted tens of visualization functions
- added React library to render filters & footer
- build based on [react-create-app](https://github.com/facebook/create-react-app)
- deployment on Github pages with Travis
- enabled Typescript support

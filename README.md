# Technology radar

This tool shows my skills and directions in which I intend to develop.

## Local Development

1. install dependencies with yarn (or npm):

```bash
yarn install
```

2. start local dev server:

```bash
yarn dev
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


## History

Private technology radar based on [Zalando's tech-radar](https://github.com/zalando/tech-radar). Thanks Zalando's team for their code. Base project was completely refactored but visualization concepts still exists :)
- extracted tens of visualization functions
- added React library to render filters & footer
- build based on [react-create-app](https://github.com/facebook/create-react-app)
- deployment on Github pages with Travis
- enabled Typescript support

Todo:
- radar visualization inside React compontents - d3.js & react, unfortunately both libraries works on DOM :(
- change static data structures into database layer
- entry names visualization withotut d3.js

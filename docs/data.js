function getQuadantsData() {
  const ADOPT = 0;
  const TRIAL = 1;
  const ASSESS = 2;
  const HOLD = 3;

  const quadrants = [
    {
      name: "Languages",
      entries: [
        {
          ring: ADOPT,
          label: "JSON Schema",
          active: true,
          moved: 0,
          link: "https://json-schema.org/"
        },
        {
          ring: ADOPT,
          label: "Swagger",
          active: true,
          moved: 0,
          link: "https://swagger.io/"
        },
        {
          ring: ADOPT,
          label: "OpenAPI",
          active: true,
          moved: 0,
          link: "https://swagger.io/blog/news/announcing-openapi-3-0/"
        },
        {
          ring: TRIAL,
          label: "GraphQL",
          active: true,
          moved: 0,
          link: "https://graphql.org/"
        },
        {
          ring: ADOPT,
          label: "Javascript",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Typescript",
          active: true,
          moved: 0,
          link: "https://www.typescriptlang.org/"
        },
        {
          ring: ADOPT,
          label: "PHP",
          active: true,
          moved: 0,
          link: "http://www.php.net/"
        },
        {
          ring: TRIAL,
          label: "Python",
          active: true,
          moved: 0,
          link: "https://www.python.org/"
        },
        {
          ring: ASSESS,
          label: "Golang",
          active: true,
          moved: 0,
          link: "https://golang.org/"
        },
        {
          ring: HOLD,
          label: "Java",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "C#",
          active: true,
          moved: 0
        },
      ],
    },
    {
      name: "Infrastructure & utilities",
      entries: [
        {
          ring: ADOPT,
          label: "Docker",
          active: true,
          moved: 0,
          link: "https://www.docker.com/"
        },
        {
          ring: ADOPT,
          label: "Docker Compose",
          active: true,
          moved: 0,
          link: "https://docs.docker.com/compose/overview/"
        },
        {
          ring: ADOPT,
          label: "Vagrant",
          active: true,
          moved: 0,
          link: "https://www.vagrantup.com/"
        },
        {
          ring: TRIAL,
          label: "Rancher",
          active: true,
          moved: 0,
          link: "https://rancher.com/"
        },
        {
          ring: TRIAL,
          label: "Kubernetes",
          active: true,
          moved: 0,
          link: "https://kubernetes.io/"
        },
        {
          ring: HOLD,
          label: "Jenkins",
          active: true,
          moved: 0,
          link: "https://jenkins.io/"
        },
        {
          ring: TRIAL,
          label: "Travis",
          active: true,
          moved: 0,
          link: "https://travis-ci.org/"
        },
        {
          ring: ADOPT,
          label: "Gitlab CI",
          active: true,
          moved: 0,
          link: "https://about.gitlab.com/product/continuous-integration/"
        },
        {
          ring: HOLD,
          label: "Bitbucket pipelines",
          active: true,
          moved: 0,
          link: "https://bitbucket.org/product/features/pipelines"
        },
        {
          ring: ADOPT,
          label: "Gitlab",
          active: true,
          moved: 0,
          link: "https://about.gitlab.com/"
        },
        {
          ring: ADOPT,
          label: "JIRA",
          active: true,
          moved: 0,
          link: "https://www.atlassian.com/software/jira"
        },
        {
          ring: ADOPT,
          label: "Slack",
          active: true,
          moved: 0,
          link: "https://slack.com/"
        },
        {
          ring: HOLD,
          label: "Skype",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "draw.io",
          active: true,
          moved: 0,
          link: "https://www.draw.io/"
        },
        {
          ring: ADOPT,
          label: "BalsamiQ",
          active: true,
          moved: 0,
          link: "https://balsamiq.com/"
        },
        {
          ring: ADOPT,
          label: "XMind",
          active: true,
          moved: 0,
          link: "https://www.xmind.net/"
        },
        {
          ring: ADOPT,
          label: "VSC",
          active: true,
          moved: 0,
          link: "https://code.visualstudio.com/"
        },
        {
          ring: ADOPT,
          label: "PHP Storm",
          active: true,
          moved: 0,
          link: "https://www.jetbrains.com/phpstorm/"
        },
        {
          ring: ASSESS,
          label: "Azure functions",
          active: true,
          moved: 0,
          link: "https://azure.microsoft.com/en-us/services/functions/"
        },
        {
          ring: ASSESS,
          label: "AWS Lambda",
          active: true,
          moved: 0,
          link: "https://aws.amazon.com/lambda/"
        },
        {
          ring: ADOPT,
          label: "AWS EC2",
          active: true,
          moved: 0,
          link: "https://aws.amazon.com/ec2/"
        },
        {
          ring: ADOPT,
          label: "Ubuntu",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Alpine",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Alpine",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Raspberry PI",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "Intel Neural Compute Stick",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "AWS ECS",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "AWS EKS",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "AWS Fargate",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Trello",
          active: true,
          moved: 0
        },
      ]
    },
    {
      name: "Frameworks, libraries & development tools",
      entries: [
        {
          ring: ADOPT,
          label: "Supertest",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "RC",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "TypeDI",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Apollo Server",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Nodemon",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Winston",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Passport",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "SenecaJS",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "Bower",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "Strapi",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Puppeteer",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Mongoose",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Yarn",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "ESLint",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "TSLint",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "npm",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "grunt",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "gulp",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "Rxjs",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Node.js",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "Tensor flow",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Nest.js",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "ZendFramework",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "Silex",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Slim",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Symfony",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "PHP Unit",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Mocha",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Jest",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "ExpressJS",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Lodash",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "Dust.js",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "jQuery",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Serverless",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Moleculer",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "React",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "Vue.js",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "Redux",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "Angular",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "MobX",
          active: true,
          moved: 0
        },
      ]
    },
    {
      name: "Data Management",
      entries: [
        {
          ring: ADOPT,
          label: "MongoDB",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Elasticsearch",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Redis",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "Neo4j",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "RabbitMQ",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "xml",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "soap",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "MySql",
          active: true,
          moved: 0
        },
        {
          ring: HOLD,
          label: "SQL Server",
          active: true,
          moved: 0
        },
        {
          ring: ASSESS,
          label: "MariaDB",
          active: true,
          moved: 0
        },
        {
          ring: TRIAL,
          label: "etcd",
          active: true,
          moved: 0
        },
        {
          ring: ADOPT,
          label: "REST",
          active: true,
          moved: 0
        },
      ]
    }
  ];

  return quadrants;
}

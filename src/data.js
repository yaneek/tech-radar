import { TableHead } from "@material-ui/core";

// const ADOPT = 0;
// const TRIAL = 1;
// const ASSESS = 2;
// const HOLD = 3;
const RING_NAME_TO_RING_INDEX = [
  'ADOPT',
  'TRIAL',
  'ASSESS',
  'HOLD',
];

const ALL_ENTRIES = [
  {
    "ring": "ADOPT",
    "label": "Cypher",
    "link": "https://neo4j.com/developer/cypher/",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ],
  },
  {
    "ring": "ADOPT",
    "label": "SQL",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "JSON Schema",
    "link": "https://json-schema.org/",
    "tags": [
      "q0-languages",
      "language",
      "development",
      "test"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Swagger",
    "link": "https://swagger.io/",
    "tags": [
      "q0-languages",
      "language",
      "development",
      "design"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "OpenAPI",
    "link": "https://swagger.io/blog/news/announcing-openapi-3-0/",
    "tags": [
      "q0-languages",
      "language",
      "development",
      "design"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "GraphQL",
    "link": "https://graphql.org/",
    "tags": [
      "q0-languages",
      "language",
      "development",
      "design"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Javascript",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Typescript",
    "link": "https://www.typescriptlang.org/",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "PHP",
    "link": "http://www.php.net/",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Python",
    "link": "https://www.python.org/",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Golang",
    "link": "https://golang.org/",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Java",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "C#",
    "tags": [
      "q0-languages",
      "language",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Docker",
    "link": "https://www.docker.com/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "utility",
      "development",
      "microservices",
      "containerization"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Docker Compose",
    "link": "https://docs.docker.com/compose/overview/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "utility",
      "development",
      "microservices",
      "containerization"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Vagrant",
    "link": "https://www.vagrantup.com/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "utility",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Rancher",
    "link": "https://rancher.com/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "containerization"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Kubernetes",
    "link": "https://kubernetes.io/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "microservices",
      "containerization"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Jenkins",
    "link": "https://jenkins.io/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "CI",
      "CD",
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Travis",
    "link": "https://travis-ci.org/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "CI",
      "CD",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Gitlab CI",
    "link": "https://about.gitlab.com/product/continuous-integration/",
    "tags": [
      "q1-infrastructure",
      "CI",
      "CD",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Bitbucket pipelines",
    "link": "https://bitbucket.org/product/features/pipelines",
    "tags": [
      "q1-infrastructure",
      "utility",
      "CI",
      "CD",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Gitlab",
    "link": "https://about.gitlab.com/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "JIRA",
    "link": "https://www.atlassian.com/software/jira",
    "tags": [
      "q1-infrastructure",
      "utility",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Slack",
    "link": "https://slack.com/",
    "tags": [
      "q1-infrastructure",
      "utility"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Skype",
    "tags": [
      "q1-infrastructure",
      "utility"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "draw.io",
    "link": "https://www.draw.io/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "design"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "BalsamiQ",
    "link": "https://balsamiq.com/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "design"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "XMind",
    "link": "https://www.xmind.net/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "design"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "VSC",
    "link": "https://code.visualstudio.com/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "PHP Storm",
    "link": "https://www.jetbrains.com/phpstorm/",
    "tags": [
      "q1-infrastructure",
      "utility",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Azure functions",
    "link": "https://azure.microsoft.com/en-us/services/functions/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "deployment",
      "serverless"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "AWS Lambda",
    "link": "https://aws.amazon.com/lambda/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "deployment",
      "serverless"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "AWS S3",
    "link": "https://aws.amazon.com/s3/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "database"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Minio",
    "link": "https://www.minio.io/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "database"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "AWS EC2",
    "link": "https://aws.amazon.com/ec2/",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "deployment"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Ubuntu",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Alpine",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "deployment"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Raspberry PI",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Intel Neural Compute Stick",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "iot",
      "machine-learning",
    ]
  },
  {
    "ring": "ASSESS",
    "label": "AWS ECS",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "deployment",
      "containerization"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "AWS EKS",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "deployment",
      "containerization"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "AWS Fargate",
    "tags": [
      "q1-infrastructure",
      "infrastructure",
      "deployment",
      "containerization"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Trello",
    "tags": [
      "q1-infrastructure",
      "utility"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "EditorConfig",
    "link": "https://editorconfig.org/",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Browsersync",
    "link": "https://browsersync.io/",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Supertest",
    "tags": [
      "q2-frameworks",
      "library",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "RC",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "TypeDI",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Apollo Server",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Nodemon",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Winston",
    "link": "https://github.com/winstonjs/winston",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Passport",
    "link": "http://www.passportjs.org/",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "SenecaJS",
    "tags": [
      "q2-frameworks",
      "framework",
      "development",
      "microservices"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Bower",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Webpack",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Strapi",
    "link": "https://strapi.io/",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "KeystoneJS",
    "link": "https://keystonejs.com/",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Puppeteer",
    "link": "https://pptr.dev/",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Mongoose",
    "link": "https://mongoosejs.com/",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Yarn",
    "link": "https://yarnpkg.com/lang/en/",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "ESLint",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "TSLint",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "npm",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "grunt",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development",
      "deployment"
    ]
  },
  {
    "ring": "HOLD",
    "label": "gulp",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Rxjs",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Node.js",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Tensor flow",
    "tags": [
      "q2-frameworks",
      "framework",
      "machine-learning",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Nest.js",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "ZendFramework",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Silex",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Slim",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Symfony",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "PHP Unit",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development",
      "test"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Mocha",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development",
      "test"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Jest",
    "tags": [
      "q2-frameworks",
      "development-tool",
      "development",
      "test"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "ExpressJS",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Lodash",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "Dust.js",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "HOLD",
    "label": "jQuery",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Serverless",
    "tags": [
      "q2-frameworks",
      "framework",
      "development",
      "serverless"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Moleculer",
    "tags": [
      "q2-frameworks",
      "framework",
      "development",
      "microservices"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "React",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "TRIAL",
    "label": "Vue.js",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Redux",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Angular",
    "tags": [
      "q2-frameworks",
      "framework",
      "development"
    ]
  },
  {
    "ring": "ASSESS",
    "label": "MobX",
    "tags": [
      "q2-frameworks",
      "library",
      "development"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "MongoDB",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Elasticsearch",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Redis",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "HOLD",
    "label": "Memcached",
    "link": "https://memcached.org/",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Aerospike",
    "link": "https://www.aerospike.com/",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Apache Ignite",
    "link": "https://ignite.apache.org/",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ASSESS",
    "label": "Apache PredictionIO",
    "link": "https://predictionio.apache.org/",
    "tags": [
      "q3-data-management",
      "database",
      "machine-learning"
    ]
  },
  {
    "ring": "ADOPT",
    "label": "Neo4j",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "RabbitMQ",
    "tags": [
      "q3-data-management",
      "database",
      "queue",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "xml",
    "tags": [
      "q3-data-management",
      "data-structure",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "JSON",
    "tags": [
      "q3-data-management",
      "data-structure",
    ]
  },
  {
    "ring": "HOLD",
    "label": "soap",
    "tags": [
      "q3-data-management",
      "protocol",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "MySql",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "HOLD",
    "label": "SQL Server",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ASSESS",
    "label": "MariaDB",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "TRIAL",
    "label": "etcd",
    "tags": [
      "q3-data-management",
      "database",
    ]
  },
  {
    "ring": "ADOPT",
    "label": "REST",
    "tags": [
      "q3-data-management",
      "protocol",
    ]
  }
];

function normalizeEntry(entry, quadrantIndex) {
  return {
    ring: RING_NAME_TO_RING_INDEX.indexOf(entry.ring),
    label: entry.label,
    link: entry.link,
    moved: (typeof(entry.moved) === 'undefined') ? 0 : entry.moved,
    active: (typeof(entry.active) === 'undefined') ? 0 : entry.active,
    quadrant: quadrantIndex,
  }
}

function filterEntries(entries, includeTags) {
  // when includeTags is not provided just return all entries
  if (!(includeTags && includeTags.length) ) {
    return entries;
  }
  return entries.filter((entry) => {
    for( let includeTag of includeTags) {
      if (entry.tags.indexOf(includeTag) >= 0) {
        return true;
      }
    }
    return false;
  });
}

export function getQuadrantEntriesGroupedByTags(quadrantsList, excludeTags, includeTags) {
  let filteredEntries = [];
  let entries = filterEntries(ALL_ENTRIES, excludeTags, includeTags);
  for (let entry of entries) {
    for (let quadrantIndex in quadrantsList) {
      let quadrantTags = quadrantsList[quadrantIndex].tags;

      for (let quadrantTag of quadrantTags) {
        if (entry.tags.indexOf(quadrantTag) >= 0) {
          filteredEntries.push(normalizeEntry(entry, quadrantIndex))
        }
      }
    }
  }

  return filteredEntries;
}

export function getAllTags() {
  let tagKeys = {};
  ALL_ENTRIES.forEach( (entry) => {
    entry.tags.forEach(tag => {
      tagKeys[tag] = true;
    })
  });
  return Object.keys(tagKeys).filter(tag => {
    const reQuadrantTag = /q[0-9]-*/;
    // filter out quadrant tags
    return !reQuadrantTag.test(tag);
  });
}

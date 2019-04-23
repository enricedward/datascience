[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">datascience</h1>

> 🦞 Landing page for listing our data science tools and directing people to them
> https://datascience.oceanprotocol.com

[![Build Status](https://travis-ci.com/oceanprotocol/datascience.svg?token=3psqw6c8KMDqfdGQ2x6d&branch=master)](https://travis-ci.com/oceanprotocol/datascience)
[![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol) [![Greenkeeper badge](https://badges.greenkeeper.io/oceanprotocol/datascience.svg)](https://greenkeeper.io/)

---

- [Copy editing](#copy-editing)
  - [Editing workflow](#editing-workflow)
- [Development](#development)
- [Deployment](#deployment)
- [Authors](#authors)
- [License](#license)

---

## Copy editing

Create a new link by editing the [`content.yml`](content.yml) file. When editing on GitHub, click the pencil icon to start editing the file:

<img width="293" alt="screen shot 2018-11-02 at 11 32 19" src="https://user-images.githubusercontent.com/90316/47910420-15142280-de93-11e8-8ab8-b8616abb7e60.png">

Only thing to remember is to keep the indentation as in this example:

```yaml
links:
    - name: JupyterHub Notebook
      url: https://longurl.com
    - name: Another JupyterHub Notebook
      url: https://longurl.com
```

This example would result in:

<img width="700" alt="screen shot 2018-12-04 at 14 58 25" src="https://user-images.githubusercontent.com/90316/49446699-152a7980-f7d5-11e8-8945-959f2e05e90b.png">

### Editing workflow

The basic workflow goes like this:

1. edit the [`content.yml`](content.yml) file
2. when committing changes, create a new branch and open a pull request
3. ask for review & approval of pull request
4. have the pull request merged

<img width="696" alt="screen shot 2018-11-02 at 11 50 14" src="https://user-images.githubusercontent.com/90316/47911346-7dfc9a00-de95-11e8-9414-71fe63b1577b.png">

The `master` branch is protected from being pushed to, enforcing the following rules:

-   every change has to be done in another branch and go through a pull request against `master`
-   pull requests need to be reviewed and approved
-   pull requests need to pass the CI status checks
-   pull requests can be merged by a defined list of members only
-   when merged into `master`, pull request changes are deployed automatically to live

This will then initiate an automatic build & deployment process, and your change should be live within a minute or so.

## Development

This repo is a simple page builder utilizing [gulp](https://gulpjs.com) and [Liquid](https://shopify.github.io/liquid/) templating.

```bash
npm i
npm start
```

Will start a live-reloading local server, reachable under [localhost:1337](http://localhost:1337).

## Deployment

Page lives in a S3 bucket and deployment happens automatically via Travis based on the rules described in the [editing workflow](#editing-workflow). For that to work, the following environment variables need to be setup in Travis:

-   `AWS_DEFAULT_REGION`
-   `AWS_ACCESS_KEY_ID`
-   `AWS_SECRET_ACCESS_KEY`

Every `master` Travis build triggers this script which can also be used for manual emergency deployments:

```bash
npm run deploy
# executing ./deploy.sh
```

DNS for `datascience.oceanprotocol.com` is setup via Cloudflare, pointing to the S3 bucket under `datascience.oceanprotocol.com.s3-website-ap-southeast-1.amazonaws.com`

## Authors

-   Matthias Kretschmann ([@kremalicious](https://github.com/kremalicious)) - [Ocean Protocol](https://oceanprotocol.com)

## License

```
Copyright 2018 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

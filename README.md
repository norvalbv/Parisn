<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">'Parisn' **in progress**</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Parisn is an eCommerce site with a twist. Each product, starting at £1,000 will logarithmically decrease to £0 over a period. The user can purchase the product at any given time but due to the limited stock and tension built around the product, the user can either risk it, wait for a lower price or be faced with the chance of another user purchasing the product.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- Websockets
- JavaScrit and Typescript
- Yarn for package manager

Front end:

- [React.js](https://reactjs.org/)
- [TailWindCSS](https://tailwindcss.com/)

Testing:

- Jest
- Testing Library
- Cypress
- Cucumber / Gherkin

Back end:

- [Express](https://expressjs.com/)
- [Node](https://nodejs.org/en/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Roadmap -->

### Roadmap

*Note: this is more of a personal roadmap and just note-worthy features that will be added*
- Connect AWS DynamoDB for database [Done] (in progress improvements underway)
- Allow using login (auth etc) using AWS Cognito [in progress]
- Add websockets to ensure live data is correct [in progress]
- Fix azure pipeline

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

### Installation

If you wish to clone the project and run locally please view the following:

1. Clone the repo
   ```sh
   git clone https://github.com/norvalbv/parisn
   ```
2. Install YARN packages in webapp (access via: `cd webapp` in root folder) folder **and** root folder **and** server (access via: `cd server` in root folder) .
   ```sh
   yarn install
   ```
3. Start server by running:
   ```js
   yarn run server
   ```
   Start webapp by running:
   ```
   yarn start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<div align="center">
  <img src="assets/logo.png" alt="logo" width="200" height="auto" />
  <h1>Artist Discography</h1>
  <p>
    Discover Every Beat: Your Journey Through Artists' Discographies Awaits!
  </p>
  <h4>
    <a href="https://github.com/Louis3797/awesome-readme-template/">View Demo</a>
    &emsp;&emsp;
    <a href="https://github.com/AshtonHeald/spotify-artist-search/issues">Report Bug</a>
  </h4>
</div>

## Table of Contents

 - [About](#about)
    * [Screenshots](#screenshots)
    * [Description](#description)
    * [Features](#features)
    * [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installaton](#installation)
    * [Configuration](#configuration)
    * [Development](#development)
    * [Deployment](#deployment)
- [License](#license)

<!-- About -->
##  About

<div id="screenshots">
  <img src="/public/screenshot1.webp" />
</div>

<div id="description">
  <p></p>
</div>

### Features

<dl>
  <dt>Feature 1</dt>
  <dd>The new version of this product costs significantly less than the previous one!</dd>
  <dt>Feature 2</dt>
  <dd>We've changed the product so that it's much easier to use!</dd>
</dl>

### Tech Stack

| Client | Server | DevOps |
|--------|--------|--------|
| [React](https://react.dev)  | Github Pages | Github Actions |
| [React Bootstrap](https://react-bootstrap.netlify.app/)  | | |
| [React Icons](https://react-icons.github.io/react-icons/) | | |
| [Axios](https://axios-http.com/)  | | |

> [!IMPORTANT]
> This Project uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api) and requires an access token.



<!-- Getting Started -->
##  Getting Started
### Prerequisites
This project uses pnpm as package manager
```bash
 npm install --global pnpm
```

### Installation

Clone the repository
```bash
git clone https://github.com/AshtonHeald/spotify-artist-search.git
```

Install dependencies
```
pnpm install
```

### Configuration

Environment Variables: To run this project, ensure you've added the necessary environment variables to your `.env` file. Replace `Client ID` and `Client Secret` with your own credentials. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
```
VITE_CLIENT_ID=Client ID
VITE_CLIENT_SECRET=Client Secret
```

### Development

Start Vite dev server in the current directory.
```bash
pnpm run dev
```

Locally preview the production build. Do not use this as a production server as it's not designed for it.
```bash
pnpm run preview
```

### Deployment

Build for production. [Static Deploy](https://vitejs.dev/guide/static-deploy.html)
```bash
pnpm run build
```

---



<!-- Licence -->
### License

Distributed under the MIT License. See `LICENSE.md` for more information.


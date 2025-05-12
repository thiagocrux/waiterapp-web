# WaiterApp (Web)

Web client of the WaiterApp, an app made to help waiters to manage orders. This dashboard enables you to manage order statuses, remove orders, and receive real-time updates on new orders via WebSockets.

For more details on other project components, check out the [API](https://github.com/thiagocrux/waiterapp-api) and [mobile client](https://github.com/thiagocrux/waiterapp-mobile) repositories.

## Technologies

These are some of the tecnologies used in this project:

- `commitlint`: A tool that checks your commits and ensures consistency in version control.
- `eslint`: A linting tool for JavaScript/TypeScript code.
- `husky`: A tool for adding Git hooks to automate tasks like linting, testing, or commits in JavaScript/Node.js projects.
- `lint-staged`: Runs linters on Git staged files.
- `prettier`: A code formatter.
- `react`: A JavaScript library for building user interfaces or UI components.
- `socket.io-client`: A client-side library for Socket.io, enabling real-time communication with a Socket.io server.
- `styled-components`: A library for React and React Native that allows you to use component-level styles in your application.
- `tsx`: A command-line tool and Node.js enhancement that allows you to execute TypeScript files directly without needing to explicitly compile them to JavaScript first.
- `typescript`: A superset of JavaScript that introduces optional static typing, interfaces, enums, and other language features.

_For more information about other dependencies, see the `package.json` file._

## Installation

1. Clone the repository:

```bash
git clone https://github.com/thiagocrux/waiterapp-web.git
```

2. Browse to the project folder:

```bash
cd waiterapp-web
```

3. Install dependencies:

```
pnpm install
```

## Available scripts

This section describes the available scripts in the `package.json` file and their functionalities.

### Development

- #### `dev`

  Starts the server in development mode, enabling faster builds and live-reloading.

  ```bash
  pnpm dev
  ```

### Production

- #### `build`

  Compiles the application for production.

  ```bash
  pnpm build
  ```

- #### `start`

  Start the server for production from the compiled files.

  ```bash
  pnpm start
  ```

## Screenshots

![image](https://i.ibb.co/YFpghnzT/waiterapp-screen-1.png)
![image](https://i.ibb.co/jk9dNJ2Z/waiterapp-screen-2.png)

## Related links

- [JStack](https://app.jstack.com.br/)

## License

[MIT](https://choosealicense.com/licenses/mit/)

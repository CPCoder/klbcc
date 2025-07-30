# KLBCC

A scalable real-time backend for multiplayer or collaborative applications. Built on WebSockets, actor-based room models, and Redis.

## Features

- Actor-based room processing
- WebSocket (Socket.IO) communication
- Delta sync engine
- Redis cache & task queues

## Usage

### System Requirements

- Node `>= 24.1.0`
- NPM `>= 11.3.0`

### Start the backend

```bash
npm install
npm run dev
```

### Test client connection + messages

1. Open the file `Test-Client/index.html` in a web  browser
2. [OPTIONAL] Open the same file in a different tab or browser
3. Type message and click the button "Send"

> **Note:** The client will connect automatically to the backend and will be assigned to 1 of 3 pre-defined Game rooms.

### Run Jest Tests

```bash
npm run test
```

Example output:

```bash
> real-time-app@1.0.0 test
> jest

 PASS  test/syncEngine.test.ts
 PASS  test/gameRoomActor.test.ts
 PASS  test/crdt.test.ts
 PASS  test/sessionManager.test.ts

Test Suites: 4 passed, 4 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        3.778 s
Ran all test suites.
```

> **Note:** To hide log console outputs between the test outputs, set in `DEBUG=false` in `.env`
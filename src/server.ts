/*
 * Project:     KLBCC
 * File:        server.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { createServer } from 'http';
import { initWebSocketServer } from './gateway/socketServer';
import { initMetrics } from './services/metrics';
import { log } from './utils/logger';

const server = createServer();
initWebSocketServer(server);
initMetrics();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    log(`Server listening on port ${PORT}`);
});

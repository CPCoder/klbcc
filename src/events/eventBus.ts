/*
 * Project:     KLBCC
 * File:        eventBus.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { createClient } from 'redis';

const publisher = createClient();
const subscriber = createClient();

publisher.connect();
subscriber.connect();

export { publisher, subscriber };

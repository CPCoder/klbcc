/*
 * Project:     KLBCC
 * File:        index.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

export const config = {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    port: process.env.PORT || 3000,
    debug: process.env.DEBUG === 'true' || false,
};

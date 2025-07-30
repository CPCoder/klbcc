/*
 * Project:     KLBCC
 * File:        processor.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { Worker, Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();
const queue = new Queue('tasks', { connection });

const worker = new Worker('tasks', async job => {
    console.log(`Processing job ${job.id} on worker "tasks"`);
}, { connection });

export { queue };

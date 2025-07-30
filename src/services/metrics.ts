/*
 * Project:     KLBCC
 * File:        metrics.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import promClient from 'prom-client';

export function initMetrics()
{
    promClient.collectDefaultMetrics();
}

/*
 * Project:     KLBCC
 * File:        logger.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import {config} from '../config';

export function log(message: string, ...optionalParams: any[])
{
    if (config.debug) {
        console.log(`[LOG] ${message}`, ...optionalParams);
    }
}

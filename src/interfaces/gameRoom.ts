/*
 * Project:     KLBCC
 * File:        gameRoom.ts
 * Date:        2025-07-30
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { EventEmitter } from 'events';
import { Socket } from 'socket.io';

export interface GameRoom
{
    emitter: EventEmitter;
    sockets: Set<Socket>;
}
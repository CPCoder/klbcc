/*
 * Project:     KLBCC
 * File:        sessionManager.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { Socket, DefaultEventsMap } from 'socket.io';
import { assignRandomGameRoom } from './matchMaking';
import { log } from '../utils/logger';

/**
 * Session handler
 *
 * This method handle the authorization and assigns the client to a random Game room.
 *
 * @param socket - The client socket
 */
export function handleSession(socket: Socket<DefaultEventsMap, DefaultEventsMap, any>)
{
    log('New connection. Handshake auth payload:', {authPayload: socket.handshake.auth, payload: socket.data});
    const clientId = socket.handshake.auth?.clientId;
    if (!clientId) {
        socket.disconnect();
        return;
    }

    socket.data.clientId = clientId;
    socket.data.roomId = assignRandomGameRoom();

    log(`Client ${clientId} assigned to Game room "${socket.data.roomId}". Payload:`, socket.data);
}

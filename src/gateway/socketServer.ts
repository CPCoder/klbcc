/*
 * Project:     KLBCC
 * File:        SocketServer.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { Server } from 'socket.io';
import http from 'http';
import { handleSession } from '../services/sessionManager';
import { joinRoom, handleMessage } from '../actors/gameRoomActor';
import { jsonObj } from '../interfaces/jsonObj'

/**
 * Initialize the WebSocketServer
 *
 * @param server
 */
export function initWebSocketServer(server: http.Server)
{
    const io = new Server(server, {
        cors: { origin: '*' }
    });

    io.on('connection', (socket) => {
        handleSession(socket);
        joinRoom(socket);

        socket.on('message', (payload: jsonObj) => {
            handleMessage(socket, payload);
        });
    });
}

/*
 * Project:     KLBCC
 * File:        gameRoomActor.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { Socket } from 'socket.io';
import { EventEmitter } from 'events';
import { GameRoom } from '../interfaces/gameRoom';
import { jsonObj } from '../interfaces/jsonObj';
import { log } from '../utils/logger';

const gameRooms: Map<string, GameRoom> = new Map();

/**
 * Get the current Game room assigned to the client.
 * If the room does not exist yet, it will be created.
 *
 * @param socket - The client socket
 * @return GameRoom
 */
function getGameRoom(socket: Socket): GameRoom
{
    const roomId = socket.data.roomId;

    if (!gameRooms.has(roomId)) {
        // Create room if not existing yet.
        const emitter = new EventEmitter();
        const sockets = new Set<Socket>();

        gameRooms.set(roomId, { emitter, sockets });
    }

    const gameRoom = gameRooms.get(roomId)!;

    if (!gameRoom.sockets.has(socket)) {
        // Add client to room if not existing yet
        gameRoom.sockets.add(socket);

        socket.on('disconnect', () => {
            // Disconnect client and remove room if no one left inside
            gameRoom.sockets.delete(socket);
            if (gameRoom.sockets.size === 0) {
                gameRooms.delete(roomId);
            }
        });
    }

    return gameRoom;
}

/**
 * Join a Game room
 *
 * @param socket - The client socket
 */
export function joinRoom(socket: Socket)
{
    if (!socket.data.clientId || !socket.data.roomId) {
        return;
    }

    const gameRoom = getGameRoom(socket);
    const roomId = socket.data.roomId;

    // Broadcast message to all users in the same room
    roomBroadcast(socket, gameRoom, {
        from: 'system',
        content: `${socket.data.clientId} has joined the Game room`,
        roomId,
    });
}

/**
 * Handle incoming messages
 *
 * @param socket - The client socket
 * @param payload - The payload
 */
export function handleMessage(socket: Socket, payload: jsonObj)
{
    if (!payload || (!payload.content && !payload.crdtChange)) {
        return;
    }

    const gameRoom = getGameRoom(socket);
    const roomId = socket.data.roomId;

    log('Incoming message', [socket.data, payload]);

    roomBroadcast(socket, gameRoom, {
        from: socket.data.clientId,
        content: payload.content,
        roomId
    });
}

/**
 * Broadcast a message to a specific Game room
 *
 * @param socket - The client socket
 * @param gameRoom - The Game room
 * @param payload - The payload
 */
export function roomBroadcast(socket: Socket, gameRoom: GameRoom, payload: jsonObj)
{
    gameRoom.emitter.emit('message', socket, payload);

    log(`Broadcasting message into Game room "${socket.data.roomId}.`, payload);

    for (const s of gameRoom.sockets) {
        s.emit('message', payload);
    }
}

/**
 * Broadcast a message into all existing Game rooms
 *
 * @param payload - The payload
 */
export function globalBroadcast(payload: jsonObj)
{
    // Here comes the logic for possible global broadcasts in all existing Game rooms
}

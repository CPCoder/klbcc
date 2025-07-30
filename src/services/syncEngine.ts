/*
 * Project:     KLBCC
 * File:        syncEngine.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import * as Automerge from '@automerge/automerge';
import { GameRoomCRDT } from '../interfaces/gameRoomCRDT';
import { MessageDoc } from '../types/MessageDoc'

const roomDocs: Map<string, GameRoomCRDT> = new Map();

/**
 * Initializes or returns an existing CRDT document for the room
 *
 * @param roomId - The ID of the Game room
 * @return The room object
 */
function getOrInitRoom(roomId: string): GameRoomCRDT
{
    if (!roomDocs.has(roomId)) {
        const doc: Automerge.Doc<MessageDoc> = Automerge.from({ messages: [] });
        const changes: Uint8Array[] = Automerge.getAllChanges(doc);

        roomDocs.set(roomId, { doc, changes });
    }

    return roomDocs.get(roomId)!;
}

export function getOrInitRoomFoTest(roomId: string) {
    return getOrInitRoom(roomId)
}

/**
 * Applies a CRDT change to the room document and returns the updated state
 *
 * @param roomId - The ID of the Game room
 * @param change - The changes for the room
 */
export function handleSync(roomId: string, change: Uint8Array): any
{
    const gameRoom = getOrInitRoom(roomId);
    const [newDoc] = Automerge.applyChanges(gameRoom.doc, [change]);

    gameRoom.doc = newDoc;
    gameRoom.changes = Automerge.getAllChanges(newDoc);

    return Automerge.toJS(newDoc);
}

/**
 * Returns all CRDT changes. This is used to resync a newly joined client
 *
 * @param roomId - The ID of the Game room
 * @return The current state of the Game room
 */
export function getRoomState(roomId: string): Uint8Array[]
{
    return getOrInitRoom(roomId).changes;
}
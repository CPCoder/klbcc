/*
 * Project:     KLBCC
 * File:        crdt.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import * as Automerge from '@automerge/automerge';
import { GameRoomCRDT } from '../interfaces/gameRoomCRDT';

type MessageDoc = { messages: string[] };

const gameRoomDocs: Map<string, GameRoomCRDT> = new Map();

export function getOrInitCRDT(roomId: string): GameRoomCRDT {
    if (!gameRoomDocs.has(roomId)) {
        const doc: Automerge.Doc<MessageDoc> = Automerge.from({ messages: [] });
        const changes = Automerge.getAllChanges(doc);

        gameRoomDocs.set(roomId, { doc, changes });
    }

    return gameRoomDocs.get(roomId)!;
}

export function applyCRDTChange(roomId: string, change: Uint8Array): MessageDoc {
    const gameRoom = getOrInitCRDT(roomId);
    const [newDoc] = Automerge.applyChanges(gameRoom.doc, [change]);

    gameRoom.doc = newDoc;
    gameRoom.changes = Automerge.getAllChanges(newDoc);

    return Automerge.toJS(newDoc);
}

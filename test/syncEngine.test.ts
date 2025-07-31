/*
 * Project:     KLBCC
 * File:        syncEngine.test.ts
 * Date:        2025-07-30
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { handleSync, getRoomState, getOrInitRoomForTest } from '../src/services/syncEngine';
import * as Automerge from '@automerge/automerge';

describe('CRDT Sync Engine', () => {
    test('handles a CRDT change and returns new state', () => {
        const roomId = 'room-sync-test';
        const { doc: baseDoc } = getOrInitRoomForTest(roomId);
        const editableDoc = Automerge.clone(baseDoc);

        const changedDoc = Automerge.change(editableDoc, d => {
            d.messages.push('hello');
        });

        const changes = Automerge.getChanges(baseDoc, changedDoc);
        const updated = handleSync(roomId, changes[0]);
        expect(updated.messages).toContain('hello');

        const state = getRoomState(roomId);
        expect(state.length).toBeGreaterThan(0);
    });
});
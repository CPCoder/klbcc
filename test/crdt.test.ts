/*
 * Project:     KLBCC
 * File:        crdt.test.ts
 * Date:        2025-07-30
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { getOrInitCRDT, applyCRDTChange } from '../src/state/crdt';
import * as Automerge from '@automerge/automerge';

describe('CRDT Logic', () => {
    test('applies changes to room document', () => {
        const roomId = 'room-test-crdt';
        const { doc: baseDoc } = getOrInitCRDT(roomId);
        const editableDoc = Automerge.clone(baseDoc);

        const changedDoc = Automerge.change(editableDoc, d => {
            d.messages.push('hi');
        });

        const changes = Automerge.getChanges(baseDoc, changedDoc);
        const result = applyCRDTChange(roomId, changes[0]);
        expect(result.messages).toContain('hi');
    });
});

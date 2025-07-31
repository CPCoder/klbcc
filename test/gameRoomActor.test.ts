/*
 * Project:     KLBCC
 * File:        gameRoomActor.test.ts
 * Date:        2025-07-30
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { handleMessage } from '../src/actors/gameRoomActor';

describe('Game Room Actor', () => {
    test('processes classic text message broadcast', () => {
        const emitMock = jest.fn();
        const socket: any = {
            data: { clientId: 'client-1' },
            on: jest.fn(),
            emit: emitMock,
        };

        const payload = { content: 'Hello' };
        handleMessage(socket, payload);

        expect(emitMock).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                content: 'Hello',
                from: 'client-1'
            })
        );
    });

    test('ignores payloads without content or crdtChange', () => {
        const emitMock = jest.fn();
        const socket: any = {
            data: { clientId: 'client-2', roomId: 'room-2' },
            on: jest.fn(),
            emit: emitMock,
        };

        const payload = {}; // No content or crdtChange
        handleMessage(socket, payload);

        // Make sure no message was sent
        expect(emitMock).not.toHaveBeenCalledWith('message', expect.anything());
        expect(emitMock).not.toHaveBeenCalledWith('sync', expect.anything());
    });
});
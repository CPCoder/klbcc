/*
 * Project:     KLBCC
 * File:        sessionManager.test.ts
 * Date:        2025-07-30
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import { handleSession } from '../src/services/sessionManager';

type SocketWithData = {
    handshake: { auth: { clientId?: string } };
    disconnect: () => void;
    data: { clientId?: string; roomId?: string };
};

describe('Session Manager', () => {
    test('disconnects socket if userId is missing', () => {
        const mockSocket: SocketWithData = {
            handshake: { auth: {} },
            disconnect: jest.fn(),
            data: {},
        };
        handleSession(mockSocket as any);
        expect(mockSocket.disconnect).toHaveBeenCalled();
    });

    test('attaches userId and random roomId if present', () => {
        const mockSocket: SocketWithData = {
            handshake: { auth: { clientId: 'client-1' } },
            disconnect: jest.fn(),
            data: {} as { clientId?: string; roomId?: string },
        };

        handleSession(mockSocket as any);
        expect(mockSocket.data.clientId).toBe('client-1');
        expect(mockSocket.data.roomId).toMatch(/room-[1-3]/);
    });
});
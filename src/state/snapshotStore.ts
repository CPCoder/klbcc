/*
 * Project:     KLBCC
 * File:        snapshotStore.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

const snapshots: Record<string, any> = {};

export function saveSnapshot(roomId: string, state: any)
{
    snapshots[roomId] = state;
}

export function loadSnapshot(roomId: string)
{
    return snapshots[roomId] || null;
}

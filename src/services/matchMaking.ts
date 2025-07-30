/*
 * Project:     KLBCC
 * File:        matchMaking.ts
 * Date:        2025-07-29
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

const predefinedGameRooms = ['room-1', 'room-2', 'room-3'];

export function assignRandomGameRoom(): string
{
    return predefinedGameRooms[Math.floor(Math.random() * predefinedGameRooms.length)];
}

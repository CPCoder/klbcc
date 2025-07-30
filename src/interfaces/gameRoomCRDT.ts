/*
 * Project:     KLBCC
 * File:        gameRoomCRDT.ts
 * Date:        2025-07-30
 * Author:      Steffen Haase <shworx.development@gmail.com
 * Copyright:   2025 SHWorX (Steffen Haase)
 */

import * as Automerge from '@automerge/automerge';
import { MessageDoc } from '../types/MessageDoc';

export interface GameRoomCRDT
{
    doc: Automerge.Doc<MessageDoc>;
    changes: Uint8Array[];
}


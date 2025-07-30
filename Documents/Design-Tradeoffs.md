
# Design Trade-offs in the Real-Time CRDT Backend

This document outlines the key architectural and implementation trade-offs made in the CRDT-based real-time backend system built with Node.js, TypeScript, Socket.IO, and Automerge.

---

## 1. CRDTs (Automerge) vs Centralized State

### Pros

- **Conflict-free merging**: CRDTs automatically resolve conflicts from concurrent edits.
- **Decentralized compatibility**: Enables peer-to-peer or offline-first extensions later.
- **Low coordination overhead**: No need for locks or consensus.

### Trade-offs

- **Performance and memory cost**: Automerge documents can grow large over time due to append-only change tracking.
- **Binary complexity**: Clients must handle binary CRDT diffs (e.g., base64-encoded for transmission).
- **Limited fine-grained control**: Centralized state allows more intentional control over update behavior.

---

## 2. WebSockets (Socket.IO) vs REST or Polling

### Pros

- **Low latency**: Real-time bidirectional communication.
- **Efficient sync**: Only send diffs instead of entire state payloads.
- **Simpler architecture**: Compared to hybrid polling solutions.

### Trade-offs

- **Persistent connections**: Requires handling heartbeats, reconnects, and timeouts.
- **Scalability**: Needs sticky sessions or state replication for multi-node support.
- **Debugging**: Harder to trace state and logic compared to stateless HTTP.

---

## 3. Actor-like Room Management vs Global Dispatcher

### Pros

- **Isolation**: Room-specific logic stays scoped, reducing global coupling.
- **Concurrency-safe**: No shared mutable state across rooms.
- **Sharding-ready**: Each room can be assigned to separate processes or nodes.

### Trade-offs

- **Volatile state**: All room state is lost on server restart without external persistence.
- **Custom orchestration**: Scaling requires explicit actor or task coordination strategies.

---

## 4. Simplified Data Model (`messages[]`) vs Richer Schemas

### Pros

- **Clarity**: Easy to implement, test, and understand.
- **CRDT-safe**: Automerge works well with append-only arrays.
- **Prototyping speed**: Good for proving synchronization logic.

### Trade-offs

- **Limited real-world utility**: Most applications need structured data (e.g., cursor position, text formatting, user state).
- **No extensibility**: Can’t handle per-user metadata or nested structures.

---

## 5. In-memory State vs Persistent Store

### Pros

- **Speed**: No I/O latency or DB transactions.
- **Simplicity**: No schema migrations or storage setup required.

### Trade-offs

- **Non-durable**: State is lost on restart or crash.
- **No audit/history**: Impossible to replay or roll back state.
- **No multi-node sharing**: In-memory stores don’t sync across processes or machines.

---

## 6. One CRDT Per Room vs Shared Global Document

### Pros

- **Parallelization**: Room CRDTs sync independently.
- **Scoped conflicts**: Fewer issues from shared-state collisions.

### Trade-offs

- **No global coordination**: Features like user presence, matchmaking, or global chat would require a separate CRDT or datastore.
- **Harder to cross-sync**: Requires additional logic for state that spans rooms.

---

## Final Thoughts

For production readiness, the system would benefit from:
- Persistent CRDT storage (e.g., Redis, Postgres, or CRDT-aware DB)
- State pruning or snapshotting
- Multi-instance CRDT syncing or replication

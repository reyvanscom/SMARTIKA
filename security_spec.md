# Firestore Security Specification (Phase 0 TDD)

## 1. Data Invariants
1. **Default Deny Catch-All**: Any path not explicitly matched under `/topicOverrides/{topicId}`, `/appConfigs/{configId}`, or `/studentRecords/{recordId}` is unconditionally denied (`allow read, write: if false;`).
2. **Verified Authentication & Ownership**: Every write (`create`, `update`, `delete`) requires an authenticated user with `request.auth.token.email_verified == true`.
3. **Path Variable Hardening**: Document IDs `{topicId}`, `{configId}`, and `{recordId}` must match `^[a-zA-Z0-9_\-]+$` with length `1..128` and must equal the document's `topicId` / `configId` / `recordId` field.
4. **Strict Key & Schema Enforcement (`hasAll` + `hasOnly`)**:
   - `TopicOverride` requires and allows only `['topicId', 'title', 'customVideoUrl', 'customVideoTitle', 'customMateriImageUrl', 'customInfographicUrl', 'authorId', 'createdAt', 'updatedAt']`.
   - `AppSecurityConfig` requires and allows only `['configId', 'pinHash', 'teacherName', 'teacherNIP', 'teacherRole', 'schoolName', 'schoolAddress', 'authorId', 'createdAt', 'updatedAt']`.
   - `StudentScoreRecord` requires and allows only `['recordId', 'studentName', 'className', 'studentNumber', 'topicId', 'topicTitle', 'activityType', 'activityName', 'score', 'authorId', 'createdAt', 'updatedAt']`.
5. **Immutable & Temporal Fields**:
   - On `create`: `authorId == request.auth.uid`, `createdAt == request.time`, and `updatedAt == request.time`.
   - On `update`: `authorId == existing().authorId`, `createdAt == existing().createdAt`, and `updatedAt == request.time`.
6. **Query Enforcer (No Blanket Reads)**: `allow list` is restricted to documents where `resource.data.authorId == request.auth.uid` or `isBootstrappedAdmin()`.

## 2. The "Dirty Dozen" Payloads
1. **Shadow Field Injection (`TopicOverride`)**: Adding `isVerified: true` to `/topicOverrides/k7-bk` on `create`.
2. **Unverified Email Spoof**: Attempting `create` on `/topicOverrides/k7-bk` with `email: "Reyvanscom@gmail.com"` but `email_verified: false`.
3. **Identity Spoofing on Create**: Setting `authorId: "other_user_uid"` when `request.auth.uid == "attacker_uid"`.
4. **Immutable Field Mutation (`authorId`)**: Updating `authorId` on `/topicOverrides/k7-bk` during `update`.
5. **Immutable Field Mutation (`createdAt`)**: Modifying `createdAt` during `update`.
6. **Client Timestamp Forgery**: Supplying a past/future timestamp instead of `request.time` for `updatedAt`.
7. **ID Poisoning Attack**: Creating a document with an invalid ID or where path `{topicId}` does not match `data.topicId`.
8. **Oversized String Resource Exhaustion ("Denial of Wallet")**: Sending a 5,000-character string in `title` (exceeds `maxLength: 300`).
9. **Type Confusion / Value Poisoning**: Updating `customVideoUrl` with a boolean `true` instead of a bounded string.
10. **PinHash Format Bypass (`AppSecurityConfig`)**: Writing `pinHash: "<script>"` that violates `^[a-zA-Z0-9_\-]+$`.
11. **Out-of-Bounds Score Injection (`StudentScoreRecord`)**: Writing `score: 9999999` (exceeds `100000`) or invalid `activityType` on `/studentRecords/rec_1`.
12. **Unscoped Blanket List Query**: Attempting a `list` query on `/studentRecords` without authentication or ownership.

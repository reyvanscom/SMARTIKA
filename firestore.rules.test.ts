/**
 * Firestore Security Rules Test Suite (Dirty Dozen Verification)
 * Validates that all 12 adversarial payloads in security_spec.md are rejected with PERMISSION_DENIED.
 */

export interface SimulatedAuth {
  uid: string;
  email: string;
  email_verified: boolean;
}

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  operation: 'create' | 'update' | 'list';
  path: string;
  auth: SimulatedAuth | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Shadow Field Injection on TopicOverride',
    operation: 'create',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      topicId: 'k7-bk',
      title: 'Berpikir Komputasional',
      customVideoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      customVideoTitle: 'Video Materi',
      customMateriImageUrl: '',
      customInfographicUrl: '',
      authorId: 'teacher_1',
      createdAt: 'SERVER_TIME',
      updatedAt: 'SERVER_TIME',
      isVerified: true
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Unverified Email Spoof Attack',
    operation: 'create',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'spoof_1', email: 'Reyvanscom@gmail.com', email_verified: false },
    payload: {
      topicId: 'k7-bk',
      title: 'Berpikir Komputasional',
      customVideoUrl: '',
      customVideoTitle: '',
      customMateriImageUrl: '',
      customInfographicUrl: '',
      authorId: 'spoof_1',
      createdAt: 'SERVER_TIME',
      updatedAt: 'SERVER_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'Identity Spoofing on Create (authorId mismatch)',
    operation: 'create',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'attacker_uid', email: 'attacker@example.com', email_verified: true },
    payload: {
      topicId: 'k7-bk',
      title: 'Berpikir Komputasional',
      customVideoUrl: '',
      customVideoTitle: '',
      customMateriImageUrl: '',
      customInfographicUrl: '',
      authorId: 'other_user_uid',
      createdAt: 'SERVER_TIME',
      updatedAt: 'SERVER_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'Immutable Field Mutation (authorId on update)',
    operation: 'update',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      authorId: 'hijacked_uid'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'Immutable Field Mutation (createdAt on update)',
    operation: 'update',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      createdAt: '2020-01-01T00:00:00Z'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'Client Timestamp Forgery (updatedAt != request.time)',
    operation: 'update',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      title: 'Updated Title',
      updatedAt: '2099-01-01T00:00:00Z'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'ID Poisoning Attack (path topicId != data.topicId)',
    operation: 'create',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      topicId: 'different-id',
      title: 'Berpikir Komputasional',
      customVideoUrl: '',
      customVideoTitle: '',
      customMateriImageUrl: '',
      customInfographicUrl: '',
      authorId: 'teacher_1',
      createdAt: 'SERVER_TIME',
      updatedAt: 'SERVER_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Oversized String Resource Exhaustion (title > 300 chars)',
    operation: 'create',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      topicId: 'k7-bk',
      title: 'A'.repeat(500),
      customVideoUrl: '',
      customVideoTitle: '',
      customMateriImageUrl: '',
      customInfographicUrl: '',
      authorId: 'teacher_1',
      createdAt: 'SERVER_TIME',
      updatedAt: 'SERVER_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'Value Poisoning on Update (customVideoUrl as boolean)',
    operation: 'update',
    path: '/topicOverrides/k7-bk',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      customVideoUrl: true,
      updatedAt: 'SERVER_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'PinHash Pattern Bypass on AppSecurityConfig',
    operation: 'create',
    path: '/appConfigs/global',
    auth: { uid: 'teacher_1', email: 'Reyvanscom@gmail.com', email_verified: true },
    payload: {
      configId: 'global',
      pinHash: '<script>evil()</script>',
      teacherName: 'Guru',
      teacherNIP: '-',
      teacherRole: 'Guru Informatika',
      schoolName: 'SMP Negeri 5 Kroya',
      schoolAddress: 'Cilacap',
      authorId: 'teacher_1',
      createdAt: 'SERVER_TIME',
      updatedAt: 'SERVER_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'Unauthorized Update by Non-Owner / Non-Admin',
    operation: 'update',
    path: '/appConfigs/global',
    auth: { uid: 'random_student', email: 'student@example.com', email_verified: true },
    payload: {
      pinHash: 'sec_12345678',
      updatedAt: 'SERVER_TIME'
    },
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Unauthenticated List Query on topicOverrides',
    operation: 'list',
    path: '/topicOverrides',
    auth: null,
    expectedResult: 'PERMISSION_DENIED'
  }
];

# Design Spec: Trainer-Client Integration & Dashboard
**Date:** 2026-08-25
**Status:** Approved
**Path:** docs/superpowers/specs/2026-08-25-trainer-client-integration-design.md

## 1. Overview
This feature implements the "active control" model where Trainers manage their clients via unique, secure profile codes. It enables the core loop of the app: Client performs workout $\rightarrow$ Trainer analyzes $\rightarrow$ Trainer provides feedback.

## 2. Core Mechanics

### 2.1. Secure Profile Codes
- **Owner**: Clients.
- **Format**: `APEX-XXXX-XXXX` (8 alphanumeric characters, split by hyphen).
- **Generation**: 
    - Occurs during the final step of client onboarding.
    - Uses a cryptographically secure random generator.
    - Excludes visually similar characters (0/O, 1/I).
- **Storage**: Stored in `profiles.profile_code` (Unique).

### 2.2. The Connection Handshake (Trainer-Driven)
- **Trigger**: Trainer clicks "ADD CLIENT" on their dashboard.
- **Input**: Trainer enters the Client's `profile_code`.
- **Validation**:
    - Format check (`APEX-` prefix).
    - Query: `SELECT id FROM profiles WHERE profile_code = :code AND role = 'client'`.
- **Action**: `UPDATE profiles SET trainer_id = :trainer_id WHERE id = :client_id`.

## 3. UI/UX Architecture

### 3.1. Client-Side (Onboarding & Profile)
- **Onboarding**: `app/(auth)/client-details/index.tsx` generates and saves the code on finalize.
- **Profile**: `app/(tabs)/profile/index.tsx` displays the generated code prominently for the client to share.

### 3.2. Trainer-Side (Management)
- **Home Dashboard (`app/(tabs)/home/index.tsx`)**:
    - **Add Client Modal**: Text input for the profile code + validation logic.
    - **Client List**: `FlatList` of profiles where `trainer_id == auth.uid()`.
    - **Client Card**: Displays name, last workout date, and a navigation link to details.

- **Client Detail View (`app/(tabs)/coach/client/[id].tsx`)**:
    - **Context**: Header with client stats (weight, height, etc.).
    - **Workout History**: List of completed workouts.
    - **Workout Deep-Dive**: Expandable view of exercises $\rightarrow$ sets $\rightarrow$ weights.
    - **Feedback Loop**: A text input field under each workout to insert a record into `workout_comments`.

## 4. Data Flow & Constraints
- **Auth**: All operations require an active Supabase session.
- **Security**: RLS (Row Level Security) ensures trainers can only view clients they are linked to.
- **Consistency**: Onboarding MUST complete before a code is generated.

## 5. Success Criteria
- A client can successfully generate a code during setup.
- A trainer can enter that code and see the client appear in their list.
- A trainer can view a specific workout of a client and save a comment.
- All logic is persisted in Supabase and pushed to GitHub.

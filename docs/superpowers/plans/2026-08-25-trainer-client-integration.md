# Trainer-Client Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a secure, trainer-driven connection system where trainers add clients using a randomly generated `profile_code`.

**Architecture:** 
- **Code Generation**: Cryptographically secure random codes generated during client onboarding.
- **Connection**: Trainer-initiated `UPDATE` on the `profiles` table.
- **Management**: Role-based routing to a Client List and a Client Detail view with a feedback loop.

**Tech Stack:** Expo (React Native), Supabase (Auth & Database), TypeScript.

**Spec:** `docs/superpowers/specs/2026-08-25-trainer-client-integration-design.md`

## Global Constraints
- **Code Format**: `APEX-XXXX-XXXX` (Uppercase alphanumeric, no ambiguous characters).
- **Security**: All DB writes must be scoped to the authenticated user.
- **Platform**: Android (Expo) with responsive gym-style UI.
- **Git**: Atomic commits for each task, pushed immediately to `main`.

---

### Task 1: Secure Code Generation & Onboarding
**Files:**
- Modify: `app/(auth)/client-details/index.tsx`
- Modify: `app/(tabs)/profile/index.tsx`

**Interfaces:**
- Produces: `profiles.profile_code` (String) in Supabase.

- [ ] **Step 1: Implement `generateProfileCode` utility**
  Create a helper function that generates an 8-character random string from `[A-Z0-9]` excluding `O, 0, I, 1`.
  Format: `APEX-` + 4 chars + `-` + 4 chars.

- [ ] **Step 2: Integrate generation into Client Details**
  Update `handleSaveDetails` in `app/(auth)/client-details/index.tsx` to call `generateProfileCode` and include it in the `.update()` call to Supabase.

- [ ] **Step 3: Display code in Profile**
  Update `app/(tabs)/profile/index.tsx` to fetch the `profile_code` from the DB and display it to the client as "Váš unikátny kód".

- [ ] **Step 4: Commit & Push**
  `git add . && git commit -m "feat: implement secure profile code generation during onboarding"`

---

### Task 2: Trainer's Client Acquisition Logic
**Files:**
- Modify: `app/(tabs)/home/index.tsx`

**Interfaces:**
- Consumes: `profile_code` from `profiles` table.
- Produces: Updated `trainer_id` in `profiles` table for the target client.

- [ ] **Step 1: Implement "Add Client" Modal UI**
  Add a state-controlled modal to the Trainer's Home view with a TextInput for the code.

- [ ] **Step 2: Implement Connection Logic**
  Write the `handleConnectClient` function:
  1. Validate `APEX-` prefix.
  2. Query `profiles` for the code.
  3. Update `trainer_id` of the found client to current user's ID.

- [ ] **Step 3: Add Error Handling**
  Handle "Invalid code", "User not found", and "Already has a trainer" scenarios with `Alert`.

- [ ] **Step 4: Commit & Push**
  `git add . && git commit -m "feat: implement trainer-driven client connection logic"`

---

### Task 3: Trainer Dashboard & Client Detail View
**Files:**
- Modify: `app/(tabs)/home/index.tsx`
- Create: `app/(tabs)/coach/client/[id].tsx`

**Interfaces:**
- Consumes: `profiles` where `trainer_id == auth.uid()`.
- Produces: `workout_comments` records.

- [ ] **Step 1: Implement Client List (Home)**
  Replace the mock trainer view in `app/(tabs)/home/index.tsx` with a `FlatList` fetching all clients linked to the trainer.

- [ ] **Step 2: Build Client Detail Layout**
  Create `app/(tabs)/coach/client/[id].tsx` with a header showing client stats.

- [ ] **Step 3: Implement Workout History & Feedback**
  - Fetch `workouts` for the specific client.
  - Create expandable cards for each workout showing `workout_sets`.
  - Add a TextInput and "Send" button to insert comments into `workout_comments`.

- [ ] **Step 4: Commit & Push**
  `git add . && git commit -m "feat: implement trainer dashboard and client workout analysis view"`

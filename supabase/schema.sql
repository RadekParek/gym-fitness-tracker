---
-- Enable UUID extension
create extension if not exists 'uuid-ossp';

-- 1. PROFILES
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  avatar_url text,
  updated_at timestamp with time zone default now()
);

-- 2. EXERCISES
create table exercises (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  muscle_group text not null,
  is_custom boolean default false,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

-- 3. WORKOUTS
create table workouts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  total_volume float default 0,
  created_at timestamp with time zone default now()
);

-- 4. WORKOUT_SETS
create table workout_sets (
  id uuid default uuid_generate_v4() primary key,
  workout_id uuid references workouts(id) on delete cascade not null,
  exercise_id uuid references exercises(id) on delete cascade not null,
  set_number integer not null,
  weight float not null,
  reps integer not null,
  is_completed boolean default false,
  created_at timestamp with time zone default now()
);

-- 5. GROUPS
create table groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  invite_code text unique not null,
  created_by uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default now()
);

-- 6. GROUP_MEMBERS
create table group_members (
  group_id uuid references groups(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  joined_at timestamp with time zone default now(),
  primary key (group_id, user_id)
);

-- 7. GROUP_POSTS
create table group_posts (
  id uuid default uuid_generate_v4() primary key,
  group_id uuid references groups(id) on delete cascade not null,
  workout_id uuid references workouts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default now()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table profiles enable row level security;
alter table exercises enable row level security;
alter table workouts enable row level security;
alter table workout_sets enable row level security;
alter table groups enable row level security;
alter table group_members enable row level security;
alter table group_posts enable row level security;

-- Profiles: Everyone can view profiles, users can only edit their own
create policy 'Public profiles are viewable by everyone' on profiles for select using ( true );
create policy 'Users can update own profile' on profiles for update using ( auth.uid() = id );

-- Exercises: Everyone can view exercises, anyone can create custom ones
create policy 'Exercises are viewable by everyone' on exercises for select using ( true );
create policy 'Users can create custom exercises' on exercises for insert with check ( auth.uid() = created_by );

-- Workouts: Users can only view and edit their own workouts
create policy 'Users can view own workouts' on workouts for select using ( auth.uid() = user_id );
create policy 'Users can insert own workouts' on workouts for insert with check ( auth.uid() = user_id );
create policy 'Users can update own workouts' on workouts for update using ( auth.uid() = user_id );

-- Workout Sets: Users can only view and edit their own sets
create policy 'Users can view own sets' on workout_sets for select using ( auth.uid() = (select user_id from workouts where id = workout_sets.workout_id) );
create policy 'Users can insert own sets' on workout_sets for insert with check ( auth.uid() = (select user_id from workouts where id = workout_sets.workout_id) );
create policy 'Users can update own sets' on workout_sets for update using ( auth.uid() = (select user_id from workouts where id = workout_sets.workout_id) );

-- Groups: Anyone with invite code can join, members can view
create policy 'Groups are viewable by members' on groups for select using (
  exists (select 1 from group_members where group_id = groups.id and user_id = auth.uid())
);
create policy 'Users can create groups' on groups for insert with check ( true );

-- Group Members: Members can view others in their group
create policy 'Members can view group list' on group_members for select using (
  exists (select 1 from group_members where group_id = group_members.group_id and user_id = auth.uid())
);
create policy 'Users can join groups' on group_members for insert with check ( true );

-- Group Posts: Members of the group can view posts
create policy 'Members can view group posts' on group_posts for select using (
  exists (select 1 from group_members where group_id = group_posts.group_id and user_id = auth.uid())
);
create policy 'Users can create group posts' on group_posts for insert with check ( auth.uid() = user_id );


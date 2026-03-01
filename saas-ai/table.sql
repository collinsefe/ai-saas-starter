create table usage (
  id uuid default uuid_generate_v4(),
  user_id text,
  created_at timestamp default now()
);
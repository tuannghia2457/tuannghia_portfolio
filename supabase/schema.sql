-- Smile to Collaborate storage. Run once in the Supabase SQL editor.
-- Visitors (anon key) may only add a photo; only the owner account can view or delete them.

create table if not exists public.smiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  image_path text not null,
  score real not null check (score between 0 and 1)
);
alter table public.smiles enable row level security;
-- Explicit grants, so this works even when new tables aren't exposed to the Data API automatically.
grant insert on public.smiles to anon, authenticated;
grant select, delete on public.smiles to authenticated;

create or replace function public.is_smile_owner() returns boolean
language sql stable as $$ select coalesce(auth.jwt() ->> 'email', '') = 'trantuannghia2457@gmail.com' $$;

create policy "visitors add smiles" on public.smiles for insert to anon, authenticated with check (true);
create policy "owner reads smiles" on public.smiles for select to authenticated using (public.is_smile_owner());
create policy "owner deletes smiles" on public.smiles for delete to authenticated using (public.is_smile_owner());

-- Private bucket: JPEG only, 300 KB per photo.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('smiles', 'smiles', false, 307200, array['image/jpeg'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "visitors upload smiles" on storage.objects for insert to anon, authenticated with check (bucket_id = 'smiles');
create policy "owner reads smile photos" on storage.objects for select to authenticated using (bucket_id = 'smiles' and public.is_smile_owner());
create policy "owner deletes smile photos" on storage.objects for delete to authenticated using (bucket_id = 'smiles' and public.is_smile_owner());

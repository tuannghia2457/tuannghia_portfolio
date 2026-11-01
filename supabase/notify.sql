-- Email notification when a smile photo is saved. Run in the Supabase SQL editor after
-- schema.sql; safe to run again. Sends one email to the owner on each new row in public.smiles,
-- using Resend (https://resend.com) called from Postgres via pg_net. The API key is kept in
-- Supabase Vault, never in this function body.

-- 0) One-time setup you do by hand (see README "Email notifications"):
--    - Create a free Resend account with trantuannghia2457@gmail.com and copy an API key (re_...).
--    - Store it once in Vault, replacing the placeholder, then delete this comment's line after running:
--        select vault.create_secret('re_your_key_here', 'resend_api_key');
--      To rotate it later: select vault.update_secret((select id from vault.secrets where name = 'resend_api_key'), 're_new_key');

create extension if not exists pg_net with schema extensions;

-- Sends the notification. SECURITY DEFINER so it can read the key from Vault; the key never
-- reaches visitors, who only ever INSERT and never call this directly.
create or replace function public.notify_smile() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  api_key text;
begin
  select decrypted_secret into api_key from vault.decrypted_secrets where name = 'resend_api_key';
  -- No key configured yet: save the row quietly rather than failing the visitor's insert.
  if api_key is null or api_key = '' then return new; end if;

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Authorization', 'Bearer ' || api_key, 'Content-Type', 'application/json'),
    body := jsonb_build_object(
      'from', 'Smile notifier <onboarding@resend.dev>',
      'to', 'trantuannghia2457@gmail.com',
      'subject', 'New smile saved on your portfolio',
      'html',
        '<p>Someone just smiled and a photo was saved.</p>' ||
        '<p><strong>Time:</strong> ' || to_char(new.created_at at time zone 'Asia/Ho_Chi_Minh', 'YYYY-MM-DD HH24:MI') || ' (Ho Chi Minh City)<br>' ||
        '<strong>Smile score:</strong> ' || round((new.score * 100)::numeric) || '%</p>' ||
        '<p>Open the private admin page to view or delete it.</p>'
    )
  );
  return new;
end $$;

drop trigger if exists on_smile_insert on public.smiles;
create trigger on_smile_insert after insert on public.smiles
  for each row execute function public.notify_smile();

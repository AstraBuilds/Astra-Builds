-- ============================================================
-- AstraBuilds — Supabase kurulum betiği
--
-- Bunu YENİ ve BOŞ bir Supabase projesinde, SQL Editor'e
-- YAPIŞTIRIP TEK SEFERDE çalıştır ("Run"). Var olan tabloların
-- üzerine yazmaz; zaten bir kez çalıştırılmak üzere tasarlandı.
-- ============================================================

-- UUID üretimi için (çoğu Supabase projesinde zaten açık gelir,
-- yine de garantiye alalım).
create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1) profiles — her kullanıcı için bir satır
-- ------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique
    check (char_length(username) between 3 and 20)
    check (username ~ '^[A-Za-z0-9_-]+$'),
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Herkes (giriş yapmış ya da yapmamış) profilleri okuyabilir —
-- kart üzerinde "Yükleyen: @kullanici" yazabilmek için gerekli.
create policy "Profiller herkese açık okunabilir"
  on public.profiles for select
  to anon, authenticated
  using (true);

-- Bir kullanıcı SADECE kendi satırını güncelleyebilir; ayrıca
-- is_verified sütununu bu yoldan DEĞİŞTİREMEZ (WITH CHECK, yeni
-- değerin eski değerle aynı olmasını zorunlu kılıyor). Böylece
-- "onaylı kullanıcı" rozetini kimse kendi kendine veremez —
-- sadece sen, Supabase panelinden elle değiştirebilirsin.
create policy "Kullanıcı yalnızca kendi profilini günceller"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and is_verified = (
      select p.is_verified from public.profiles p where p.id = auth.uid()
    )
  );

-- ------------------------------------------------------------
-- 2) Yeni kullanıcı kaydolunca profiles'a otomatik satır ekle
-- ------------------------------------------------------------
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data ->> 'username');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- 3) builds — herkese açık parça listeleri
-- ------------------------------------------------------------
create table public.builds (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  tier text not null check (char_length(tier) between 1 and 40),
  tagline text check (char_length(tagline) <= 200),
  estimated_price text check (char_length(estimated_price) <= 40),
  parts jsonb not null
    check (jsonb_typeof(parts) = 'array')
    check (jsonb_array_length(parts) between 1 and 30),
  description text not null check (char_length(description) between 1 and 4000),
  -- Sadece pcpartpicker.com linklerine izin ver (hem içerik hem
  -- güvenlik amaçlı: rastgele/zararlı bir link asla kabul edilmez).
  pcpartpicker_url text not null
    check (char_length(pcpartpicker_url) <= 300)
    check (pcpartpicker_url ~* '^https://([a-z0-9-]+\.)?pcpartpicker\.com/'),
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.builds enable row level security;

-- Herkes tüm build'leri okuyabilir (giriş şartı yok).
create policy "Build listeleri herkese açık okunabilir"
  on public.builds for select
  to anon, authenticated
  using (true);

-- Sadece giriş yapmış kullanıcı, kendi adına build ekleyebilir.
create policy "Giriş yapan kullanıcı build ekleyebilir"
  on public.builds for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Bir build'i sadece sahibi VEYA onaylı bir kullanıcı silebilir
-- (onaylı kullanıcılara basit bir moderasyon yetkisi verir).
create policy "Sahibi ya da onaylı kullanıcı build siler"
  on public.builds for delete
  to authenticated
  using (
    auth.uid() = created_by
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_verified = true
    )
  );

-- ------------------------------------------------------------
-- KURULUMDAN SONRA YAPILACAKLAR (panelden, SQL değil):
-- 1) Authentication → Sign In / Providers → Email → "Confirm email"
--    seçeneğini KAPAT (kapalıysa kayıt olunca kullanıcı otomatik
--    giriş yapmış olur).
-- 2) Siteyi aç, kendi hesabınla kayıt ol.
-- 3) Table Editor → profiles tablosunda kendi satırını bul,
--    is_verified sütununu true yap. Böylece sen "onaylı kullanıcı"
--    olursun.
-- ------------------------------------------------------------

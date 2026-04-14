create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null check (price >= 0),
  category text not null check (category in ('Mojitos','Azulitos','Especiales','Promos')),
  description text not null default '',
  image_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null,
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'new' check (status in ('new','processing','completed')),
  created_at timestamptz not null default now(),
  customer_name text,
  customer_phone text
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id int primary key,
  whatsapp_phone text not null,
  default_message text not null,
  updated_at timestamptz not null default now()
);

alter table products enable row level security;
alter table orders enable row level security;
alter table announcements enable row level security;
alter table gallery enable row level security;
alter table settings enable row level security;

create policy "public read products" on products for select using (active = true);
create policy "public read announcements" on announcements for select using (active = true);
create policy "public read gallery" on gallery for select using (true);
create policy "public insert orders" on orders for insert with check (true);

create policy "authenticated full products" on products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full orders" on orders for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full announcements" on announcements for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full gallery" on gallery for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full settings" on settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

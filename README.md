# El Perro Jangueo (PWA)

## Requisitos
- Node.js 20+
- Proyecto de Supabase
- Cuenta de Vercel

## Setup local
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Copia variables:
   ```bash
   cp .env.example .env.local
   ```
3. Completa `.env.local` con tu proyecto Supabase.
4. Ejecuta:
   ```bash
   npm run dev
   ```

## Supabase configuración
1. En SQL Editor ejecuta `supabase/schema.sql`.
2. Ejecuta `supabase/seed.sql`.
3. Crea bucket de Storage llamado `gallery` (público).
4. En Auth > Users crea usuario admin por email/password.

## Deploy en Vercel
1. Importa repo en Vercel.
2. Configura env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_PHONE`
3. Deploy con preset Next.js.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`

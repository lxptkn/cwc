# Cooking with Class

A Next.js 14 full-stack web app for discovering and booking cooking classes.

## Getting Started

Follow these steps to set up and run the project after cloning from git:

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended) or **yarn**
- **PostgreSQL** (local or cloud instance)

### 2. Clone the Repository
```sh
git clone <repo-url>
cd cooking-with-class
```

### 3. Install Dependencies
```sh
npm install
# or
yarn install
```

### 4. Configure Environment Variables
- Copy the example environment file and fill in your values:
```sh
cp .env.example .env
```
- Edit `.env` and set:
  - `DATABASE_URL` (your PostgreSQL connection string)
  - `NEXTAUTH_SECRET` (a random string for NextAuth)
  - Any other required secrets

### 5. Set Up the Database
- Run Prisma migrations to create the schema:
```sh
npx prisma migrate dev
```
- (Optional) Seed the database with sample data:
```sh
npx prisma db seed
```

### 6. Start the Development Server
```sh
npm run dev
# or
yarn dev
```
- Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Authentication
- The site uses **NextAuth.js** for authentication.
- By default, email/password sign up is enabled.
- You can configure providers in `/src/app/api/auth/[...nextauth]/route.ts`.

### 8. Useful Commands
- **Run migrations:** `npx prisma migrate dev`
- **Open Prisma Studio:** `npx prisma studio`
- **Format code:** `npm run format`
- **Lint code:** `npm run lint`

### 9. Troubleshooting
- Ensure PostgreSQL is running and accessible.
- If you change the database schema, re-run migrations.
- If you see `useSession` errors, make sure the app is wrapped in `<SessionProvider>` (already set up in `src/app/layout.tsx`).

---

For more details, see the code comments and the [Next.js documentation](https://nextjs.org/docs).

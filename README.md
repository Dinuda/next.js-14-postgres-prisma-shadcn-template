<p align="center">
  <a>
    <img src="./public/logo.png" height="96">
    <h3 align="center">Next.js Prisma PostgreSQL Auth Starter with Shadcn</h3>
  </a>
</p>

<p align="center">
This is a <a href="https://nextjs.org/">Next.js</a> starter kit that uses <a href="https://next-auth.js.org/">Next-Auth</a> for simple email + password login<br/>
<a href="https://www.prisma.io/">Prisma</a> as the ORM, and Postgres database to persist the data. This application uses <a href="https://ui.shadcn.com/">Shadcn</a> for UI components, and <a href="https://tailwindcss.com/">Tailwind CSS</a> for styling. It has integrated theming support, with support for multiple themes with a custom plugin.

<br/>

## Configure the Database

- create a `.env` file in the root of the project

```
# Create a Postgres database
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# Generate one with this command: openssl rand -base64 32
NEXTAUTH_SECRET=
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Theming with Shadcn

This starter kit uses Shadcn for UI components, and Tailwind CSS for styling. It has integrated theming support, with support for multiple themes with a custom plugin.

### Creating a Theme

To create a theme, add to `lib/shadcn-plugin.ts`:

```ts

 - add colors to `:root` object
  `
     "--brown-dark-1": "355 45% 31%",
        "--magenta-dark-1": "200 55% 37%",
        "--purple-dark-1": "261 51% 51%",
        "--dark-green-1": "145 58% 55%",


 - configure the `theme` object

    "dark-1": "hsl(var(--brown-dark-1))",
    "dark-2": "hsl(var(--magenta-dark-1))",
    "dark-3": "hsl(var(--purple-dark-1))",
    "dark-4": "hsl(var(--dark-green-1))",
```

# SalesConnect

SalesConnect is a Next.js application for managing sales leads and client information.

## Requirements

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js) or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/salesconnect.git
   cd salesconnect
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```
   apt-get install tree

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` or `yarn dev`: Runs the app in development mode.
- `npm run build` or `yarn build`: Builds the app for production.
- `npm start` or `yarn start`: Runs the built app in production mode.
- `npm run lint` or `yarn lint`: Runs the linter to check for code style issues.

## Dependencies

This project uses the following main dependencies:

- Next.js
- React
- React DOM
- Tailwind CSS
- Lucide React (for icons)
- TypeScript

For a full list of dependencies, please refer to the `package.json` file.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Folder TreeStructure
$ tree -L 2 -I 'node_modules|git|ls_volume'
.
├── components
│   ├── Login.tsx
│   └── ui
├── components.json
├── dbObjects.sql
├── instructions
│   └── instructions.md
├── lib
│   ├── supabaseAdmin.ts
│   ├── supabaseClient.ts
│   └── utils.ts
├── next.config.js
├── next-env.d.ts
├── next-seo.config.js
├── package.json
├── package-lock.json
├── pages
│   ├── api
│   ├── _app.tsx
│   ├── index.tsx
│   └── login.tsx
├── README.md
├── store
│   └── useStore.ts
├── styles
│   └── globals.css
├── tailwind.config.js
├── __tests__
│   └── LeadsList.test.tsx
└── tsconfig.json
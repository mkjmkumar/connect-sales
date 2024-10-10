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

4. npx shadcn@latest add
  - components/ui/context-menu.tsx
  - components/ui/popover.tsx
  - components/ui/resizable.tsx
  - components/ui/select.tsx
  - components/ui/slider.tsx
  - components/ui/switch.tsx
  - components/ui/tabs.tsx
  - components/ui/textarea.tsx
  - components/ui/tooltip.tsx
  - components/ui/alert.tsx
  - components/ui/alert-dialog.tsx
  - components/ui/button.tsx
  - components/ui/avatar.tsx
  - components/ui/badge.tsx
  - components/ui/calendar.tsx
  - components/ui/card.tsx
  - components/ui/chart.tsx
  - components/ui/checkbox.tsx
  - components/ui/collapsible.tsx
  - components/ui/dialog.tsx
  - components/ui/drawer.tsx
  - components/ui/dropdown-menu.tsx
  - components/ui/form.tsx
  - components/ui/label.tsx
  - components/ui/input.tsx
  - components/ui/menubar.tsx
  - components/ui/navigation-menu.tsx
  - components/ui/pagination.tsx
  - components/ui/separator.tsx
  - components/ui/table.tsx


4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Deployment

1. Build the Docker image:
   ```
   docker build -t connect-sales .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 connect-sales
   ```
   You might need to run the following command to allow the port through the firewall:

3. sudo ufw allow <port_number>/tcp

4. Access the application at [http://localhost:3000]


## Scripts

- `npm run dev` or `yarn dev`: Runs the app in development mode.
- `npm run build` or `yarn build`: Builds the app for production.
- `npm start` or `yarn start`: Runs the built app in production mode.
- `npm run lint` or `yarn lint`: Runs the linter to check for code style issues.

## Cloud Deployment
   npm install -g pm2
   pm2 start npm -- run dev
   pm2 list
   pm2 stop all
   pm2 delete npm
   pm2 kill

## Running pgAdmin 4 with Docker Compose

To run pgAdmin 4 using the provided Docker Compose file, follow these steps:
docker-compose -f compose.yml up -d


   
## Dependencies

This project uses the following main dependencies:

- Next.js
- React
- React DOM
- Tailwind CSS
- Lucide React (for icons)
- TypeScript

For a full list of dependencies, please refer to the `package.json` file.

## Git Workflow

To keep your local repository up-to-date with the remote repository:

1. Ensure you're on the correct branch (usually `main`):
   ```
   git checkout main
   ```

2. Fetch the latest changes:
   ```
   git fetch origin
   ```

3. Merge the changes from the remote branch into your local branch:
   ```
   git merge origin/main
   ```

   If there are conflicts, resolve them manually, then stage and commit the changes.

Alternatively, you can use `git pull origin main` to fetch and merge in one step.

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



## Additional Features
## If we want to use the company-info API, we need to install the following dependencies:
npm install axios cheerio

# Project overview

SalesConnect is a Next.js application designed to streamline the management of sales leads and client information. It provides a comprehensive dashboard for users to view and interact with company and lead details, including licensing information, lead status, and contact details.

You will use the following technologies:
- Next.js 14
- Tailwind CSS
- shadcn/ui
- Lucide icon
- TypeScript
- Supabase

Key features:
- Create Company
- Company List
- View Company
- Lead Management
- Deal Management
- Billing and Invoicing
- Data Visualization
- Search Functionality
- Import/Export features on all entities
- User Management

# Core functionality
# Detailed functionalities available for "Company Management" for now.

Based on the prototype of the SalesConnect application, here are the core functionalities I identified:

1. Company Management:
   - Create new company entries
   - View and manage a list of companies
   - Filter companies by various attributes (status, stage, employee size, industry, country, state)
   - Import and export company data
   - View detailed company information including ID, name, employee size, capital, revenue, stage, status, country, state, industry, and deal/lead counts

Detailed functionalities for "Company Management"
a. Create Company:
- Include fields for General Information:
  - Website link
  - Company name (EN/JP)
  - Country
  - Prefecture/State
  - Address
  - Telephone
  - Employee count
  - Industry (dropdown menu)
  - Capital (with currency selection: JPY/INR/USD)
  - Revenue Generated (default 0, uneditable)
  - Stage (Target -> Potential -> Client -> Other)
  - Status (Active/Inactive)
- Allow adding company logo
- Include sections for Branch offices and Subsidiaries
- Add Sales Information:
  - Created by (auto-filled with logged-in user's name, non-editable)
  - Managed by (with option to add multiple people)
- Include Save, Cancel, and Back buttons

b. Company List:
- Display a list of companies with customizable columns
- Include filters for Companies (All/My companies), Status, Stage, Employee Size, Industry, Country, and State
- Show "Top companies this Quarter" cards with company name, capital, revenue generated, and location
- Implement Import and Export functionality with option to download import file format
- Add a search function for companies
- Include a "+ Create" button for adding new companies
- Allow users to edit visible columns through an "Edit columns" feature
- Implement a refresh button to reset filters
- Display company details: ID, Name (EN/JP), Employee Size, Capital, Revenue Generated, Stage, Status, Country, State, Industry, Lead count, and Deal count
- Provide actions for each company: View, Edit, Delete
- Allow users to set the number of entries per page (default 25)
- Implement pagination
- Sort companies with recently added ones at the top
- Ensure no horizontal scrolling when specific columns are selected

c. View Company:
- Display company logo (or placeholder if not uploaded)
- Show general information:
  - Website (with edit button)
  - Stage
  - Status
  - Employee count
  - Industry
  - Location (State, Country)
- Display latest lead information in card format
- Show performance metrics in card format
- Display "Created by" and "Managed by" information
- Include right column with sub-pages:
  - Leads (with count and creation button)
  - Deals (with count and creation button)
  - Billing (with invoice information and creation button)
  - Activity Log

Additional notes:
- Implement multi-language support for company names
- Use appropriate formatting for capital and revenue (M, B, etc.)
- Ensure proper color coding for status (Active: green, Inactive: grey)
- Allow viewing of all company information, including associated leads and deals
- Remove the Board view filter from the Company list screen



2. Lead Management:
   - Create new lead entries
   - View and manage a list of leads
   - Filter leads by status, stage, company, country, and state
   - Import and export lead data
   - Track lead information including name, company, position, department, email, telephone, stage, status, and deal count

3. Deal Management:
   - Create new deal entries
   - View and manage a list of deals
   - Filter deals by stage and status
   - Track deal information including name, lead name, stage, deal value, probability, start date, and closing date

4. Dashboard:
   - Provides an overview of key metrics and information
   - Displays logged-in user's information
   - Shows new leads and deals of logged-in user

5. Billing and Invoicing:
   - Generate estimates and invoices
   - Manage billing dashboard

6. Data Visualization:
   - Present data in tabular format
   - Offer different view options (list, grid, etc.)

7. Search Functionality:
   - Search across companies, leads, and deals

8. Import/Export features on all entities:
    - implied by the presence of import/export features based on tempate

9. User Management (Not available in the prototype):
   - User authentication and login
   - Multi-language support (English shown in screenshots)

10. Customization:
    - Ability to set different stages for companies, leads, and deals
    - Customizable fields for different entity types

11. Sales Analytics:
   - Track revenue generated
   - Monitor deal counts and lead counts


# Technologies used

# Project structure

# Documentation


# Prompt

  You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.
  
  Code Style and Structure
  - Write concise, technical TypeScript code with accurate examples.
  - Use functional and declarative programming patterns; avoid classes.
  - Prefer iteration and modularization over code duplication.
  - Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
  - Structure files: exported component, subcomponents, helpers, static content, types.
  
  Naming Conventions
  - Use lowercase with dashes for directories (e.g., components/auth-wizard).
  - Favor named exports for components.
  
  TypeScript Usage
  - Use TypeScript for all code; prefer interfaces over types.
  - Avoid enums; use maps instead.
  - Use functional components with TypeScript interfaces.
  
  Syntax and Formatting
  - Use the "function" keyword for pure functions.
  - Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
  - Use declarative JSX.
  
  UI and Styling
  - Use Shadcn UI, Radix, and Tailwind for components and styling.
  - Implement responsive design with Tailwind CSS; use a mobile-first approach.
  
  Performance Optimization
  - Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
  - Wrap client components in Suspense with fallback.
  - Use dynamic loading for non-critical components.
  - Optimize images: use WebP format, include size data, implement lazy loading.
  
  Key Conventions
  - Use 'nuqs' for URL search parameter state management.
  - Optimize Web Vitals (LCP, CLS, FID).
  - Limit 'use client':
    - Favor server components and Next.js SSR.
    - Use only for Web API access in small components.
    - Avoid for data fetching or state management.
  
  Follow Next.js docs for Data Fetching, Rendering, and Routing.
  


# Project overview

SalesConnect is a Next.js application designed to streamline the management of sales leads, client and company information. It provides a dashboard for users to view and interact with company and lead details, including company information, lead status, and contact details.

You will use the following technologies:
Front End
  Programing Language
   Java Script 
   Type Script  
  Framework
   React JS
   Next JS
  UI Components/Style Library
   Shadcn/ui
   Tailwindcss
  Package Manager
   NPM
   NPX
Database
  Supabase

Key features/modules:
- Create Company
- Company List
- View Company
- Create Lead
- Lead list
- View Deal
- Billing and Invoicing
- Data Visualization
- Search Functionality
- Import/Export features on all entities
- User Management

# Core functionality
Based on the prototype of the SalesConnect application, here are the core functionalities I identified:
1. Company Management:
   - Create new company entries
   - View and manage a list of companies
   - Filter companies by various attributes (status, stage, employee size, industry, country, state)
   - Import and export company data
   - View detailed company information including ID, name, employee size, capital, revenue, stage, status, country, state, industry, and deal/lead counts
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

# Detailed functionalities available for "Company Management" for now.
Detailed Core functionalities of "Company Management"
1. Create Company Module:
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

2. Company List Module:
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

3. View Company Module:
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

Detailed Core functionalities of "Lead Management" - List, Create and View of leads.
4. List Lead Module
1. Lead List View:
   - Columns (in order):
     * Name (JP/EN based on user's language selection)
     * Company name
     * Position
     * Department
     * Email
     * Telephone
     * Stage
     * Status
     * Deal count
     * Revenue Generated
     * Sales Incharge
     * Created on
     * Action (three dots menu, no column header)
   - Sorting: Recently added leads at the top
   - No horizontal scrolling when selected columns fit the screen
   - Pagination: 25 entries per page by default
   - Page numbers displayed at bottom right

2. Lead Stages:
   - Progression: Target -> Potential -> Client -> Other
   - Automatic stage change to "Other" if not progressed to "Client" within 1 month of becoming "Potential"
   - Information icon (i) next to "Other" with hover tooltip explaining it includes cold/lost leads

3. Lead Status:
   - Active (green text)
   - Inactive (grey text)

4. Sales Incharge Display:
   - Show up to 3 names, based on oldest added date

5. Action Menu:
   - View, Edit, Delete options

6. Lead Board View (Kanban):
   - Columns: Target, Potential, Client, Others
   - Card format for leads, including:
     * Number of deals
     * Stage
     * Status (icon only, no label)
     * Name
     * Email id
     * Telephone
     * Revenue Generated
     * Next Action item

7. Enhanced Filtering (Left side dropdown):
   - Leads: All Leads
   - Status: Active / Inactive
   - Stage: Target / Potential / Client / Other
   - Company
   - Country
   - State

8. View Switching:
   - Icons for List and Board views
   - Functionality to switch between views

9. Masking Sensitive Information:
   - Mask email and telephone for non-Sales in-charge users

10. Lead Creation:
    - Prominent "Create" button alongside Search, Import, and Export

11. Lead Import/Export:
    - Functionality for importing and exporting lead data

12. Lead Search:
    - Implement search function with dedicated button

13. Visual Lead Cards:
    - "New leads this Week" in card format at page top

14. Multi-language Support:
    - Interface language options
    - Adapt lead names display based on user's language preference

15. Data Validation:
    - Ensure data consistency across leads


5. Create Lead Module
Based on the information present in the prototyping, here's a outline of the core functionality required for the "Create Lead" feature in our Lead Management system:

1. Lead Identification:
   - Unique lead ID (e.g., #586789963 as shown in Image 1)
   - Lead name in English (EN) and Japanese (JP)
   - Company name
   - Department
   - Position

2. Contact Information:
   - Email (unique, no duplicates allowed)
   - Telephone number
   - Option to add business card (upload functionality)

3. Lead Classification:
   - Stage dropdown (Target -> Potential -> Client -> Other)
   - Status dropdown (Active or Inactive)

4. Financial Information:
   - Product selection
   - Number of licenses
   - Payment method
   - Currency
   - Budget
   - Deposit amount
   - Estimated revenue
   - Estimated close date

5. Client and Company Details:
   - Client selection (dropdown)
   - Company selection (dropdown)

6. Lead Ownership:
   - Created by (auto-filled with current user)
   - Managed by (Add person functionality)
   - PIC (Person in Charge) - multiple selections allowed
   - Supervisor (Add person functionality)

7. Associated Information:
   - Associated Leads (to add the flow)
   - Remarks/Notes section

8. Progress Tracking:
   - Visual progress indicator (New lead > Proposal > Negotiation > Contract sent > Close)

9. Additional Features:
   - Task list tab
   - Related information tab
   - Option to mark as returning customer

10. Action Items:
    - Save functionality
    - Cancel option
    - Back button
    - Create button

11. Validation:
    - Required fields marked with asterisk (*)
    - Email uniqueness check

12. UI/UX Considerations:
    - Tabbed interface (Summary, Task list, Related)
    - Collapsible sections for better organization
    - Clear visual hierarchy

6. View Lead Module
Based on the provided images and information, here's a concise outline of the core functionalities for the "View Lead" feature:

1. Lead Overview:
   - Business card or initials display
   - Lead name (EN/JP based on user language)
   - General info (stage, status, company, email, phone, address)
   - Performance metrics (revenue, invoices, estimations)

2. Navigation:
   - Edit button
   - Tabs: Deals, Memo, Schedule, Activity log

3. Left Column:
   - Lead details
   - Latest deal information
   - Tags
   - Associated leads

4. Right Column:
   - Deals list with create option
   - Memo section for discussions
   - Activity log with timeline

5. Activity Tracking:
   - Chronological display of activities
   - Add activity button

6. Deal Management:
   - List of associated deals
   - Deal creation functionality

7. Timeline View:
   - Visual representation of lead progress

8. Collaboration:
   - Multi-user involvement indicators

9. Quick Actions:
   - Contact options (email, phone)

10. Progress Indicator:
    - Visual stage progression (e.g., Contacted, Unqualified, Converted)

11. Upcoming Events:
    - Display of scheduled actions/events
    - Option to add new events

Detailed Core functionalities of "Deal Management" - List, Create and View of leads.

7. List Lead Module
Based on detailed requirements present in prototyping, here are the core functionalities for the "Deal Management - List of Leads" feature:

1. Deal List View:
   - Customizable columns (Name, Lead name, Company name, Stage, Status, Deal value, Sales Incharge, Created on, Action)
   - Sortable columns
   - Pagination (25 entries per page by default)
   - Recently added deals at the top

2. Top Deals Showcase:
   - "New deals this Week" cards (3)
   - Display name, company, value, and stage

3. Action Buttons:
   - Create, Search, Import, and Export functionalities

4. Filtering Options:
   - Deals: All deals / My deals
   - Status: Active / Inactive
   - Stage: Cold, Warm, Hot, Client, Lost

5. View Toggle:
   - Switch between List and Board (Kanban) views

6. Column Customization:
   - Edit columns feature with checkbox selection

7. Deal Stages Management:
   - Progression: Cold -> Warm -> Hot -> Client -> Lost
   - Automatic stage change after 1 month
   - Information icon for "Other" category

8. Status Visualization:
   - Color-coded status (Active: green, Inactive: grey)

9. Multi-user Assignment:
   - Display up to 3 sales incharge names

10. Action Menu:
    - View, Edit, Delete options for each deal

11. Kanban Board View:
    - Group deals by stages
    - Card format with key deal information

12. Board Filtering:
    - Group by Stages dropdown

13. Responsive Design:
    - No horizontal scrolling when columns fit the screen

14. Page Navigation:
    - Page numbers at the bottom right

8. Create Lead Module
Based on the details availableon prototyping, here are the core functionalities for the "Create Deal" module:

1. Deal Identification:
   - Unique deal ID (e.g., #586789963)
   - Deal name (EN/JP)
   - Lead name with dropdown search (format: Name, Company name in JP)
   - Add person functionality for lead

2. Deal Details:
   - Deal value
   - Deal stage (Cold -> Warm -> Hot -> Client -> Lost) as dropdown
   - Closing date (Year/Month/Day format)
   - Probability percentage
   - Next action and its date

3. Financial Information:
   - Product selection
   - Number of licenses
   - Returning customer toggle
   - Payment method
   - Currency
   - Budget
   - Deposit amount
   - Estimated revenue

4. Client and Company Details:
   - Client selection (dropdown)
   - Company selection (dropdown)

5. Deal Ownership:
   - Created by (auto-filled)
   - Sales In-charge (Add person functionality)
   - Supervisor (Add person functionality)

6. Progress Tracking:
   - Visual progress indicator (New lead > Proposal > Negotiation > Contract sent > Close)

7. Additional Features:
   - Task list tab
   - Related information tab
   - Remarks section

8. Action Items:
   - Save functionality
   - Cancel option
   - Clear button
   - Back button

9. UI/UX Considerations:
   - Tabbed interface (Summary, Task list, Related)
   - Collapsible sections for better organization

10. Integration:
    - Action items to be displayed in user dashboard TODO section

11. Validation:
    - Required fields marked with asterisk (*)

12. Deal Status Visualization:
    - Display deal status (Cold/Warm/Hot/Lost) prominently

9. View Lead Module


# Technologies used

# Project structure

# Documentation
### 1. **State Management**  
Managing the application state is crucial when we will handling dynamic data such as leads and company information. 
- **Zustand**: Simple, minimal state management without the boilerplate of Redux. It’s perfect for managing global state in a small to medium-sized app.
  - **Install**: `npm install zustand`
  - It integrates well with React hooks and has a lightweight API.
https://github.com/pmndrs/zustand
  
### 2. **Data Fetching**  
For interacting with APIs (fetching lead data, company information, etc.), We have opted below:
- **SWR**: An extremely lightweight package from the Next.js team for data fetching with caching, revalidation, and error handling. It’s perfect for fetching sales lead data, and it integrates naturally with Next.js's SSR (server-side rendering) and ISR (incremental static regeneration).
  - **Install**: `npm install swr`
  - Supports automatic re-fetching when the user re-focuses the page, which is useful for up-to-date sales data.
https://github.com/vercel/swr

### 3. **UI Components & Styling**
Creating an intuitive and attractive UI is essential for our app’s success:
- **Chakra UI**: A modular and accessible component library that works great with React and Next.js. It allows you to build responsive UIs quickly.
  - **Install**: `npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion`

https://github.com/chakra-ui/chakra-ui
https://github.com/emotion-js/emotion/tree/main
https://github.com/framer/motion

### 4. **Form Handling**
Since you’ll be managing lots of forms for adding and editing lead or company details:
- **React Hook Form**: A library for building flexible forms that supports validation, submission handling, and form state management.
  - **Install**: `npm install react-hook-form`
https://github.com/react-hook-form/react-hook-form

### 5. **Database Integration (Backend)**  
For your app’s backend, connecting to databases such as PostgreSQL using Supabase client can be done through:
- **Supabase**: A Supabase Client Library. it supports both CRUD operations and real-time subscriptions
  - **Install**: `npm install @supabase/supabase-js`
https://github.com/supabase/supabase-js
  
### 6. **Charts and Data Visualization**  
To visualize sales metrics and lead progress:
- **Recharts**: A simple charting library for React, perfect for visualizing sales performance, lead trends, etc.
  - **Install**: `npm install recharts`
https://github.com/recharts/recharts
 
- **Chart.js**: For more customizable charts and graphs. It supports pie charts, bar graphs, line charts, etc.
  - **Install**: `npm install chart.js react-chartjs-2`
https://github.com/chartjs/Chart.js

### 7. **SEO and Performance**
Since we’re using **Next.js**, SEO optimization and performance are critical:
- **next-seo**: Helps manage SEO metadata, including titles and descriptions.
  - **Install**: `npm install next-seo`
https://github.com/garmeeh/next-seo#readme

### 8. **Error Tracking and Monitoring**  
We want to ensure our app is running smoothly in production:
- **Sentry**: Helps track errors, performance issues, and bugs in production environments.
  - **Install**: `npm install @sentry/nextjs`
https://github.com/getsentry/sentry-javascript

### 9. **Database management system**  
  - **Install**: `npm install @supabase/supabase-js`
https://github.com/supabase/supabase-js

These packages, along with Next.js’s built-in features like **API routes** and **server-side rendering**, will help us to build an efficient and scalable **SalesConnect** application. Let me know if you'd like more details on any of these!


# Prompt

  You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, Tailwind and Supabase.
  
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
  


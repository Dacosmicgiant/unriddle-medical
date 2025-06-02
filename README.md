# Healthcare Dashboard

A modern patient management system built with React and TypeScript. I wanted to create something that healthcare professionals could actually use, so I focused on clean design and practical functionality.

## What it does

This is basically a dashboard where you can manage patient records. You can add new patients, edit existing ones, search through records, and get some basic analytics about your patient base.

The main features include:
- Patient management (add, edit, delete, search)
- Real-time filtering by department and status
- Dashboard with charts showing patient demographics
- Responsive design that works on phones and tablets
- Clean, healthcare-focused UI

## Tech stack

- **React 19** with TypeScript for the frontend
- **Redux Toolkit** for state management
- **TailwindCSS** for styling
- **Recharts** for the dashboard charts
- **Vite** for development and building

## Getting started

You'll need Node.js (version 18 or higher) installed. Then:

```bash
# Clone the repo
git clone https://github.com/your-username/healthcare-dashboard.git
cd healthcare-dashboard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

## Available scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project structure

The codebase is organized pretty straightforwardly:

```
src/
├── components/
│   ├── dashboard/          # Dashboard page and charts
│   ├── layout/            # Header and navigation
│   ├── patients/          # Patient management components
│   └── ui/               # Reusable components
├── store/                # Redux setup
├── types/                # TypeScript definitions
├── constants/            # App constants
└── hooks/                # Custom hooks
```

## How it works

The app fetches sample patient data from DummyJSON API and transforms it into a healthcare format. All the patient management (add/edit/delete) happens in memory using Redux state.

The dashboard shows some basic analytics - gender distribution, age groups, and department breakdowns. The patient management section has search and filtering capabilities.

Everything is fully responsive, so it should work well on any device.

## Data source

I'm using the DummyJSON API (`https://dummyjson.com/users`) for sample data. The app transforms generic user data into patient records with medical fields like department, status, blood group, etc.

## Deployment

Build the project with `npm run build` and deploy the `dist` folder to any static hosting service like Vercel, Netlify, or GitHub Pages.

## What's next

Some things I'd like to add:
- User authentication
- Export functionality (PDF, Excel)
- Dark mode
- More detailed patient records
- Real-time updates

## Contributing

Feel free to open issues or submit PRs. The codebase is pretty straightforward to work with.

## License

MIT License - feel free to use this however you'd like.
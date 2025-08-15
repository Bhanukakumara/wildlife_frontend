# Wildlife Photography E-Commerce Frontend

A modern, responsive e-commerce platform for wildlife photography built with React, TypeScript, and Vite.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Wildlife Photo Gallery**: Browse stunning wildlife photographs organized by categories (birds, mammals, marine, reptiles)
- **Advanced Filtering**: Filter photos by category, search by keywords, and sort by different criteria
- **Shopping Cart**: Add photos to cart, adjust quantities, and remove items
- **Checkout Process**: Secure multi-step checkout with address, shipping, and payment information
- **User Authentication**: Register, login, and password recovery functionality
- **User Profile**: Manage profile information and view order history
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI**: Clean, intuitive interface built with Material-UI and TailwindCSS

## Technologies Used

- **React 19** - Frontend library for building user interfaces
- **TypeScript** - Typed superset of JavaScript for enhanced development experience
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - React component library for implementing Material Design
- **TailwindCSS** - Utility-first CSS framework for styling
- **React Router** - Declarative routing for React applications
- **Emotion** - CSS-in-JS library for styling components

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd wildlife_frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
wildlife_frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, and other assets
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers
│   ├── data/               # Static data files
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API service functions
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── App.css             # Global app styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── .gitignore              # Git ignore file
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## Folder Structure

### `/src/assets`
Contains all static assets including images, fonts, and videos.

### `/src/components`
Reusable UI components organized by category:
- `cart/` - Shopping cart related components
- `checkout/` - Checkout process components
- `common/` - Generic reusable components (buttons, modals, etc.)
- `forms/` - Form input components
- `gallery/` - Photo gallery components
- `user/` - User authentication and profile components

### `/src/pages`
Page components that correspond to different routes in the application:
- Home, Gallery, About, Contact pages
- Authentication pages (Login, Register)
- User Profile and Order History
- Shopping Cart and Checkout pages

### `/src/styles`
Global styles and theme configurations.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

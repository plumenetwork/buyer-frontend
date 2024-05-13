# Asset Buyer App

Welcome to the **Asset Buyer App**. This guide will help you get started with setting up and running the project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You need to have Node.js installed on your system to run this project. You can download and install Node.js from [Node.js official website](https://nodejs.org/).

Ensure you have `pnpm` installed on your machine. If you don't have `pnpm`, you can install it via npm:


    npm install -g pnpm

### Installing
1. **Clone the repository**
   ```bash
   git clone https://github.com/plumenetwork/buyer-frontend.git
2.  **Navigate to the project directory**
    
    ```bash
    cd buyer-frontend
3.  **Copy environment variables**
    ```bash
    cp .env.sample .env.local
4.  **Install dependencies**
    ```bash
	pnpm install
5.  **Start the development server**
    ```bash
	pnpm run dev
## Building and Running the Production Build

To build and run the production version of the app:

	pnpm run build
	pnpm run start

## Continuous Integration and Deployment
CI/CD is managed through GitHub Actions and Vercel. When a PR is raised:

-   **GitHub Actions**: Runs linting, formatting checks, and sample tests to ensure quality.
-   **Vercel**: Creates a preview link for each pull request for review.
### Deployment Process
-   **Development Environment**: After merging PRs into the develop branch, the app is automatically deployed to a development environment.
-   **Production Environment**: Merging from develop to main triggers deployment to the live production environment.

## Code Consistency Tools
This project utilizes several tools to ensure code consistency:
-   **ESLint**: For identifying and reporting on patterns found in ECMAScript/JavaScript code.
-   **Prettier**: An opinionated code formatter.
-   **Husky**: Used to run scripts on pre-commit. It ensures that only code adhering to our standards is committed.
-   **lint-staged**: Allows running linters on staged git files.
## Important Components overview

-   **`withAuth`**: A higher-order component used for handling authentication in route navigation.
-   **`useLocalStorage`**: A custom-made hook for managing global state storage within the app.

## Tech Stack
-   **Frontend & API Handling**: Next.js
-   **Component Styling**: Shadcn, Tailwind CSS
-   **Smart Contract Integration**: viem, wagmi
-   **Deployment**: Vercel
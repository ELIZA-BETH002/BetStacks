# BetStacks

BetStacks is a decentralized betting platform built on the Stacks blockchain, leveraging Clarity smart contracts for secure, transparent, and trustless betting operations. This repository contains the full source code for the smart contracts, frontend application, and integration services.

## Architecture

The project is structured into three main layers:

1.  **Smart Contracts**: Written in Clarity, deployed on the Stacks blockchain. Handles bet placement, odds calculation, and payout distribution.
2.  **Frontend**: A modern web application built with React and Vite, providing a seamless user interface for interacting with the blockchain.
3.  **Integration Services**: Utilizes Stacks.js and WalletConnect to facilitate secure wallet connections and transaction signing.

## Key Features

-   **Stacks Blockchain Integration**: Native integration with Stacks for Bitcoin-secured finality.
-   **Clarity Smart Contracts**: Predictable and safe smart contracts ensuring no unintended side effects.
-   **Wallet Connect Support**: Wide compatibility with various crypto wallets via WalletConnect v2.
-   **Real-time Updates**: Chainhooks integration for listening to blockchain events and updating the UI in real-time.
-   **Responsive Design**: A fully responsive component library optimized for desktop and mobile devices.

## Tech Stack

-   **Blockchain**: Stacks (Clarity)
-   **Frontend**: React, TypeScript, Vite
-   **State Management**: React Query / Context API
-   **Styling**: CSS Modules
-   **Testing**: Vitest, Clarinet SDK
-   **Tooling**: Clarinet, Hiro Platform

## Prerequisites

Ensure you have the following installed:

-   Node.js (v18 or higher)
-   npm or yarn
-   Clarinet (for smart contract development)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ELIZA-BETH002/BetStacks.git
    cd BetStacks
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Development

### Running the Frontend

Start the local development server:

```bash
npm run dev
```

### Smart Contract Testing

Run the Vitest test suite to verify smart contract logic:

```bash
npm run test
```

## Project Structure

-   `contracts/`: Clarity smart contracts.
-   `src/`: Application source code.
    -   `components/`: Reusable UI components.
    -   `hooks/`: Custom React hooks for Stacks integration.
    -   `lib/`: Utility libraries and configuration.
    -   `pages/`: Application route views.
-   `tests/`: Unit and integration tests.
-   `Clarinet.toml`: Project configuration for the Clarinet development environment.

## Contributing

We welcome contributions. Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
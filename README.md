![GitHub issues](https://img.shields.io/github/issues/weebNeedWeed/meowracle)
![GitHub pull requests](https://img.shields.io/github/issues-pr/weebNeedWeed/meowracle)
![GitHub](https://img.shields.io/github/license/weebNeedWeed/meowracle)
![GitHub contributors](https://img.shields.io/github/contributors/weebNeedWeed/meowracle)
![GitHub stars](https://img.shields.io/github/stars/weebNeedWeed/meowracle)

# Meowracle

Meowracle is a tool designed to help you create stunning LinkedIn cover images to highlight your AWS certifications. This repository contains both the backend and frontend code for the Meowracle application.

## Features

- Quick and easy banner creation
- Professional templates optimized for LinkedIn
- AWS certification badge integration
- High quality output in multiple formats
- Real-time preview
- Always free to use

## Tech Stack

### Backend

- Go
- AWS CDK
- DynamoDB
- API Gateway

### Frontend (see [Frontend Documentation](web/meowracle-gui))

- Next.js 15
- React 19
- Mantine UI Framework
- Konva for canvas manipulation
- TypeScript
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js (18.x or higher)
- pnpm package manager
- Go (1.20 or higher)
- AWS CLI configured

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/weebNeedWeed/meowracle.git
  ```

2. Install dependencies:
  ```bash
  pnpm install
  ```

3. Create environment file:
  ```bash
  cp .env.sample .env
  ```

### Development

#### Frontend

1. Start the development server:
  ```bash
  pnpm dev
  ```

2. Build for production:
  ```bash
  pnpm build
  ```

3. Start the production server:
  ```bash
  pnpm start
  ```

#### Backend

1. Deploy the CDK stack:
  ```bash
  cdk bootstrap && cdk deploy
  ```

2. Seed the database:
  ```bash
  make seed
  ```

## Environment Variables

- `NEXT_PUBLIC_BASE_URL`: Base URL for the application
- `NEXT_PUBLIC_GA_TRACKING_ID`: Google Analytics tracking ID
- `AWS_PROFILE`: AWS CLI profile to use
- `ENVIRONMENT`: Deployment environment (e.g., development, production)

## License

This project is licensed under the Apache 2.0 License.

## Contact

For any inquiries or support, please open an issue in the repository.

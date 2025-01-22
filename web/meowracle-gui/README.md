## Meowracle Graphical User Interface (GUI)

Meowracle's GUI is designed with user-friendliness in mind. It features an intuitive layout that allows users to easily navigate through the application. The drag-and-drop functionality simplifies the process of customizing templates, and real-time previews ensure that users can see their changes instantly. The interface is responsive, ensuring a seamless experience across different devices and screen sizes.

## Tech Stack

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

### Installation

```bash
# Clone the repository
git clone https://github.com/weebNeedWeed/meowracle

# Install dependencies
pnpm install

# Create environment file
cp .env.sample .env
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

- `NEXT_PUBLIC_BASE_URL`: Base URL for the application
- `NEXT_PUBLIC_GA_TRACKING_ID`: Google Analytics tracking ID
- `IMAGE_BASE_DOMAIN`: CloudFront domain registered with NextJS
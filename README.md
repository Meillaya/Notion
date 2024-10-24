
# Notion Clone

A feature-rich note-taking and document management application built with modern web technologies.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Convex (Real-time Database)
- Clerk (Authentication)
- Edge Store (File Upload)
- BlockNote (Rich Text Editor)

## Features

- Real-time collaboration
- Rich text editor with markdown support
- File upload and management
- Nested documents & folders
- Authentication & authorization
- Responsive design
- Light/Dark mode
- Search functionality
- Document sharing
- File attachments

## 🛠️ Installation

1. Clone the repository:

git clone https://github.com/yourusername/notion-clone.git
cd notion-clone


2. Install dependencies:

npm install


3. Set up environment variables:

cp .env.example .env


4. Configure your environment variables:

VITE_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CONVEX_DEPLOYMENT=
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=


5. Start the development server:

npm run dev


## Project Structure


src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── providers/     # Context providers
├── app/           # Application routes and pages
└── styles/        # Global styles and Tailwind config


## 🧪 Running Tests


npm run test


## 📦 Building for Production


npm run build


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Inspired by Notion
- Built with modern web technologies
- Open source community

## 🔗 Links

- [Live Demo](https://your-demo-link.com)
- [Documentation](https://your-docs-link.com)
- [Bug Report](https://github.com/yourusername/notion-clone/issues)

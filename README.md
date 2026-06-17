# 🚀 Karyo App

Frontend application for Karyo, a robust and intuitive platform for workspace, project, and task management.

## 📝 Description

Karyo Web App provides a modern, fast, and responsive user interface to manage teams, track project progress, and collaborate seamlessly. Built with performance and developer experience in mind.

## ✨ Features

- **Modern Framework** – Built with Next.js and React.
- **Type Safety** – Fully written in TypeScript.
- **Styling** – Utility-first styling with Tailwind CSS.
- **Data Management** – Efficient server-state management and caching using TanStack Query.
- **Containerized** – Multi-stage Docker setup optimized for production (Standalone output).
- **Package Manager** – Managed securely and quickly using pnpm.

## 🚀 Quick Start

The project is containerized and ready for production or local development.

#### 1. Clone the repository

```bash
git clone https://github.com/mryasinq/karyo-app.git
cd karyo-app
```

#### 2. Create environment file

```bash
cp .env.example .env
```

#### 3. Build and start (Docker)

```bash
docker build --build-arg NEXT_PUBLIC_API_URL="http://localhost:3000" -t karyo-app .
docker run --env-file .env -p 3000:3000 karyo-app
```

#### Alternatively, run locally for development

```bash
pnpm install
pnpm start:dev
```

## 🔧 Environment Configuration

```env
NODE_ENV=""
NEXT_PUBLIC_API_URL=""
```

## 🤝 Contributing

1. Fork the repository
2. Create branch: `git checkout -b feature/your-feature-name`
3. Commit: `git commit -m "feat(area): add feature description"`
4. Push: `git push origin feature/your-feature-name`
5. Create Pull Request

**Branch Naming:**

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Urgent fixes

## 📄 License

This project is licensed under the MIT License.

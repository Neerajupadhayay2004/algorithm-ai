# AlgorithmMain

A comprehensive algorithm learning and visualization platform built with Next.js, featuring interactive code editing, algorithm visualization, and AI-powered code generation.

🌐 **Live Demo**: [https://algorithm01.netlify.app/](https://algorithm01.netlify.app/)

<img width="1920" height="1080" alt="Screenshot at 2025-08-05 02-29-34" src="https://github.com/user-attachments/assets/81b1043b-66d6-4a63-9b73-edc7804ad842" />
<img width="1920" height="1080" alt="Screenshot at 2025-08-05 02-29-46" src="https://github.com/user-attachments/assets/84c4c7a2-8187-4d45-9557-9901df0d4151" />
<img width="1920" height="1080" alt="Screenshot at 2025-08-05 02-29-54" src="https://github.com/user-attachments/assets/018002bc-d53c-4b20-a382-ff420e33dd3d" />
<img width="1920" height="1080" alt="Screenshot at 2025-08-05 02-30-03" src="https://github.com/user-attachments/assets/7e1f0a31-d43d-4fb6-b844-ee46714a426d" />
<img width="1920" height="1080" alt="Screenshot at 2025-08-05 02-30-09" src="https://github.com/user-attachments/assets/18be846c-c751-420a-9027-33332353160f" />
## 🚀 Features

- 🧠 **Algorithm Library** - Extensive collection of algorithms with explanations
- 💻 **Interactive Code Editor** - Write and test algorithms in real-time
- 📊 **Algorithm Visualizer** - Visual representations of algorithm execution
- 🎯 **Practice Mode** - Hands-on coding challenges and exercises
- 🤖 **AI Code Generator** - AI-powered algorithm code generation
- 🌙 **Dark Mode Support** - Beautiful dark and light themes
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: SQL (PostgreSQL/MySQL compatible)
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor integration
- **Icons**: Lucide React
- **Deployment**: Netlify

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
- Database (PostgreSQL/MySQL)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/algorithmmain.git
cd algorithmmain
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

4. **Set up the database:**
```bash
# Run database creation script
npm run db:create

# Seed with sample data
npm run db:seed
```

5. **Start the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
algorithmmain/
├── app/                           # Next.js app directory
│   ├── (dashboard)/              # Dashboard routes
│   │   ├── library/              # Algorithm library pages
│   │   ├── editor/               # Code editor pages
│   │   ├── visualizer/           # Algorithm visualizer
│   │   ├── practice/             # Practice mode
│   │   └── ai-generator/         # AI code generator
│   ├── api/                      # API routes
│   │   ├── algorithms/           # Algorithm CRUD operations
│   │   ├── auth/                 # Authentication
│   │   └── ai/                   # AI integration
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── algorithm-library.tsx
│   │   ├── algorithm-visualizer.tsx
│   │   ├── code-editor.tsx
│   │   ├── practice-mode.tsx
│   │   └── ai-code-generator.tsx
│   ├── lib/                      # Utility libraries
│   │   ├── algorithm-database.ts
│   │   ├── algorithm-solver.ts
│   │   ├── utils.ts
│   │   └── db.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-algorithm.ts
│   │   ├── use-visualizer.ts
│   │   └── use-editor.ts
│   ├── types/                    # TypeScript type definitions
│   │   ├── algorithm.ts
│   │   └── user.ts
│   ├── styles/                   # Global styles
│   │   └── globals.css
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── loading.tsx               # Loading components
├── components/ui/                # shadcn/ui components
├── public/                       # Static assets
│   ├── images/
│   └── icons/
├── scripts/                      # Database and utility scripts
│   ├── create-database.sql
│   ├── seed-data.sql
│   └── migrate.js
├── docs/                         # Documentation
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   └── API.md
├── .env.example                  # Environment variables template
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Features Overview

### 📚 Algorithm Library
Browse through a comprehensive collection of algorithms including:
- **Sorting algorithms**: Quick Sort, Merge Sort, Bubble Sort, Heap Sort, Insertion Sort
- **Search algorithms**: Binary Search, Linear Search, Jump Search, Exponential Search
- **Graph algorithms**: DFS, BFS, Dijkstra, Floyd-Warshall, Kruskal's, Prim's
- **Dynamic Programming**: Fibonacci, LCS, Knapsack, Edit Distance
- **Data structures**: Arrays, Linked Lists, Trees, Graphs, Hash Tables

### 💻 Code Editor
- **Multi-language support**: JavaScript, Python, Java, C++, Go
- **Syntax highlighting** with Monaco Editor
- **Real-time code execution** and testing
- **Error handling** and debugging assistance
- **Code formatting** and auto-completion
- **Custom themes** and font settings
- **Code sharing** and export functionality

### 📊 Algorithm Visualizer
- **Step-by-step execution** with interactive controls
- **Multiple visualization modes**: Array, Tree, Graph, Matrix
- **Customizable speed controls** (0.5x to 4x speed)
- **Pause, play, and step-through** functionality
- **Data input customization** for testing
- **Visual complexity analysis**
- **Animation export** (GIF/Video)

### 🎯 Practice Mode
- **500+ coding challenges** across all difficulty levels
- **Automated test case validation** with detailed feedback
- **Progress tracking** and achievement system
- **Hint system** for learning assistance
- **Time complexity analysis**
- **Discussion forum** for each problem
- **Competition mode** with leaderboards

### 🤖 AI Code Generator
- **Algorithm implementation generation** from descriptions
- **Code explanation** and optimization suggestions
- **Multiple programming language support**
- **Learning-focused suggestions** and best practices
- **Code review** and improvement recommendations
- **Custom algorithm creation** from requirements

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run type-check` | Run TypeScript checks |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run db:create` | Create database tables |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:migrate` | Run database migrations |
| `npm run db:reset` | Reset database |

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/algorithmmain"
# or for MySQL
# DATABASE_URL="mysql://username:password@localhost:3306/algorithmmain"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# AI Integration (Optional)
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="AlgorithmMain"

# Analytics (Optional)
GOOGLE_ANALYTICS_ID="your-ga-id"

# Email Service (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🚀 Deployment

### 🌐 Netlify (Current Deployment)

The application is currently deployed on Netlify at [https://algorithm01.netlify.app/](https://algorithm01.netlify.app/)

**Deployment Steps:**
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Set environment variables in Netlify dashboard
4. Deploy automatically on push to main branch

### ▲ Vercel (Alternative)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy with automatic CI/CD

### 🐳 Docker

```bash
# Build the image
docker build -t algorithmmain .

# Run the container
docker run -p 3000:3000 algorithmmain

# Using Docker Compose
docker-compose up -d
```

### 🏗️ Self-Hosting

```bash
# Build the application
npm run build

# Start the production server
npm start

# Using PM2 for production
npm install -g pm2
pm2 start npm --name "algorithmmain" -- start
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details on how to get started.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following our coding standards
4. **Run tests:**
   ```bash
   npm test
   npm run type-check
   npm run lint
   ```
5. **Commit your changes:**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### 📋 Contribution Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Use conventional commit messages

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📖 API Documentation

The platform provides a comprehensive REST API. See [API Documentation](docs/API.md) for detailed information about available endpoints.

### Key Endpoints

- `GET /api/algorithms` - Get all algorithms
- `POST /api/algorithms` - Create new algorithm
- `GET /api/algorithms/:id` - Get specific algorithm
- `PUT /api/algorithms/:id` - Update algorithm
- `DELETE /api/algorithms/:id` - Delete algorithm
- `POST /api/ai/generate` - Generate code with AI
- `GET /api/challenges` - Get practice challenges
- `POST /api/challenges/:id/submit` - Submit solution

## 🎨 Customization

### Themes
The application supports custom themes. You can modify the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### Adding New Algorithms
1. Create algorithm implementation in `lib/algorithms/`
2. Add algorithm metadata to database
3. Create visualization component if needed
4. Add tests for the algorithm
5. Update documentation

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: All green
- **Bundle Size**: Optimized with code splitting
- **Caching**: Aggressive caching strategy
- **CDN**: Static assets served via CDN

## 🔒 Security

- **Authentication**: NextAuth.js integration
- **Authorization**: Role-based access control
- **Data Validation**: Zod schema validation
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Built-in protection
- **Rate Limiting**: API rate limiting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Monaco Editor may have loading issues on slow connections
- Visualizer animations may be choppy on low-end devices
- Some algorithms may timeout on large datasets

See [GitHub Issues](https://github.com/Neerajupadhayay2004/algorithmmain/issues) for the complete list.

## 📈 Roadmap

### 🎯 Short Term (Q1 2025)
- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] Real-time collaboration
- [ ] More visualization types

### 🚀 Long Term (2025)
- [ ] Machine learning algorithms
- [ ] Video tutorials integration
- [ ] Community marketplace
- [ ] Educational partnerships

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Contributors**: Thanks to all the amazing contributors who have helped build this platform
- **Inspiration**: Built for the programming community's need for better algorithm learning tools
- **Open Source**: Leveraging amazing open-source libraries and tools
- **Community**: Special thanks to our Discord community for feedback and suggestions

## 📞 Support & Community

- 📧 **Email**: [support@algorithmmain.com](mailto:support@algorithmmain.com)
- 💬 **Discord**: [Join our community](https://discord.gg/algorithmmain)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Neerajupadhayay2004/algorithmmain/issues)
- 📚 **Documentation**: [Full Documentation](https://docs.algorithmmain.com)
- 🐦 **Twitter**: [@AlgorithmMain](https://twitter.com/algorithmmain)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Neerajupadhayay2004/algorithmmain&type=Date)](https://star-history.com/#Neerajupadhayay2004/algorithmmain&Date)

---

<div align="center">

**Made with ❤️ by the AlgorithmMain team**

[⭐ Star this repository](https://github.com/Neerajupadhayay2004/algorithmmain) | [🐛 Report Bug](https://github.com/Neerajupadhayay2004/algorithmmain/issues) | [✨ Request Feature](https://github.com/Neerajupadhayay2004/algorithmmain/issues)

</div>

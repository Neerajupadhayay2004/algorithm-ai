# Contributing to AlgorithmMain

Thank you for your interest in contributing to AlgorithmMain! We welcome contributions from developers of all skill levels.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please treat all community members with respect and create a welcoming environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/algorithmmain/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node.js version)

### Suggesting Features

1. Check existing [Issues](https://github.com/yourusername/algorithmmain/issues) for similar suggestions
2. Create a new issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach
   - Mockups or examples if helpful

### Development Setup

1. Fork the repository
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/yourusername/algorithmmain.git
   cd algorithmmain
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Making Changes

1. Create a new branch:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. Make your changes following our coding standards
3. Test your changes thoroughly
4. Commit with a clear message:
   \`\`\`bash
   git commit -m "feat: add new algorithm visualization"
   \`\`\`

### Coding Standards

- Use TypeScript for all new code
- Follow the existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design for UI components
- Follow accessibility best practices

### Commit Message Format

We use conventional commits:

- \`feat:\` - New features
- \`fix:\` - Bug fixes
- \`docs:\` - Documentation changes
- \`style:\` - Code style changes (formatting, etc.)
- \`refactor:\` - Code refactoring
- \`test:\` - Adding or updating tests
- \`chore:\` - Maintenance tasks

### Pull Request Process

1. Ensure your branch is up to date with main:
   \`\`\`bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   \`\`\`

2. Push your changes:
   \`\`\`bash
   git push origin your-branch
   \`\`\`

3. Create a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes
   - List of changes made

4. Wait for review and address feedback

### Areas for Contribution

- **Algorithm Implementations**: Add new algorithms to the library
- **Visualizations**: Create new algorithm visualizations
- **UI/UX Improvements**: Enhance user interface and experience
- **Performance Optimizations**: Improve app performance
- **Documentation**: Improve docs and add tutorials
- **Testing**: Add unit and integration tests
- **Accessibility**: Improve accessibility features
- **Internationalization**: Add support for multiple languages

### Algorithm Contribution Guidelines

When adding new algorithms:

1. Include clear documentation and comments
2. Add time and space complexity analysis
3. Provide multiple test cases
4. Create visualization if possible
5. Add to the appropriate category in the library

### Testing

- Run existing tests: \`npm test\`
- Add tests for new features
- Ensure all tests pass before submitting PR

### Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update API documentation for changes

## Getting Help

- Join our [Discord community](https://discord.gg/algorithmmain)
- Ask questions in [Discussions](https://github.com/Neerajupadhayay2004/algorithmmain/discussions)
- Check existing [Issues](https://github.com/Neerajupadhayay2004/algorithmmain/issues)

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special contributor badges

Thank you for helping make AlgorithmMain better! 🚀

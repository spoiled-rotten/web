# Contributing to SpoiledRotten.AI

First off, thank you for considering contributing to SpoiledRotten.AI! It's people like you that make SpoiledRotten.AI such a great tool for luxury shopping automation.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

- `beginner` issues - issues which should only require a few lines of code
- `help-wanted` issues - issues which need extra attention
- `good-first-issue` - issues which are good for newcomers

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/spoiledrotten-web.git
cd spoiledrotten-web
```

2. Install dependencies:
```bash
npm install
```

3. Create a branch for your feature:
```bash
git checkout -b feature/amazing-feature
```

4. Start the development server:
```bash
npm run dev
```

## Development Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🚀 `:rocket:` when improving performance
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies

### TypeScript Style Guide

- Use TypeScript for all new code
- Define interfaces for all component props
- Use functional components with hooks
- Avoid `any` type - use `unknown` or proper types
- Use named exports for components
- Keep components small and focused

### Testing

- Write tests for all new features
- Maintain minimum 80% code coverage
- Use descriptive test names
- Test both success and failure cases
- Mock external dependencies

### Component Guidelines

```typescript
// Good component example
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

### CSS/Styling Guidelines

- Use Tailwind CSS utility classes
- Create custom components in `src/components/ui`
- Follow the luxury theme design system
- Ensure responsive design for all screen sizes
- Test dark/light mode compatibility

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── ui/          # Base UI components
│   └── features/    # Feature-specific components
├── contexts/        # React Context providers
├── hooks/           # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── __tests__/      # Test files
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## Documentation

- Update README.md if you change functionality
- Comment complex logic
- Add JSDoc comments for utilities
- Update API documentation for new endpoints
- Include examples for new features

## Review Process

All submissions require review. We use GitHub pull requests for this purpose. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on pull requests.

### Review Criteria

- Code quality and style consistency
- Test coverage and quality
- Documentation updates
- Performance impact
- Security considerations
- Accessibility compliance

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a tagged release on GitHub
4. Deploy to staging environment
5. Run integration tests
6. Deploy to production

## Community

- Join our [Discord](https://discord.gg/spoiledrotten)
- Follow us on [Twitter](https://twitter.com/spoiledrotten)
- Read our [blog](https://blog.spoiledrotten.ai)

## Questions?

Feel free to contact the project maintainers if you have any questions. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
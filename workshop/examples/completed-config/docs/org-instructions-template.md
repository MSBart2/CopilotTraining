# Organization-Level Copilot Instructions Template

> **Purpose**: Template for organization-wide GitHub Copilot custom instructions.
> **Tier**: 💼 Business / 🏢 Enterprise
> **Location**: GitHub Organization Settings → Copilot → Custom Instructions

---

## How to Use This Template

1. Navigate to your GitHub organization settings
2. Go to **Copilot** → **Custom instructions**
3. Copy and customize the content below
4. Save to apply across all repositories in your organization

---

## Template: Organization Custom Instructions

```markdown
# [Organization Name] Copilot Guidelines

## Our Development Philosophy
<!-- Describe your organization's core values and approach to software development -->
We believe in [clarity/quality/security/etc.] as our foundation. We want code that is:
- Readable by any team member
- Maintainable for the long term
- Secure by default
- Well-tested before deployment

## Coding Standards

### Language-Specific Guidelines
<!-- Add guidelines for your primary languages -->

**TypeScript/JavaScript**:
- Use TypeScript for all new code
- Prefer `const` over `let`, avoid `var`
- Use async/await over raw Promises
- Include JSDoc comments for public APIs

**Python**:
- Follow PEP 8 style guidelines
- Use type hints for function signatures
- Prefer f-strings for string formatting
- Use context managers for resource handling

**[Add your languages here]**

### Naming Conventions
- Use descriptive names that reveal intent
- Boolean variables start with `is`, `has`, `should`, `can`
- Functions are verbs: `getUserById`, `calculateTotal`, `validateInput`
- Constants use UPPER_SNAKE_CASE

### Error Handling
- Never swallow exceptions silently
- Use custom error types for domain-specific errors
- Include context in error messages
- Log errors with appropriate severity levels

## Architecture Patterns

### Preferred Patterns
<!-- List patterns your organization uses -->
- Repository pattern for data access
- Dependency injection for testability
- Event-driven architecture for async workflows
- Feature flags for controlled rollouts

### Patterns to Avoid
<!-- List anti-patterns to discourage -->
- God objects/classes
- Deep inheritance hierarchies
- Hard-coded configuration values
- Synchronous blocking calls in async code

## Security Requirements

### Authentication & Authorization
- All endpoints require authentication unless explicitly public
- Use role-based access control (RBAC)
- Never store secrets in code or environment files committed to git
- Use [your secret management solution] for credentials

### Data Handling
- Encrypt sensitive data at rest and in transit
- Validate and sanitize all user input
- Use parameterized queries to prevent SQL injection
- Follow GDPR/CCPA requirements for personal data

## Testing Standards

### Coverage Requirements
- Minimum 80% code coverage for new code
- All public APIs must have integration tests
- Critical paths require end-to-end tests

### Test Naming
- Use format: `test_[method]_[scenario]_[expected_result]`
- Example: `test_getUserById_validId_returnsUser`

## Documentation Requirements

- All public functions require documentation
- Include examples in documentation where helpful
- Keep README files current with setup instructions
- Document architectural decisions in ADRs

## AI-Generated Code Standards

### Review Requirements
- All AI-generated code must pass the same review standards as human code
- Reviewer must verify business logic correctness
- Security-sensitive code requires additional security review

### Attribution
- No attribution required for AI-generated code
- Ensure generated code doesn't include licensed content inappropriately

---

*These instructions help GitHub Copilot provide suggestions that align with [Organization Name]'s standards. Individual repositories may extend these with repository-specific instructions.*
```

---

## Customization Checklist

Before deploying, customize:

- [ ] Organization name throughout
- [ ] Primary programming languages
- [ ] Specific frameworks and libraries used
- [ ] Security and compliance requirements
- [ ] Testing coverage thresholds
- [ ] Documentation standards
- [ ] Team-specific conventions

---

## Related Resources

- [GitHub Docs: Managing policies for Copilot](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/setting-policies-for-copilot-in-your-organization)
- [GitHub Docs: Adding custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Module 10: Enterprise Patterns](../../../10-enterprise-patterns/README.md)

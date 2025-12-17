---
title: "Customizing Your Blog Design"
description: "Learn how to customize the look and feel of your blog using CSS variables, Tailwind CSS, and component modifications."
date: "2024-12-05"
author: "john-doe"
tags: ["design", "css", "tailwind"]
image: "/images/posts/customizing-design.jpg"
imageAlt: "Design tools and color palette"
featured: false
layout: "default"
---

One of the best features of this blog template is how easy it is to customize. Let's explore the different ways you can make this blog your own.

## CSS Variables

The template uses CSS custom properties for easy theming. Find them in `app/globals.css`:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;

  --color-bg: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-text: #1e293b;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
}
```

Change these values to instantly update your site's color scheme!

## Dark Mode

Dark mode colors are defined separately:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-bg-secondary: #1e293b;
    --color-text: #f1f5f9;
    --color-text-secondary: #94a3b8;
    --color-border: #334155;
  }
}
```

## Tailwind CSS

This template uses Tailwind CSS v4. You can:

- Modify utility classes in components
- Add custom utilities in `globals.css`
- Use the `@apply` directive for reusable styles

## Component Customization

### Header

The header component (`components/Header.tsx`) includes:
- Site logo/name
- Navigation links
- Dark mode toggle

Customize navigation in `blog.config.ts`:

```typescript
nav: [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" }, // Add custom pages!
]
```

### Post Layouts

Three layouts are available:

1. **default** (max-w-3xl): Standard reading width
2. **wide** (max-w-4xl): More space for images
3. **full** (max-w-6xl): Maximum content width

Set the layout in your post frontmatter:

```markdown
---
layout: "wide"
---
```

### Post Cards

Modify `components/PostCard.tsx` to change how posts appear in listings:
- Adjust image aspect ratio
- Change tag styling
- Modify metadata display

## Typography

The template uses `@tailwindcss/typography` for beautiful prose styling. Customize it by overriding the `.prose` classes:

```css
.prose a {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.prose code {
  background-color: var(--color-bg-secondary);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}
```

## Tips for Good Design

1. **Consistency**: Use your color palette consistently
2. **Whitespace**: Don't be afraid of empty space
3. **Typography**: Ensure good contrast and readability
4. **Mobile First**: Test on small screens

Happy customizing! 🎨

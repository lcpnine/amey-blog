---
title: "Getting Started with Next.js Blog"
description: "Learn how to set up and customize your own blog using this Next.js starter template with MDX support, SEO optimization, and more."
date: "2024-12-15"
author: "john-doe"
tags: ["nextjs", "tutorial", "blogging"]
image: "/images/posts/getting-started.jpg"
imageAlt: "A laptop with code on the screen"
featured: true
layout: "default"
---

Welcome to your new blog! This post will guide you through the basics of using this Next.js blog starter template.

## Features

This blog template comes with several powerful features out of the box:

- **Markdown/MDX Support**: Write your posts in Markdown with full MDX support
- **SEO Optimization**: Built-in meta tags, OpenGraph, and schema.org markup
- **Multiple Authors**: Support for multiple authors with individual profiles
- **Dark Mode**: Automatic dark mode based on system preferences
- **Comments**: GitHub-based comments using Giscus
- **RSS Feed**: Automatic RSS feed generation
- **Responsive Design**: Looks great on all devices

## Writing Your First Post

To create a new post, simply add a Markdown file to the `public/_posts` directory. Each post should have frontmatter at the top:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-01-15"
author: "john-doe"
tags: ["tag1", "tag2"]
image: "/images/posts/your-image.jpg"
featured: false
---

Your content here...
```

## Frontmatter Options

Here's a complete list of frontmatter options:

| Option | Required | Description |
|--------|----------|-------------|
| title | Yes | The post title |
| description | Yes | Brief description for SEO |
| date | Yes | Publication date (YYYY-MM-DD) |
| author | No | Author ID from authors.ts |
| tags | No | Array of tags |
| image | No | Featured image path |
| imageAlt | No | Alt text for image |
| featured | No | Show on homepage featured |
| draft | No | Hide from production |
| layout | No | default, wide, or full |

## Code Highlighting

Code blocks are automatically highlighted:

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

## What's Next?

1. Customize `blog.config.ts` with your site details
2. Add your authors to `lib/authors.ts`
3. Configure Giscus for comments
4. Start writing your posts!

Happy blogging! 🎉

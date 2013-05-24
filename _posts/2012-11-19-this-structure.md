---
author: James
layout: post
title: The Structure Of This Blog
tagline: What's underneath it all?

---

# The Structure Of This Blog

This is a [Jekyll](https://github.com/mojombo/jekyll) blog, which is built and published whenever I push to the `gh-pages` of the [`codewithportals`](https://github.com/jdrydn/codewithportals) repo.

	_layouts/
		default.html
		post.html
	_posts/
		2012-10-9-hello-world.md
		2012-11-10-angelhack.md
		2012-11-19-this-structure.md
	.git/
		...
	__config.yml
	.gitignore
	CNAME
	favicon.ico
	index.html
	README.md
	style.css

The files themselves are fairly self-explanatory, especially if you're familiar with Jekyll, but for those who aren't I'll quickly run through them.

	_layouts/
		default.html
		post.html

This contains the layouts for the site. Makes total sense, really!

	_posts/
		2012-10-9-hello-world.md
		2012-11-10-angelhack.md
		2012-11-19-this-structure.md

These are the content for the posts on the site. They're written in Markdown, and feature some tags at the top of the file to specify what template to use (from `_layouts`) and what title etc. to have:

	---
	layout: default
	title: The Structure Of This Blog
	---

The only other special files are the `__config.yml` - this holds the config for the entire site, and `CNAME`, which is a clever file that helps Github link my domain to the repo's site (as [defined here](https://help.github.com/articles/user-organization-and-project-pages))!

As for the content.

The content is going to be about technology. More specifically, coding. I really enjoyed "liveblogging" at [Angelhack 2012](/2012-11-10-angelhack) and I want to do it more - especially when I'm coding ongoing live projects!

So. That's behind this blog. A Jekyll-based website written in Markdown to become a blog. Sounds awesome, actually.
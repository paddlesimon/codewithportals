---
layout: post
title: If You Can't Stand The Heat...

---

# If you can't stand the heat

I'm studying [#CO537][#co537], Functional Programming, and we're learning in [Haskell][haskell], and using an IDE called "[Heat][heat]" that provides syntax highlighting and basic compiling functions. And not much more than that. The save feature is confusing, and creating new '.hs' files is not apparent.

So I want to escape Heat. And it turns out, it's pretty obvious!

Heat complies all Haskell files using the [GHCi compiler][ghci]. So all I need to do is run any '.hs' files through it like so:

	$ ghci terminal2.hs
	... Some sexy compiler stuff here
	Terminal2>

Awesome!! That's identical to the same prompt Heat provides when you compile programs, so I can run everything I need from there!

What about syntax highlighting? Heat provides a basic form of syntax highlighting for Haskell, so all I need to is either find a syntax highlighting scheme for my current IDE ([Coda 2!][coda]) or better yet forget about syntax highlighting and use an editor like 'vim' or 'nano'.

Awesome. That is pretty awesome. I kinda wish I'd done something similar with Java so I could escape BlueJ!

But what about Windows users? I've heard that 'ghci' works from the Windows command line, although I haven't tested this.

### Update (2013-02-08)

GHCI actually has some excellent commands, including an editor, so by setting an editor (`:set editor nano`) and then calling the editor with `:e`. You can also set a default editor (so you don't have to `:set editor nano` every time you load GHCI) by having a `~/.ghci` configuration file with the set editor command:

	:set editor nano

This means we don't need another IDE (like Coda) or another shell open simultaneously to edit Haskell files. We can do everything in GHCI. Brilliant! `:)`

[#co537]: http://twitter.com
[coda]: http://panic.com/coda
[ghci]: http://www.haskell.org/haskellwiki/GHC/GHCi
[haskell]: http://www.haskell.org
[heat]: http://www.cs.kent.ac.uk/projects/heat
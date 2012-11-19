---
layout: post
title: Angelhack
---

# Angelhack

So we're hacking at Angelhack.

Together with [Becca][becca] and [Chris][djpc] I'm building a student recipe finder. The idea is simple. *A recipe suggestion app that gives out suggestions based on what you already have in your cupboards.*

Okay, so the tagline needs working on. I'm not that creative :P

What I am creative with is backend code. So let's get started!

**Pancakes API**

First off, we make a quick framework.

	.git/
	private/
		classes/
			alfred.php
			controller.php
			database.php
			sitecontroller.php
		bootstrap.php
	public_html/
		index.php
	.gitignore
	README.md

Really simple.

The `index.php` file will fire up `bootstrap.php`, which instantiates the rest of the framework.

Using an autoloader, I can only load the classes I need, when I need them. Awesome efficiency.

I'm going to split the `REQUEST_URI` up into the various elements the framework is going to use. I'm going to make the format pretty simple:

	api.example.com/controller/method/param/more/and/more...

In `alfred.php` lives "*Alfred*". Alfred is a helper class, that'll do all the processing. It's also a static class.

	abstract class Alfred
	{
		
		public static function construct() { ... }
		
		public static function getController() { ... }
		
		public static function getMethod() { ... }
		
		public static function getParam() { ... }
		
		public static function slugify() { ... }
		
	}

So I can send in the `REQUEST_URI` as `$path`, and then subsequently make calls to the other static methods to get the relevant fields.

The controller file is based in the format `NameController`, where the `Name` is from the `REQUEST_URI`.

So at the moment, sending a request to the API splits it up and splits up the URL into the relevant parts!

	api.########.io/hello/sir/my/name/is/james
	
	Alfred::$controller HelloController
	Alfred::$method sir
	Alfred::$params Array
	(
		[0] => my
		[1] => name
		[2] => is
		[3] => james
	)

This also allows for some awesome default-ing!

	api.########.io/dosomething
	
	Alfred::$controller DosomethingController
	Alfred::$method index
	Alfred::$params Array
	(
	)

And better still:

	api.########.io/
	
	Alfred::$controller SiteController
	Alfred::$method index
	Alfred::$params Array
	(
	)

Which makes me happy ^_^

----

What if we get errors? How do we handle that?

`try {} catch() {}` ^_^

Literally,

	try {
		
		... and load stuff.
		
	}
	catch(StatusException $e) {
		... Handle StatusExceptions.
	}
	catch(Exception $e) {
		... Handle Exception.
	}

So anywhere in my code I can call:

	throw new StatusException(404, "Something wasn't found!");

Awesome sauce! ^_^

----

So there was an interesting bug.

	api.########.io/some/url?hello=12
	
	Alfred::$controller SomeController
	Alfred::$method url?hello=12
	...

So the `GET` request is being mistaken as part of the URL. Well. It is a part of the URL. But that messes up my framework. Hmm...

To fix: change `Alfred` so that it extracts the `$path` from `PATH_INFO` (which is the actual path that PHP takes in) instead of `REQUEST_URI` which is everything right of the domain.

Phew. Crisis averted!

----

Let's get `bootstrap.php` working `:)`

First off, get Alfred going:

	Alfred::construct();

And get the `Controller` and `Method`:

	$controller = ucfirst(Alfred::getController()).'Controller';
	$method = Alfred::getMethod();

Then check if we have both of those ready to go, if not then send a `404`:

	if (false === autoload($controller)) throw new StatusException(404, 'Not Found');
	if (false === method_exists($controller, $method)) throw new StatusException(404, 'Not Found');

And if we're good to go, run the stuff:

	$c = new $controller();
	$c->before();
	$c->$method();
	$c->after();

And that's it!

**Remember:** Anywhere in the app, I could throw a new `StatusException` and break this runthrough of code, which is pretty **awesome**!

----

So as the night went on, my liveblogging failed `:S`. Ah well.

I've got a stable API at the moment, with a little bit of sample data.

So a search to `api.########.io/recipe/find?ingredients=milk` will return any recipe that uses milk. Which is pretty wicked!

So whilst [Chris][djpc] works on the Android app, I'm playing around with [Phonegap][phonegap] and getting an iOS in the works!

----

## Finite

So we finished the event early, leaving before the pitches. We decided against pitching, given the fact that the apps were themselves shaky, and we have so many more plans for social integration before we reveal the app to the public.

The code from this weekend itself is on [Github][github], although this isn't the code used on the live server. Since then we've implemented more security and more tables, because this code is going to be used in a production environment `:D`

## Thanks!

I really enjoyed working on this API over the weekend. A big thank you to Greg from Angelhack and Tom from Mindwork Labs for organising the event and a big thanks to the staff at Bloomberg for opening up port `22` for SSH. Made our lives *so* much easier!

And a bigger thank you to [Becca][becca] for the initial idea and excellent designs, and [Chris][djpc] for building the Android app `:)`

[becca]: //carbondeclare.co.uk
[djpc]: //djpc.org.uk
[github]: https://github.com/jdrydn/Angelhack2012
[phonegap]: //phonegap.com
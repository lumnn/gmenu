# GMENU

*   [Source code, downloads](https://github.com/suhy/gmenu.git)
*   [Demo](http://kiwio.net)

Simple, pure JS solution for responsive menu.  
It works perfectly on touch and click devices with different screen sizes.

For IE9 there is one required dependency, and for IE8 two. In IE8 script wont't run - so hide it in IE comment. Anyway **menu still uses CSS hover selector to open submenus**. There is probably nobody using that browser on device with touch.

## Features

*   Lightweight - 2kB
*   Responsive
*   Touch friendly
*   Fast
*   Multi-level support
*   Submenus with link

### Animations and other fancy things

It's up to you to add them, GMenu provides only basic functionality. If you'll see how plugin works then, customization for you should be easy.

## How it works?

Basically JS script is responsible for adding and removing `gmenu-active` class same way as `:hover` works.

Clicking on `.gmenu-submenu` toggles `gmenu-active` class in it, and adds same class for all parent elements with `gmenu-submenu` class.

Clicking on `.gmenu-burger` opens top level menu or closes all if menu's open.

### Rest of magic is done by CSS

There're two types of menu collapsed, expanded. You can choose in CSS min-width for expanded.

For expanded there is used :hover selector to open menus.

For collapsed there is displayed `a.gmenu-burger`. Clicking it adds class `gmenu-active` to `.gmenu`. Another click removes all `gmenu-active` classes.

When top-level menu has `.gmenu-active` class, `.gmenu-burger:after` is used to display "Close menu" box in collapsed view

`li.gmenu-submenu` tells script that this element has submenu. Clicking on it toggles `.gmenu-active` classes

	Fig. 1
	Menu item with submenu

	             +-----+----> li:before*
	             v     v
	+------------------+----> li element
	v                  v

	+------------+-----+
	|  Category  |  +  |   
	+------------+-----+

	^            ^
	+------------+----------> a element

	* - Yes! It's :before, because on mobile it's displayed on the left side. Mobile first, saving bytes, blah, blah, blah...

`li` elements have a link, so when link is clicked module doesn't prevents it's behavior, so browser will follow link. To provide open/close submenu it's necesary to show a bit of `li.gmenu-submenu` with padding or like I did with `:before`

## Options

To be honest, I don't belive that somebody will use that, but I wanted to have options in my plugin :)

`var gmenu = gmenu('gmenu', { topScroll: true, activeClass: 'gmenu-active', submenuClass: 'gmenu-submenu', burgerClass: 'gmenu-burger', togglesClass: 'gmenu-toggle-' + name, });`

### topScroll

Defines whethner scroll to opened menu position when clicking burger. In default CSS mobile menu opens allways on document top, so if burger is far down, then after open menu won't be visible

## Known things (not a bugs, but should be mentioned)

*   Some of you may say that top level menu shouldn't have gmenu-submenu class, because it's obvious, but I didn't want to make checks for that in JS
*   When closing submenu collapsed view, top menu still has `.gmenu-active` class. This makes menu opening when viewport size changes to collapsed view (ie. when phone rotates from landscape to portait, then menu will open)

## Copy - paste

#### CSS file

To put inside html tag

To save requests I recommend to copy content of gmenu.css to your css file

	<!-- GMenu CSS -->
	<link rel="stylesheet" type="text/css" href="gmenu.css">

#### Menu structure

	<div id='my-gmenu' class='gmenu gmenu-submenu'>  
		<a class='gmenu-burger' href='#'>Burger</a>  
		<ul>  
			<li class="gmenu-submenu">  
				<a href='#'>One</a>  
				<ul>  
					<li><a href='#'>Lorem</a></li>  
					<li><a href='#'>ipsum</a></li>  
					<li><a href='#'>dolor</a></li>  
				</ul>  
			</li>  
			<li>  
				<a href='#'>Two</a>  
			</li>  
			<li>  
				<a href='#'>Three</a>  
			</li>  
		</ul>  
	</div>

#### Load scripts

Paste this before body ends

	<!-- IE9 classList support -->  
	<!--[if IE 9]>  
	<script type="text/javascript" src='classList.min.js'></script>  
	<![endif]-->
	<!--[if gte IE 9]><!-->  
	<script type="text/javascript" src='gmenu.js'></script>  
	<!--<![endif]-->

#### Run the script

It's important to paste it after menu structure, and after script loading

	<script type="text/javascript">
		gmenu('gmenu2');
	</script>
var gmenu = function gmenu( name, options ) {
	'use strict';

	var api = {};

	var o = {
		activeClass: 'gmenu-active',
		submenuClass: 'gmenu-submenu',
		burgerClass: 'gmenu-burger',
		togglesClass: 'gmenu-toggle-' + name,
		scrollTo: -1,
	};

	var menuNode = document.getElementById(name);
	var burgerNode = menuNode.getElementsByClassName( o.burgerClass )[0];
	var currentMenu;

	// setup user provided options
	// IIFE
	api.options = (function( options ) {
		for( var attrname in options ) {
			o[attrname] = options[attrname];
		}
	}( options ));

	// handling clicks in module
	var gmenuEvent = function gmenuEvent( event ) {
		var item = event.target;

<<<<<<< HEAD
		// if burger was clicked
		if( item === burgerNode ) {

			if( currentMenu === undefined ) {
				api.openMenu( menuNode );
=======
		// if submenu toggler was clicked
		if( item.classList.contains( o.submenuClass ) ) {
			event.preventDefault() ;
				
			// if what clicked is currently active
			if ( item.classList.contains( o.activeClass ) ) {
				public.closeMenu();
>>>>>>> 7b76d1b6760a573d543f7343f3cd75f8706c8b3d
			} else {
				api.closeAll();
			}

			return 1;
		}

<<<<<<< HEAD
		// if submenu toggler was clicked
		if( item.classList.contains( o.submenuClass ) ) {
			event.preventDefault() ;
				
			// if what clicked is currently active
			if ( item.classList.contains( o.activeClass ) ) {
				api.closeAll( item );
=======
		// if burger was clicked
		if( item === burgerNode ) {

			if( currentMenu === undefined ) {
				public.openMenu( menuNode );
>>>>>>> 7b76d1b6760a573d543f7343f3cd75f8706c8b3d
			} else {
				api.openMenu( item );
			}

			return 1;
		}

	}

	// menu argument is an element which will get .active class
	// so in top-menu it is ul, but in sub-menus it's li element
	api.openMenu = function openMenu( menu ) {
		if( menu instanceof Event || menu === undefined ) {
			menu = menuNode;
		}

		// remove current active classes
		api.closeAll();

		// add new active classes
		var nodes = menu;
		while( nodes !== menuNode ) {
			if( nodes.classList.contains( o.submenuClass ) ) {
				nodes.classList.add( o.activeClass );
			}
			nodes = nodes.parentNode;
		}
		menuNode.classList.add( o.activeClass );

		// scroll
		if( o.scrollTo >= 0 ) {
			window.scrollTo( 0, o.scrollTo );
		}
<<<<<<< HEAD
=======
		menu.classList.add(o.activeClass);
>>>>>>> 7b76d1b6760a573d543f7343f3cd75f8706c8b3d

		var openedSubmenus = menu.getElementsByClassName( o.activeClass );
		if( openedSubmenus.length > 0 ) {
			menu = openedSubmenus[ openedSubmenus.length - 1 ];
		}

		currentMenu = menu;
	};

<<<<<<< HEAD
	// closes last opened menu
	// returns 1 - if closed menu was same as argument until
	// or there was no opened menu
	api.closeMenu = function closeMenu( until ) {
		if ( currentMenu === undefined ) {
			return 1;
		} 

		if ( until === undefined ) {
			until = menuNode;
=======
	public.closeMenu = function closeMenu(  ) {
		currentMenu.classList.remove( o.activeClass );
		if( currentMenu !== menuNode ) {
			var parentMenu = currentMenu.parentNode.parentNode;
			if ( parentMenu.classList.contains( o.activeClass ) ) {
				currentMenu = currentMenu.parentNode.parentNode;
				return 1;
			}
>>>>>>> 7b76d1b6760a573d543f7343f3cd75f8706c8b3d
		}

		currentMenu.classList.remove( o.activeClass );

		var toReturn = ( currentMenu === until ) ? 1 : 0;

		var parentMenu = currentMenu.parentNode.parentNode;
		currentMenu = (parentMenu.classList.contains( o.activeClass )) ? parentMenu : undefined;

		return toReturn;

	};

	// closes all submenus of until ( if untill is not provided then closes all )
	api.closeAll = function closeAll( until ) {
		while( !api.closeMenu( until ) ) {}
	};

	// IIFE
	api.enable = (function addEvent() {
		menuNode.addEventListener('click', gmenuEvent);
		var toggles = document.getElementsByClassName( o.togglesClass );
		for (var i = toggles.length - 1; i >= 0; i--) {
			toggles[i].addEventListener( 'click', api.openMenu );
		};
	}());

	api.disable = function removeEvent() {
		menuNode.removeEventListener('click', gmenuEvent);
		var toggles = document.getElementsByClassName( o.togglesClass );
		for (var i = toggles.length - 1; i >= 0; i--) {
			toggles[i].removeEventListener( 'click', api.openMenu );
		};
	};

	return api;
}
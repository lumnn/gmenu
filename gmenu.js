var gmenu = function gmenu( name, options ) {
	var public = {};

	var o = {
		activeClass: 'gmenu-active',
		submenuClass: 'gmenu-submenu',
		burgerClass: 'gmenu-burger',
		togglesClass: 'gmenu-toggle-' + name,
		scrollTo: 0,
	};

	var menuNode = document.getElementById(name);
	var burgerNode = menuNode.getElementsByClassName( o.burgerClass )[0];
	var currentMenu;

	public.options = (function( options ) {
		for( var attrname in options ) {
			o[attrname] = options[attrname];
		}
	}( options ));

	var gmenuEvent = function gmenuEvent( event ) {
		var item = event.target;

		// if submenu toggler was clicked
		if( item.classList.contains( o.submenuClass ) ) {
			event.preventDefault() ;
				
			// if what clicked is currently active
			if ( item.classList.contains( o.activeClass ) ) {
				public.closeMenu();
			} else {
				if( item === menuNode ) {
					return 1;	
				}
				public.openMenu( item );
			}

			event.stopPropagation();
			return 1;
		}

		// if burger was clicked
		if( item === burgerNode ) {

			if( currentMenu === undefined ) {
				public.openMenu( menuNode );
			} else {
				public.closeAll();
			}

			event.stopPropagation();
			return 1;
		}
	}

	// menu argument is an element which will get .active class
	// so in top-menu it is ul, but in sub-menus it's li element
	public.openMenu = function openMenu( menu ) {
		if( menu instanceof Event || menu === undefined ) {
			menu = menuNode;
		}

		if( o.scrollTo >= 0 ) {
			window.scrollTo( 0, o.scrollTo );
		}
		menu.classList.add(o.activeClass);

		var openedSubmenus = menu.getElementsByClassName( o.activeClass );
		if( openedSubmenus.length > 0 ) {
			menu = openedSubmenus[ openedSubmenus.length - 1 ];
		}

		currentMenu = menu;
	};

	public.closeMenu = function closeMenu(  ) {
		currentMenu.classList.remove( o.activeClass );
		if( currentMenu !== menuNode ) {
			var parentMenu = currentMenu.parentNode.parentNode;
			if ( parentMenu.classList.contains( o.activeClass ) ) {
				currentMenu = currentMenu.parentNode.parentNode;
				return 1;
			}
		}

		currentMenu = undefined;
		return 0;
	};

	public.closeAll = function closeAll() {
		while( public.closeMenu() ) {}
	};

	public.addEvents = (function addEvent() {
		menuNode.addEventListener('click', gmenuEvent);
		var toggles = document.getElementsByClassName( o.togglesClass );
		for (var i = toggles.length - 1; i >= 0; i--) {
			toggles[i].addEventListener( 'click', public.openMenu );
		};
	}());

	public.removeEvents = function removeEvent() {
		menuNode.removeEventListener('click', gmenuEvent);
		var toggles = document.getElementsByClassName( o.togglesClass );
		for (var i = toggles.length - 1; i >= 0; i--) {
			toggles[i].removeEventListener( 'click', public.openMenu );
		};
	}

	return public;
}
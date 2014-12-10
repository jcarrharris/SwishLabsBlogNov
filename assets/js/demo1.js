(function() {
    var triggerBttn = document.getElementById('trigger-overlay2'),
        overlay2 = document.querySelector('div.overlay2'),
        closeBttn = overlay2.querySelector('button.overlay2-close'),
        goBttn = document.getElementsByClassName('nav-button');
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    support = {
        transitions: Modernizr.csstransitions
    };

    function toggleoverlay2() {
        if (classie.has(overlay2, 'open')) {
            classie.remove(overlay2, 'open');
            classie.add(overlay2, 'close');
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay2, 'close');
                if (!jQuery.browserMobile) {
                    $(".menu-top").slideUp(700);
                }
            };
            if (support.transitions) {
                overlay2.addEventListener(transEndEventName, onEndTransitionFn);
            } else {
                onEndTransitionFn();
            }
        } else if (!classie.has(overlay2, 'close')) {
            classie.add(overlay2, 'open');
        }
    }

    triggerBttn.addEventListener('click', toggleoverlay2);
    closeBttn.addEventListener('click', toggleoverlay2);
    for (var i = 0; i < goBttn.length; i++) {
        goBttn[i].addEventListener('click', toggleoverlay2);
    }
})();
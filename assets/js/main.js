/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a) {
    jQuery.browserMobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|playbook|silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());

require(['modernizr'], function() {

    var config = {
        addThis: {
            data_track_addressbar: true,
            pubid: 'ra-52e6a6c65bd48162', // Place your AddThis pubid between the quotes or leave empty to disable AddThis sharing
        },
        comments: {
            type: 'Disqus', // Set to either "Google+", "Disqus" or "Livefyre" to enable commenting
            token: 'swishlabs', // The shortname for Disqus or the site ID for Livefyre. Google+ is very smart and doesn't need anything
        },
        embedly: {
            key: '', // Place your Embedly API key between the quotes or leave empty to disable Embedly embeds
        },
        ga: {
            id: 'UA-45517638-1', // Place your Google Analytics ID between the quotes or leave empty to disable Google Analytics tracking
        },
        tapir: {
            token: '52fe69645c8f2a0300000002', // Place your Tapir token between the quotes or leave empty to disable search
        },
        featuredImage: true, // Set to false to disable featured images
        history: false, // Set to false to disable HTML5 history + AJAX page loading
        lightbox: true, // Set to false to disable the lightbox
        nextPost: false, // Set to false to disable next post previewing
        readingTime: true, // Set to false to disable reading time
        skrollr: {
            enabled: true, // Set to false if you want to disable Skrollr completely
            mobile: false, // Set to true if you want to enabe Skrollr on mobile devices
        },
    },
        $document = $(document),
        $window = $(window),
        $html = $('html'),
        $body = $(document.body),
        $htmlBody = $body.add($html),
        $sidebar = $('.site-sidebar'),
        $container = $('.site-container'),
        $header = $('.site-header'),
        $main = $('.site-main'),
        click = Modernizr.touch ? 'touchstart' : 'click',
        templates = $.Deferred();


    function loadCss(url) {

        var link = document.createElement('link');

        link.rel = 'stylesheet';
        link.href = url;

        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function isExternal(url) {

        var parser = document.createElement('a');

        parser.href = url;

        return location.host !== parser.host;
    }

    // navbar scroll
    var lastScrollTop = 0;
    $(document).scroll(function() {
        var docScroll = $(this).scrollTop(),
            divTop = $('.site-container').offset().top + 50;
        if (docScroll >= divTop) {
            if (docScroll >= lastScrollTop) {
                $(".menu-top").slideUp(700);
            } else {
                $(".menu-top").slideDown(700);
            }
            lastScrollTop = docScroll;
        } else {
            $(".menu-top").slideDown(700);
        }
    });
    $(document).scroll(function() {
        var docScroll = $(document).scrollTop(),
            divTop = $(".site-container").offset().top + 100;
        if (docScroll >= divTop) {
            $(".menu-top").css("background", "rgba(51,51,51,0.5)");
        } else {
            $(".menu-top").css("background", "rgba(51,51,51,0.1)");
        }
    });

    // Google Analytics

    if (config.ga.id && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {

        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', config.ga.id);
        ga('send', 'pageview');
    }



    // Search

    if (config.tapir.token) {

        require(['handlebars', 'moment', 'jquery.tapirus'], function() {

            templates.done(function($templates) {

                $sidebar.prepend($templates.filter('#search').html());

                $('.site-search-results').Tapirus(config.tapir.token, {
                    sessionStorage: Modernizr.sessionstorage,
                    templates: {
                        count: '',
                        result: $templates.filter('#search-result').html(),
                    },
                });
            });
        });
    }


    // Progressbar

    var progressbar = (function() {

        var $element = $('<div class="progressbar"></div>').appendTo(document.body);

        return {
            destroy: function() {

                $element.remove();
            },

            progress: function(progress) {

                var delay = parseFloat($element.css('transition-duration')) * 1000;

                $element
                    .removeClass('hide')
                    .width(Math.floor(progress * $body.width()));

                if (progress === 1)
                    setTimeout(function() {

                            $element.addClass('hide');

                            setTimeout(function() {

                                    $element.width(0);
                                },
                                delay);
                        },
                        delay);
            },
        }
    })();


    // History

    if (Modernizr.history && config.history) {

        $body
            .on('click', '.post-excerpt:not(.post-next)', function(event) {

                event.preventDefault();

                history.pushState({
                    pushed: true
                }, document.title, $(this).find('.post-title a').attr('href'));

                load();
            })
            .on('click', '.post-excerpt.post-next', function(event) {

                event.preventDefault();

                history.pushState(null, document.title, $(this).find('.post-title a').attr('href'));

                load('postnext');
            })
            .on('click', '.pagination a', function(event) {

                event.preventDefault();

                history.pushState(null, document.title, $(this).attr('href'));

                load('pagination' + ($(this).parent().hasClass('older') ? 'next' : 'prev'));
            })
            .on('click', '.site-nav a, .site-search-results a', function(event) {

                if (isExternal(this.href)) return;

                event.preventDefault();

                history.pushState(null, document.title, $(this).attr('href'));

                load()
                    .done(function() {

                        sidebar.position();

                        setTimeout(function() {

                                sidebar.hide();
                            },
                            200);
                    });
            });

        window.addEventListener('popstate', function(event) {

            load(null, true);
        });


        function load(type, popstate) {

            var url = location.href,
                deferred = $.Deferred();

            if (config.ga.id && typeof ga === 'function') ga('send', 'pageview', {
                'page': location.pathname,
                'title': document.title
            });

            if (!popstate) progressbar.progress(0.5);

            switch (type) {

                case 'paginationnext':

                    $.ajax(url)
                        .done(function(data) {

                            var $dummy = $('<div></div>').html(data),
                                $newContainer = $dummy.find('.site-container');

                            $body.append($newContainer)

                            $htmlBody
                                .animate({
                                    scrollTop: $newContainer.offset().top
                                }, 500)
                                .promise()
                                .done(function() {

                                    $container.remove();

                                    $container = $newContainer;

                                    $window.scrollTop(0); // Reset scroll position after removing main

                                    init();

                                    deferred.resolve();

                                    progressbar.progress(1);
                                });

                            beforeInit();
                        });

                    break;

                case 'paginationprev':

                    $.ajax(url)
                        .done(function(data) {

                            var $dummy = $('<div></div>').html(data),
                                $newContainer = $dummy.find('.site-container');

                            // $sidebar.after($newContainer);

                            $htmlBody
                                .scrollTop($container.offset().top)
                                .animate({
                                    scrollTop: 0
                                }, 1000)
                                .promise()
                                .done(function() {

                                    $container.remove();

                                    $container = $newContainer;

                                    init();

                                    deferred.resolve();

                                    progressbar.progress(1);
                                });

                            beforeInit();
                        });

                    break;

                case 'postnext':

                    var $postNext = $('.post-next'),
                        url = $postNext.find('.post-title a').attr('href');

                    $.ajax(url)
                        .done(function(data) {

                            var $dummy = $('<div></div>').html(data);

                            document.title = $dummy.find('title').html();

                            $postFull = $dummy.find('.post-full');

                            $postNext.replaceWith($postFull.addClass('loading'));

                            $htmlBody
                                .animate({
                                    scrollTop: $postFull.offset().top
                                }, 600)
                                .promise()
                                .done(function() {

                                    $('.post-full').first().remove();

                                    setTimeout(function() {

                                        $postFull.removeClass('loading');

                                    });

                                    $window.scrollTop(0);

                                    progressbar.progress(1);

                                    init();
                                });
                        });

                    break;

                default:

                    $.ajax(url)
                        .done(function(data) {

                            var $dummy = $('<div></div>').html(data),
                                $newContainer = $dummy.find('.site-container');

                            document.title = $dummy.find('title').html();

                            $container.remove();

                            $container = $newContainer;

                            $body.append($newContainer);

                            $window.scrollTop(0);

                            init();

                            deferred.resolve();

                            if (!popstate) progressbar.progress(1);
                        });
            }

            return deferred;
        }
    } else {

        $body.on('click', '.post-excerpt a', function(event) {

            event.preventDefault();

            location.href = this.href;
        });
    }


    // Skrollr

    if (config.skrollr.enabled === true && (config.skrollr.mobile === true || !(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera))) {

        require(['skrollr'], function() {

            window.Skrollr = skrollr.init({
                forceHeight: false,
            });
        });
    }


    // SS Social

    require(['ss-social']);


    // Init

    function beforeInit() {

        // Skrollr

        if (window.Skrollr) Skrollr.refresh();
    }

    function init() {

        var $postFull = $('.post-full');


        // Templates

        templates = $.Deferred();

        if (Modernizr.sessionstorage && sessionStorage.getItem('templates')) {

            templates.resolve($('<div></div>').html(sessionStorage.getItem('templates')).find('template'));
        } else {

            $.ajax('/assets/templates.html')
                .done(function(data) {

                    templates.resolve($('<div></div>').html(data).find('template'));

                    if (Modernizr.sessionstorage) sessionStorage.setItem('templates', data);
                });
        }


        // Sidebar

        if ($sidebar.length) $container.append('<div class="site-sidebar-overlay"></div>');


        // Skrollr

        if (window.Skrollr) Skrollr.refresh();


        // Prism

        if ($('pre code').length) {

            loadCss('/assets/css/prism.css');

            require(['prism'], function() {

                Prism.highlightAll();
            });
        }


        // Sharing

        if (config.addThis.pubid && $postFull.length) {

            templates.done(function($templates) {

                $postFull.find('.post-footer .sharing-icons').append($templates.filter('#share').html());

                window.addthis_config = config.addThis;

                require(['//s7.addthis.com/js/300/addthis_widget.js#pubid=' + config.addThis.pubid], function() {

                    // http://www.addthis.com/blog/2013/05/07/a-brief-history-of-using-addthis-dynamically
                    addthis.toolbox('.addthis_toolbox');
                });
            });
        }


        // Comments

        if (config.comments.type && $postFull.length && !$body.hasClass('page')) {

            templates.done(function($templates) {

                $postFull.find('.wrapper').append($templates.filter('#comments').html());

                $('.comments-toggle').on('click', function(event) {

                    event.preventDefault();

                    var element = this;

                    $(this).hide();

                    require(['comments'], function(Comments) {

                        Comments(element, config.comments.type, config.comments.token);
                    });
                });
            });
        }


        // Reading time

        if (config.readingTime) {

            function readingTime(text) {

                var totalWords = text.split(' ').length,
                    wordsPerMinute = 270;

                return Math.max(Math.round(totalWords / wordsPerMinute), 1);
            }

            $postFull.prepend('<div class="post-reading-time">' + readingTime($postFull.find('.post-content').text()) + ' min read</div>');
        }


        // Featured image

        if (config.featuredImage) {

            var $featuredImage = $('.post-full .post-content p:first-child img');

            if ($featuredImage.length) {

                $('<div class="featured-image"></div>')
                    .css('background-image', 'url(' + $featuredImage.attr('src') + ')')
                    .prependTo($postFull);
            }
        }


        // Lightbox

        if (config.lightbox) {

            $postFull
                .find('.post-content img')
                .addClass('lightbox');

            $overlay = $('<div class="lightbox-overlay hidden"></div>').appendTo($body);

            $postFull.on(click, '.lightbox', function(event) {

                event.preventDefault();

                $overlay
                    .removeClass('hidden')
                    .css('background-image', 'url(' + $(this).attr('src') + ')');

                $window.one('scroll.lightbox', function() {

                    $overlay.addClass('hidden');
                });
            });

            $overlay.on(click, function() {

                $overlay.addClass('hidden');

                $window.off('scroll.lightbox');
            });
        }


        // Embedly & FitVids

        if (config.embedly.key) {

            require(['jquery.embedly'], function() {

                // http://embed.ly/docs/tutorials/responsive
                $postFull
                    .find('.post-content p a:only-child')
                    .embedly({
                        key: config.embedly.key,
                        display: function(obj) {

                            // Overwrite the default display.
                            if (obj.type === 'video' || obj.type === 'rich') {

                                // Figure out the percent ratio for the padding. This is (height/width) * 100
                                var ratio = ((obj.height / obj.width) * 100).toPrecision(4) + '%'

                                // Wrap the embed in a responsive object div. See the CSS here!
                                var div = $('<div class="responsive-object">').css({
                                    paddingBottom: ratio
                                });

                                // Add the embed to the div.
                                div.html(obj.html);

                                // Replace the element with the div.
                                $(this).replaceWith(div);
                            }
                        }
                    });
            });
        } else {

            require(['jquery.fitvids'], function() {

                $('.post-content').fitVids();
            });
        }


        // Next post

        if (config.nextPost && $postFull.length) {

            require(['modernizr', 'handlebars', 'jquery.ghostnextpost'], function() {

                templates.done(function($templates) {

                    $postFull.GhostNextPost($templates.filter('#post-next').html());
                });
            });
        }
    }

    init();
});
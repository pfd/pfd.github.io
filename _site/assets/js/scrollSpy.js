; (function ($, window, document, undefined) {

    // Add our plugin to fn
    $.fn.extend({

        // Scrollspy is the name of the plugin
        scrollspy: function (options) {

            // Define our defaults
            var defaults = {
                namespace: 'scrollspy',
                activeClass: 'active',
                animate: false,
                duration: 1000,
                offset: 0,
                container: $( window ),
                replaceState: false
            };

            // Add any overriden options to a new object
            options = $.extend({}, defaults, options);

            // Adds two numbers together
            var add = function (ex1, ex2) {
                return parseInt(ex1, 10) + parseInt(ex2, 10);
            }

            var getHash = function(link) {
                return $(link).attr("href");
            }

            var getElementFromLink = function (links, index) {
                var link = links[index];

                // Store our has as an element
                return $(getHash(link));
            }

            // Find our elements
            var findElements = function (links) {

                // Declare our array
                var elements = [];
                var previousEl;

                // Loop through the links
                for (var i = 0; i < links.length; i++) {

                    // Get our current link
                    var element = getElementFromLink(links, i);

                    // If we have an element matching the hash
                    if (element.length > 0) {

                        if (i < links.length - 1) {
                            var top = i === 0 ? 0 : Math.floor(element.position().top),
                                bottom = Math.floor(getElementFromLink(links, i + 1).position().top); // use next element top as bottom
                        } else {
                            // last element
                            var top = Math.floor(element.position().top),
                                bottom = top + Math.floor($(options.container).height()); // use container size
                        }
                        // Add to our array
                        elements.push({ element: element, hash: getHash(links[i]), top: top, bottom: bottom });
                    }
                }

                // Return our elements
                return elements;
            };

            // Find our link from a hash
            var findLink = function (links, hash) {

                // For each link
                for (var i = 0; i < links.length; i++) {

                    // Get our current link
                    var link = $(links[i]);

                    // If our hash matches the link href
                    if (link.attr("href") === hash) {

                        // Return the link
                        return link;
                    }
                }
            };

            // Reset classes on our elements
            var resetClasses = function (links) {

                // For each link
                for (var i = 0; i < links.length; i++) {

                    // Get our current link
                    var link = $(links[i]);

                    // Remove the active class
                    link.parent().removeClass(options.activeClass);
                }
            };

            // For each scrollspy instance
            return this.each(function () {

                // Declare our global variables
                var element = this,
                    container = $(options.container);

                // Get our objects
                var links = $(element).find('a');

                // Set links
                resetClasses(links);

                // rebuild elements
                elements = findElements(links);

                var trackChanged = function(isFirstRun) {
                    // SheerID-removed section per https://sheerid.atlassian.net/browse/HD-483
                    // Prevent finding and scrolling to parent if this hash isn't part of the nav.

                    // Get the position and store in an object
                    var position = {
                        top: add(container.scrollTop(), Math.abs(options.offset)),
                        left: container.scrollLeft()
                    };

                    // Loop through our elements
                    for (var i = 0; i < elements.length; i++) {

                        // Get our current item
                        var current = elements[i];

                        // If we are within the boundaries of our element
                        if (position.top >= current.top && position.top < current.bottom) {

                            // get our element
                            var hash = current.hash;

                            // Get the link
                            link = findLink(links, hash);

                            // If we have a link
                            if (link) {
                                // If we have an onChange function
                                if (options.onChange && (scrollArea !== hash)) {

                                    // Fire our onChange function
                                    options.onChange(current.element, $(element), position);

                                    // set scrollArea
                                    scrollArea = hash;

                                }

                                // Update url
                                const currentPath = window.location.pathname + window.location.href.split(window.location.pathname)[1];
                                if (options.replaceState && !isFirstRun && currentPath !== window.location.pathname + hash) {
                                    history.replaceState( {}, '', window.location.pathname + hash )
                                }

                                // Reset the classes on all other link
                                resetClasses(links);

                                // Add our active link to our parent
                                link.parent().addClass(options.activeClass);

                                // break our loop
                                break;
                            }
                        }
                    }
                }

                // Add a listener to the window
                container.bind('scroll', function () {
                    trackChanged(false);
                });
                $( window ).on("load", function (e) {
                    trackChanged(true);
                })
            });
        }
    });
})(jQuery, window, document, undefined);

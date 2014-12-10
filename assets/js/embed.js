(function() {

		var root = this; // window object

		// trim function shim for ie8
		if (typeof String.prototype.trim !== "function") {
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, "");
			};
		}

		// do not load same code twice just use previous
		// in case multiple scripts included
		if (root.InfogramEmbed) {
			root.InfogramEmbed.load();
			return;
		}

		var InfogramEmbed = function() {
			this._cache = {};
			this._cacheWidth = {};
			this._cacheFooters = {};
			this._loading = false;
			this._eventsAdded = false;
		}

		InfogramEmbed.prototype = {
			// Looks up for script tags and loads infographics
			// that are not already loaded
			load: function() {
				var that = this;
				var scripts = this.scripts();

				for (var i = 0, l = scripts.length; i < l; i++) {
					var script = scripts[i];
					var scriptId = script.getAttribute('id');

					if (!this.isValidId(scriptId)) {
						continue;
					}

					var opts = this.parseId(scriptId);

					if (!this._cache[opts.id]) {
						this._cache[opts.id] = script;
						this.loadInfographic(script, opts);
					}
				}

				if (this._eventsAdded) {
					return;
				}

				this._eventsAdded = true;

				var docEvents = {}; // event variable for document

				docEvents.message = function(e) {
					var msgObj = e.data.split(':');

					var key = msgObj.shift();
					var val = e.data.substr(key.length + 1).trim();

					if (/^iframeLoaded/.test(key)) {
						that.processIframeLoaded(e, key, val);
						return;
					}

					if (/^iframeHeight/.test(key)) {
						that.processIframeHeight(e, key, val);
						return;
					}
				};

				this.addEvt(root, docEvents); // Add message event listener
			},

			processIframeLoaded: function(e, key, val) {
				key = key.replace('iframeLoaded', '');

				var ids = key.split('#');

				var scriptId = this.getCacheScriptId(ids);
				var script = this._cache[scriptId];

				if (!script) {
					return;
				}

				var location = this.getLocation(script.getAttribute('src'));

				var protocol = location.protocol;

				if (location.protocol === ':') {
					protocol = document.location.protocol;
				}

				// Get origin location
				var originLocation = this.getLocation(e.origin);

				processIframeHeight: function(e, key, val) {
					key = key.replace('iframeHeight', '');

					var ids = key.split('#');

					var scriptId = this.getCacheScriptId(ids);
					var script = this._cache[scriptId];

					if (!script) {
						return;
					}

					var location = this.getLocation(script.getAttribute('src'));

					var protocol = location.protocol;

					if (location.protocol === ':') {
						protocol = document.location.protocol;
					}

					var iframe = script.nextSibling;

					// Remove the preload image
					// img.parentNode.removeChild(img);

					// Set the iframe size
					iframe.style.height = val + 'px';

					// Set the old size back
					iframe.style.width = this._cacheWidth[scriptId];

					// Show the iframe
					iframe.style.left = '';
					iframe.style.position = '';
				},

				getCacheScriptId: function(ids) {
					if (!ids.length) {
						return;
					}

					for (var i = 0, l = ids.length; i < l; i++) {
						var id = ids[i];
						if (this._cache[id]) {
							return id;
						}
					}
				},

				// Load infographic with its options
				loadInfographic: function(elem, opts) {
					var that = this;
					var location = this.getLocation(elem.getAttribute('src'));
					var loaded = false;
					var protocol = location.protocol;
					var regPercent = new RegExp(/^[0-9]+%$/i);
					if (location.protocol === ':') {
						protocol = document.location.protocol;
					}


					var iframe = this.createIframe(opts.width);

					var oldWidth = this._cacheWidth[opts.id] = iframe.style.width;

					// var img = this.createImage('http://infogram.local/infogram.png');

					var events = {}; // event variable for iframe

					events.load = function() {
						// Remove event from iframe
						that.removeEvt(iframe, events);

						// IE8 load event bug
						if (loaded) {
							return;
						}

						// In case of 100% width get parent width
						if (regPercent.test(oldWidth)) {
							var percent = parseInt(oldWidth, 10) * 0.01;
							var parent = iframe.parentNode;
							iframe.style.width = parseInt(parent.offsetWidth * percent, 10) + 'px';

							// If size to 100% check for window resize
							var oldParentWidth = parent.offsetWidth;

							var resizeEvts = {};

							resizeEvts.resize = function() {
								if (oldParentWidth === parent.offsetWidth) {
									return;
								}

								oldParentWidth = parent.offsetWidth;

								that.iframeResizeContents(iframe, iframe.offsetWidth, protocol + '//' + location.hostname);
							};

							that.addEvt(root, resizeEvts);
						}

						// Move the iframe to far left so it is not visibile
						iframe.style.position = 'absolute';
						iframe.style.left = '-10000px';

						// Safari and Opera need a kick-start.
						iframe.src = '';
						iframe.src = url;

						// IE load event bug fix
						loaded = true;
					};

					this.addEvt(iframe, events); // Add iframe load event

					// this.addAfter(elem, img); // Place image after script
					this.addAfter(elem, iframe); // Place iframe after script
				},

				// Resize all infogram iframe contents by its parent size
				resizeAllInfographicsByParent: function() {
					for (var sIndex in this._cache) {
						var script = this._cache[sIndex];
						var iframe = script.nextSibling;

						var location = this.getLocation(iframe.getAttribute('src'));
						var protocol = location.protocol;

						if (location.protocol === ':') {
							protocol = document.location.protocol;
						}

						this.iframeResizeContents(iframe, iframe.parentNode.offsetWidth, protocol + '//' + location.hostname);
					}
				},

				// Resize iframe contents providing host
				iframeResizeContents: function(iframe, width, host) {
					iframe.contentWindow.postMessage(
						'iframeWidth:' + width,
						host
					);
				},

				// Create an iframe
				createIframe: function(width) {
					width = parseInt(width, 10);

					// if width is 0 then assign 100%
					width = width ? width + 'px' : '100%';

					var iframe = document.createElement('IFRAME');
					iframe.style.border = 'none';
					iframe.setAttribute('scrolling', 'no');
					iframe.setAttribute('frameborder', '0');

					iframe.style.width = width;

					return iframe;
				},

				createFooter: function(width, url) {
					width = parseInt(width, 10);

					// if width is 0 then assign 100%
					width = width ? width + 'px' : '100%';

					var footer = document.createElement('DIV');
					footer.style.width = width;
					footer.style.borderTop = '1px solid #acacac';
					footer.style.paddingTop = '3px';
					footer.style.fontFamily = 'Arial';
					footer.style.fontSize = '10px';
					footer.style.textAlign = 'center';

					return footer;
				},

				createLink: function(text, url) {
					var link = document.createElement('A');
					link.target = '_blank';
					link.href = url;
					link.style.color = '#acacac';
					link.style.textDecoration = 'none';

					var textProp = ('innerText' in link) ? 'innerText' : 'textContent';

					link[textProp] = text;

					return link;
				},

				// Create an image with src as parameter
				createImage: function(src) {
					var img = document.createElement('IMG');
					img.setAttribute('border', 0);
					img.setAttribute('alt', 'Loading infographic');
					img.src = src;

					return img;
				},

				// Return A element from which we can get host parameters
				getLocation: function(href) {
					var l = document.createElement("A");
					l.href = href;
					return l;
				},

				// Add event helper function
				addEvt: function(el, events) {
					for (var type in events) {
						var func = events[type];
						if (el.addEventListener) {
							el.addEventListener(type, func, false);
						} else if (el.attachEvent) {
							// Pass global element as parameter
							el.attachEvent('on' + type, this.bind(el, func, root.event));
						} else {
							el['on' + type] = func;
						}
					}
				},

				// Remove event helper function
				removeEvt: function(el, events) {
					for (var type in events) {
						var func = events[type];
						if (el.removeEventListener) {
							el.removeEventListener(type, func, false);
						} else if (el.detachEvent) {
							el.detachEvent('on' + type, func);
						} else {
							el['on' + type] = false;
						}
					}
				},

				// Bind helper function
				bind: function(obj, fn) {
					return function() {
						return fn.apply(obj, arguments);
					};
				},

				// Adds an elem after afterElem in dom tree
				addAfter: function(afterElem, elem) {
					afterElem.parentNode.insertBefore(elem, afterElem.nextSibling);
				},

				// Return all script tags from document
				scripts: function() {
					return document.getElementsByTagName('script');
				},

				// Check if id is valid
				isValidId: function(id) {
					return (/^infogram_[0-9]+_[\w\-]{16,}$/i.test(id));
				},

				// Turn script id into object of infographic id and width
				parseId: function(id) {
					var parts = id.split('_');
					parts.shift(); // remove the infogram string
					var w = parts.shift(); // get the width 
					return {
						'width': w,
						'id': parts.join('_')
					};
				}
			};

			root.InfogramEmbed = new InfogramEmbed();
			root.InfogramEmbed.load();

		}).call(this);
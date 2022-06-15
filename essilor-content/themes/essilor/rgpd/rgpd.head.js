// Create a method to store any service parameters until script is loaded and ready

window.rgpd = {

    // Public methods

    /**
     * Save parameters that never change like ID_KEYS
     *
     * @param serviceName : String, name of rgpd service example 'doubleclick'
     * @param options : Object, key/values of parameters
     *
     * example : rgpd.registerUniqueParams( 'xiti', { xtsd: 'http://logi242', xtsite: '496289' } );
     *
     */
    setup: function(serviceName, options) {
        // Save options
        if (options) {
            rgpd.config[serviceName] = rgpd.config[serviceName] || {
                setup: {},
                init: [],
                actions: []
            };
            for (var prop in options) {
                rgpd.config[serviceName].setup[prop] = options[prop];
            }
        }
        // Register job
        tarteaucitron.job = tarteaucitron.job || [];
        tarteaucitron.job.push(serviceName);
    },

    /**
     * Register a service to be enabled if @param method is null
     * else Register an action to be executed
     *
     * @param serviceName : String, name of rgpd service example 'doubleclick'
     * @param method : String or null, method to call (ex: 'send' for ga.send() ) or 'null' if simple service embed
     * @param params : Object or Array, parameters for the @method or for the embed function
     * @param delay : Number, delay of execution
     *
     * example > Analytics send event after 60s :
     *     rgpd.addAction( "analytics", 'send', [ 'event', 'Temps_Passe_Videos', '1 Minute' ], 60000 );
     *
     * example > Simple Xiti embed :
     *      rgpd.addAction( 'xiti', null, { xtn2: "1", xtpage: "Decouvrir::La_Marine_pourquoi pas" }, null );
     *
     */
    addAction: function(serviceName, method, params, delay) {

        // console.log( ' Window.rgpd.addAction() ', serviceName, method, params, delay );

        var action = {
            delay: delay || null,
            method: method || null,
            params: params || null
        };

        //

        rgpd.config[serviceName] = rgpd.config[serviceName] || {
            setup: {},
            init: [],
            actions: []
        };

        if (rgpd.config[serviceName].started) {
            rgpd.executeAction(serviceName, action);
        } else {

            if (method) {
                rgpd.config[serviceName].actions.push(action);
            } else {
                rgpd.config[serviceName].init.push(action);
            }
        }

        // console.log('  rgpd.config[ serviceName ] : ',  rgpd.config[ serviceName ] );

    },

    // Internal properties

    /**
     * Data stored for all services
     *
     * Example for GA (old version )
     *
     config = {
      analytics: {
        setup: {
          key: 'UA-22042377-1'
        },
        init: [
          {
            delay: null,
            method: null,
            params: null]
            setup: {
              key: 'UA-22042377-1'
            }
          }
        ],
        actions: [
          {
            delay: null,
            method: 'send',
            params: [ 'pageview' ]
            setup: {
              key: 'UA-22042377-1'
            }
          },
          {
            delay: 1000,
            method: 'send',
            params: [ 'event', 'La Marine Recrute', 'Candidature' ],
            setup: {
              key: 'UA-22042377-1'
            }
          }
        ]
      }
    };

     *
     */
    config: {},

    /**
     * execute an ACTION when service is enabled
     *
     * @param serviceName
     * @param action
     */
    executeAction: function(serviceName, action) {

        var callback = rgpd.config[serviceName].callback;
        if (callback) {

            // Copy setup params into action
            action.setup = rgpd.config[serviceName].setup;

            // Execute callback
            if (!action.delay) {
                callback(action)
            } else {
                setTimeout(
                    function() {
                        callback(action)
                    }, parseInt(action.delay));
            }
        }

    },

    /**
     * start : start service if authorized
     *
     * 1 - Execute setup functions if needed
     *
     * 2 - execute init (actions)
     *
     * 3 -  execute actions
     *
     * @param serviceName
     * @param callback method to handle each action
     */
    start: function(serviceName, callback) {

        // console.log(' serviceName : ', serviceName, callback );

        rgpd.config[serviceName].started = true;
        rgpd.config[serviceName].callback = callback;

        var setup = rgpd.config[serviceName].setup;

        // 1 - Execute LAUNCH functions if needed
        for (var prop in setup) {
            if (prop === 'launch' && setup[prop] instanceof Function) {
                // execute if it is a function
                setup[prop]();
                // clear after
                delete setup[prop];
            }
        }

        // 2 -  execute init queue
        for (var i = 0, len = rgpd.config[serviceName].init.length; i < len; i++) {
            rgpd.executeAction(serviceName, rgpd.config[serviceName].init[i]);
        }

        // 3 -  execute actions queue
        for (var i = 0, len = rgpd.config[serviceName].actions.length; i < len; i++) {
            rgpd.executeAction(serviceName, rgpd.config[serviceName].actions[i]);
        }

    },

    /** Keep aspect ratio **/
    adjustPlaceholders: function(className) {

        // create styleSheet
        var style = document.createElement('style');
        var selector = '.' + className;
        // Limit iframe and div width
        style.innerHTML += selector + '{ position: relative; }';
        style.innerHTML += selector + ' .tac_activate { position: absolute;top: 0;left: 0;right: 0;bottom: 0; }';
        style.innerHTML += selector + ' iframe{ max-width: 100% !important; max-height: 100%; margin: auto; position: absolute;top: 0;left: 0;right: 0;bottom: 0; }';
        style.appendChild(document.createTextNode("")); //WebKit Hack
        document.head.appendChild(style);

        var divList = document.getElementsByClassName(className);
        for (i = 0; i < divList.length; i++) {
            var div = divList[i];

            // find Iframe id key
            var allowBtn = div.getElementsByClassName('tarteaucitronAllow');
            if (allowBtn.length) {
                var idKey = allowBtn[0].getAttribute('id');
                div.setAttribute('data-id', idKey);
            }

            // max-width and ratio
            var height = div.getAttribute('height');
            var width = div.getAttribute('width');
            var paddingBottom = (height / width) * 100 + '%';
            div.style.maxWidth = width + 'px';
            var paddingDiv = document.createElement('div');
            paddingDiv.innerHTML = '<div class="adjust-ratio" style="padding-bottom: ' + paddingBottom + '"></div>';
            div.insertBefore(paddingDiv, div.childNodes[0]);
        }
    }

};
// - - - - - - - - - - - -  DEFINE CUSTOM SERVICES  - - - - - - - - - - - - //

/*
 YOUTUBE in IFRAME
 */
// Define method to create and manage this service
tarteaucitron.services.ytIframe = {
    key: 'ytIframe',
    type: 'video',
    name: 'YouTube',
    uri: 'https://www.google.fr/intl/fr/policies/privacy/',
    needConsent: true,
    cookies: ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    js: function() {

        tarteaucitron.fallback(['yt_iframe'], function(x) {
            var width = x.getAttribute('width');
            var height = x.getAttribute('height');
            var url = x.getAttribute('data-url');
            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
        // create styles + size + aspect ratio
        rgpd.adjustPlaceholders('yt_iframe');

    },
    fallback: function() {

        var id = 'ytIframe';
        tarteaucitron.fallback(['yt_iframe'], function(elem) {
            return tarteaucitron.engage(id);
        });
        // create styles + size + aspect ratio
        rgpd.adjustPlaceholders('yt_iframe');
    }
};
// Register service for this page with static parameters
rgpd.setup('ytIframe', null);


/*
 GOOGLE ANALYTICS  ( ga() )
*/
// Define method to create and manage this service
tarteaucitron.services.analytics = {
    key: 'analytics',
    type: 'analytic',
    name: 'Google Analytics',
    uri: 'https://support.google.com/analytics/answer/6004245',
    needConsent: true,
    cookies: ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'],
    js: function() {
        // Init service with callback method for each queued action
        rgpd.start(
            'analytics',
            function(action) {

                if (action.method) {
                    // Custom methods ex: ga('send', ... );
                    var args = [action.method];
                    if (action.params && action.params.length) {
                        args = args.concat(action.params)
                    }
                    window.ga.apply(null, args);
                } else {
                    // EMBED : Default Service integration
                    window.ga = window.ga || function() {
                        (ga.q = ga.q || []).push(arguments)
                    };
                    ga.l = +new Date;
                    ga('create', action.setup.analyticsUa, 'auto');
                    ga('send', 'pageview');
                    tarteaucitron.addScript('//www.google-analytics.com/analytics.js');
                }
            }
        );
    }
};
// Register service for this page with static parameters
rgpd.setup('analytics', {
    analyticsUa: 'UA-30375563-13',
    launch: function() {
        // Embed api
        rgpd.addAction('analytics', null, null, null);
        // call ga require method
        rgpd.addAction('analytics', 'require', ['displayfeatures'], null);
    }
});
// Action example added with 2 seconds delay
rgpd.addAction('analytics', 'send', ['pageview'], 2000);



/*
 GOOGLE CSE
 */
// Define method to create and manage this service
tarteaucitron.services.cse = {
    key: 'cse',
    type: 'other',
    name: 'Google CSE - Moteur de recherche',
    uri: 'https://www.google.fr/intl/fr/policies/privacy/',
    needConsent: true,
    cookies: ['1P_JAR'],
    js: function() {



        var cx = '000819931870495583934:mhmggi-6zn8'; // Insert your own Custom Search engine ID here  HDF : 007902762219686373644:qdz1k0bashc / Essilor : 000819931870495583934:mhmggi-6zn8
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);

    },
    fallback: function() {

    }
};
// Register service for this page with static parameters
rgpd.setup('cse', null);



// google maps
tarteaucitron.services.googlemaps = {
    "key": "googlemaps",
    "type": "api",
    "name": "Google Maps",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "cookies": [],
    "js": function() {

        $(".googlemaps-canvas").each((i, element) => {
            const el = $(element);
            el.empty();
            const url = el.attr("data-url");
            const iframe = $("<iframe />")
            iframe.attr("src", url)
            iframe.attr("width", "100%")
            iframe.attr("height", "100%")
            iframe.attr("target", "ifrm");
            iframe.attr("id", "ifrm");
            iframe.attr("name", "ifrm");
            iframe.attr("title", "Google job map");
            iframe.attr("allowfullscreen", "");
            iframe.attr("frameborder", "0");
            iframe.attr("scrolling", "no");
            el.append(iframe);
        })
    },
    "fallback": function() {
        "use strict";
        var id = 'googlemaps';
        tarteaucitron.fallback(['googlemaps-canvas'], tarteaucitron.engage(id));
    }
};
// Register service for this page with static parameters
rgpd.setup('googlemaps', null);





// - - - - - - - - - - - - INITIALISATION - - - - - - - - - - - - //
tarteaucitron.init({
    hashtag: '#popin-cookies',
    /* Ouverture automatique du panel avec le hashtag href='#popin-cookies'  */
    orientation: 'bottom',
    /* le bandeau doit être en haut (top) ou en bas (bottom) ? */
    adblocker: false,
    /* Afficher un message si un adblocker est détecté */
    showAlertSmall: false,
    /* afficher le petit bandeau en bas à droite ? */
    cookieslist: false,
    /* Afficher la liste des cookies installés ? */
    groupServices: false,
    /* Regrouper les services du même type ( 1 seul bouton pour tous ) ? */
    acceptOnScroll: false,
    /* Accepter automatiquement en scrollant */
    acceptOnNav: false /* Accepter automatiquement en naviguant */
});
// Get last script url ( = this one )
var scripts = document.getElementsByTagName('script'),
    scriptPath = scripts[scripts.length - 1].src.split('?')[0],
    scriptPath = scriptPath.split('/').slice(0, -1).join('/') + '/';


var insertScript = function(src, callback, target) {

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function() {
        // remote script has loaded
        callback && callback();
    };
    script.src = src;

    document.getElementsByTagName('body')[0].appendChild(script);

};


insertScript(
    // Insert main script
    scriptPath + 'tarteaucitron.js',
    // Then on callback insert custom configuration script
    function() {
        insertScript(scriptPath + 'customise/rgpd.custom.js');
    }
);
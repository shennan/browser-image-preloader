(function () {

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this; 

  if (typeof module !== 'undefined' && module.exports)
    module.exports = factory;
  else
    root.browserImagePreloader = factory;

  function factory (urls) {

    return new BrowserImagePreloader(typeof urls == 'string' ? arguments : urls);

  }

  function BrowserImagePreloader (urls) {

    if (!Image)
      throw Error('BrowserImagePreloader: cannot find the Image object');

    var self = this;
    var timeout = 10000;
    var count = urls.length;
    var fallback = setTimeout(done, timeout);

    self.done = function (cb) {

      if (typeof cb == 'function')
        done = cb;

      return self;

    }

    self.loaded = function (cb) {

      if (typeof cb == 'function')
        loaded = cb;

      return self;

    }

    self.load = load;

    function load () {

      for(var i = 0; i < urls.length; i++){

        var img = new Image();

        var cb = function (img) {

          return function () {

            count--;

            var percent = Number( ( (urls.length - count) / urls.length).toFixed(2) );
            
            loaded(img, percent);

            if(count < 1){
              
              done();

            }
          }
        }(img);
          
        img.onload = cb;

        img.src = urls[i];

        if(img.complete){

          cb();

        }
      }
    }

    function done () {}

    function loaded () {}

    return self;

  }
})();
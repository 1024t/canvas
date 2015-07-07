var requestNextAnimationFrame =
   (function () {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      if (window.webkitRequestAnimationFrame) {
         wrapper = function (time) {
           if (time === undefined) {
              time = +new Date();
           }
           self.callback(time);
         };
         originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    

         window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;
            originalWebkitRequestAnimationFrame(wrapper, element);
         }
      }

      if (window.mozRequestAnimationFrame) {
         index = userAgent.indexOf('rv:');
         if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);

            if (geckoVersion === '2.0') {
               window.mozRequestAnimationFrame = undefined;
            }
         }
      }
      
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||

         function (callback, element) {
            var start,
                finish;

            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
// (function() {
//     var lastTime = 0;
//     var vendors = ['ms', 'moz', 'webkit', 'o'];
//     for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//         window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//         window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
//     }
//     if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
//         var currTime = new Date().getTime();
//         var timeToCall = Math.max(0, 16 - (currTime - lastTime));
//         var id = window.setTimeout(function() {
//             callback(currTime + timeToCall);
//         }, timeToCall);
//         lastTime = currTime + timeToCall;
//         return id;
//     };
//     if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
//         clearTimeout(id);
//     };
// }());
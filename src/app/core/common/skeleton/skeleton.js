function preload() {
    var preloadFalse = $(".preloadFalse");
    var preloadTrue = $(".preloadTrue");
  
    if (preloadFalse.length > 0) {
      preloadFalse.each(function (i) {
        var el = $(this);
  
        $(el).ready(function () {
          $(preloadTrue[i]).delay(3000).fadeOut();
          $(el).animate({ opacity: 1, height: "auto" }, 3000);

          setTimeout(() => {
            $(preloadTrue[i]).remove();
          }, 3000);
        });
      });
    }
  }
  
  preload();
  
window._faceless = {
  track: function(img) {
    console.log("TRACKING IMG", img.src);
    if (img.width <= 0 || img.height <= 0) {
      console.log("SKIPPING IMG", img);
      return;
    }

    // we copy the image to a smaller one:
    smallImg = $(img).clone();

    if (smallImg[0].width > smallImg[0].height) {
      if (smallImg[0].width < 256) {
        smallImg.attr('width', 256)
        smallImg.attr('height', "auto");
      }

    } else {
      if (smallImg[0].height < 256) {
        smallImg.attr('width', "auto");
        smallImg.attr('height', 256)
      }

    }

    var tracker = new tracking.ObjectTracker(['face', 'eye']);
    tracker.setStepSize(1);

    try {
      tracking.track(smallImg[0], tracker);
    } catch(e) {
      console.log("EXC", e);

      return;
    }

    tracker.on('track', function(event) {
      if (event.data && event.data.length) {
        console.log("TRACKED", JSON.stringify(event));
        $(img).css("opacity", 0.03);
      }

    });
  },
  find_faces: function(els) {
    tracked = {};
    function track_faces() {
      $("img").each(function() {
        if (!this.complete) { return; }
        if (tracked[this.src]) { return; }

        tracked[this.src] = true;
        _faceless.track(this);
      });

      return true;
    }

    setInterval(track_faces, 300);

  },
}

$(function() {
  _faceless.find_faces();
});

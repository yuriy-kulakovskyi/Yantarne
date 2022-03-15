let instance = this;

// jQuery hack to implement a CSS disable function for elements
jQuery.fn.extend({
  disable: function (state) {
    return this.each(function () {
      let $this = $(this);
      if ($this.is('input, button, textarea, select')) {
        this.disabled = state;
      } else {
        $this.toggleClass('disabled', state);
      }
    });
  }
});

$(document).ready(function () {
  // Initialize shoutcast client
  instance.client = $.SHOUTcast({
    host: 'listen.codebucket.de',
    port: 8000,
    stream: 1,
    interval: 5000,
    stats: updateStats
  });

  // Start fetching stats
  client.startStats();

  // Setup volume slider using bootstrap-slider
  $('#volume').slider({
    value: 100,
    formatter: function (value) {
      return value + '%';
    }
  }).on("slide", function (ev) {
    music.volume = ev.value / 100;
  });

  const sources = ["https://c28.radioboss.fm:18346/stream"];

  let playing = false; // stream status
  let music = null;

  function loadStream() {
    if (playing && music !== null) {
      destroyStream();
    }
    music = new Audio();
    music.src = sources[0];
    music.load();
    music.play();
    playing = true;
  }

  function destroyStream() {
    music.pause(); 
    music.src = "";
    playing = false;
  }

  // Play/Pause audio player
  let c = 0;
  $('#play').click(function () {
    if (c === 0) {
      loadStream();
      $(this).find('i').removeClass("fa-play");
      $(this).find('i').addClass("fa-pause");
      c = 1;
    } else if (c === 1) {
      destroyStream();
      $(this).find('i').removeClass("fa-pause");
      $(this).find('i').addClass("fa-play");
      c = 0;
    }
  });
});

this.updateStats = function () {
  // Update stream information
  $('#listeners').text(this.get('currentlisteners'));
  $('#message').text("New playlist is finally working. Enjoy!");

  // Check if songtitle has changed
  let songtitle = this.get('songtitle');
  if (songtitle != $('#songtitle').text()) {
    $('#songtitle').text(songtitle);

    // Parse meta from songtitle
    let data = getMetadata(songtitle);
    $('#artist').text(data.artist);
    $('#title').text(data.title);

    // Set cover if found
    let cover = data.cover;
    if (cover != $('#cover').attr('src')) {
      $('#cover').attr('src', cover);
    }
  }

  // For later use
  instance.stats = this;
};

this.getMetadata = function (songtitle) {
  // Result to return, containing needed info for the player
  let info = { artist: "Artist", title: "Title", cover: "/artwork.jpg" };

  // Check if songtitle is matching our regex
  let reg = /\s* - \s*/g;
  if (reg.test(songtitle)) {
    // Find our matches
    let reg = /(.*) - (.*)/g;
    let arr = reg.exec(songtitle);

    // Set extracted meta
    info.artist = arr[1];
    info.title = arr[2];
    info.cover = "http://coverart.codebucket.de/api/v1/track/" + info.artist + "/" + info.title + ".jpg";
  }

  // Return results
  return info;
};

$('#showList').click(function () {
  $('.recently').css('display', 'block');
  $('.navbar').css('filter', 'blur(5px)');
  $(".partners").css('filter', 'blur(5px)');
  $('.footer').css('filter', 'blur(5px)');
  $('#heading').css('color', 'transparent');
  $('.bgRed').css('color', 'transparent');

  $("#close").click(function () {
    $('.recently').css('display', 'none');
    $('.navbar').css('filter', 'blur(0)');
    $(".partners").css('filter', 'blur(0)');
    $('.footer').css('filter', 'blur(0)');
    $('#heading').css('color', '#fff');
    $('.bgRed').css('color', 'red');
  });
});

$("#address").click(function() {
  $('.address__info').css('display', 'flex');
  $('.navbar').css('filter', 'blur(5px)');
  $(".partners").css('filter', 'blur(5px)');
  $('.footer').css('filter', 'blur(5px)');
  $('#heading').css('color', 'transparent');
  $('.bgRed').css('color', 'transparent');

  $("#close1").click(function () {
    $('.address__info').css('display', 'none');
    $('.navbar').css('filter', 'blur(0)');
    $(".partners").css('filter', 'blur(0)');
    $('.footer').css('filter', 'blur(0)');
    $('#heading').css('color', '#fff');
    $('.bgRed').css('color', 'red');
  });
});

$("#phoneNumber").click(function() {
  $('.phone__info').css('display', 'flex');
  $('.navbar').css('filter', 'blur(5px)');
  $(".partners").css('filter', 'blur(5px)');
  $('.footer').css('filter', 'blur(5px)');
  $('#heading').css('color', 'transparent');
  $('.bgRed').css('color', 'transparent');

  $("#close2").click(function () {
    $('.phone__info').css('display', 'none');
    $('.navbar').css('filter', 'blur(0)');
    $(".partners").css('filter', 'blur(0)');
    $('.footer').css('filter', 'blur(0)');
    $('#heading').css('color', '#fff');
    $('.bgRed').css('color', 'red');
  });
});

$("#location").click(function() {
  $('.location__info').css('display', 'flex');
  $('.navbar').css('filter', 'blur(5px)');
  $(".partners").css('filter', 'blur(5px)');
  $('.footer').css('filter', 'blur(5px)');
  $('#heading').css('color', 'transparent');
  $('.bgRed').css('color', 'transparent');

  $("#close3").click(function () {
    $('.location__info').css('display', 'none');
    $('.navbar').css('filter', 'blur(0)');
    $(".partners").css('filter', 'blur(0)');
    $('.footer').css('filter', 'blur(0)');
    $('#heading').css('color', '#fff');
    $('.bgRed').css('color', 'red');
  });
});
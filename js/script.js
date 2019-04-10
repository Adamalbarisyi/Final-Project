$(document).ready(function () {
    // Activate Carousel
    $("#myCarousel").carousel();

    // Enable Carousel Indicators
    $(".item1").click(function () {
      $("#myCarousel").carousel(0);
    });
    $(".item2").click(function () {
      $("#myCarousel").carousel(1);
    });
    $(".item3").click(function () {
      $("#myCarousel").carousel(2);
    });

    // Enable Carousel Controls
    $(".carousel-control-prev").click(function () {
      $("#myCarousel").carousel("prev");
    });
    $(".carousel-control-next").click(function () {
      $("#myCarousel").carousel("next");
    });
  });



    function tampilYoutube() {
      $.get("https://www.googleapis.com/youtube/v3/channels", {
        part: 'snippet,statistics',
        id: 'UCOvke9xmkIZCjWiZxOrcoVA',
        key: 'AIzaSyD359WbHRHyOO9TQJwh4v2kDSzpvZJXx2M'
      },
        function (data) {
          $.each(data.items, function (i, item) {
            // console.log(item); //1data
            profilId = item.snippet.thumbnails.medium.url;
            chanelName = item.snippet.title;
            subscribers = item.statistics.subscriberCount;
            $('#youtube').append(`
                <div class="col-md-4">
                  <img src=`+ profilId + ` width="100" class="rounded-circle img-thumbnail">
                </div>
                <div class="col-md-8">
                  <h5>`+ chanelName + `</h5>
                    <p> `+ subscribers + ` Subscribers</p>
                  <div class="g-ytsubscribe" data-channelid="UCOvke9xmkIZCjWiZxOrcoVA" data-layout="default" data-count="default"></div>
                </div>        
             `);
          })
        }

      )

    }
    function tampilLastVideo() {
      $.get("https://www.googleapis.com/youtube/v3/search", {
        key: 'AIzaSyD359WbHRHyOO9TQJwh4v2kDSzpvZJXx2M',
        channelId: 'UCOvke9xmkIZCjWiZxOrcoVA',
        maxResult: '0',
        order: 'date',
        part: 'snippet'
      },
        function (data) {
          $.each(data.items, function (i, item) {
            console .log(item); //2data
            latestVideoId = item.id.videoId;
            $('#lastvideo').append(`
            <div class="col">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/`+ latestVideoId + `?rel=0"
                  allowfullscreen></iframe>
              </div>
            </div>
          `);
          })
        }
      )
    }


  function tampilInstagram() {
    var token = '2057839016.5eac323.19f5d49d52854322982e0bd567d5ea59',
      container2 = document.getElementById('instagram'),
      scrElement2 = document.createElement('script');

    window.mishaProcessResult2 = function (response) {
      container2.innerHTML = 
        '<div class="col-md-4">'
             + '<img src="' + response.data.profile_picture + '" width="100" class="rounded-circle img-thumbnail">'
             + '</div>'
           + '<div class="col-md-8">'
            + '<h5>' + response.data.username + '</h5>'
                 + '<p>' + response.data.counts.followed_by + ' followers </p>'
          + '</div>'

      }

    scrElement2.setAttribute('src', 'https://api.instagram.com/v1/users/self?access_token=' + token + '&callback=mishaProcessResult2');
    document.body.appendChild(scrElement2);
  }

  function tampilFoto() {
    var token = '2057839016.5eac323.19f5d49d52854322982e0bd567d5ea59',
      num_photos = 16, // maximum 20
      container = document.getElementById('foto'), // it is our <ul id="rudr_instafeed">
      scrElement = document.createElement('script');

    window.mishaProcessResult = function (data) {
      console.log(data);
      for (x in data.data) {
        container.innerHTML += `
        
        <li><img src="` + data.data[x].images.low_resolution.url + `"></li>`
         
      }
    }

    scrElement.setAttribute('src', 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + num_photos + '&callback=mishaProcessResult');
    document.body.appendChild(scrElement);
  }
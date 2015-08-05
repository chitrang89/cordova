document.addEventListener('deviceready',function() {
    var lock = new Auth0Lock(
      // All these properties are set in auth0-variables.js
      AUTH0_CLIENT_ID,
      AUTH0_DOMAIN
    );

    var userProfile;

    $('.btn-login').click(function(e) {
      e.preventDefault();
      lock.show(function(err, profile, token) {
        if (err) {
          // Error callback
          console.log("There was an error");
          alert("There was an error logging in");
        } else {
          // Success calback

          // Save the JWT token.
          localStorage.setItem('userToken', token);
            
            /*var response = $.ajax({
                url: 'http://testczapi.azurewebsites.net/api/secured/ping',
                method: 'GET',
                success: function(resp) {
                    $('#display-stuff').text(resp);
                }
            });*/
            
            
            
            
            
          // Save the profile
          userProfile = profile;

          $('.login-box').hide();
          $('.logged-in-box').show();
          $('.nickname').text(profile.nickname);
          $('.nickname').text(profile.name);
          $('.avatar').attr('src', profile.picture);
        }
      });
    });

    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
                'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });

    $('.btn-auth').click(function(e) {
      // Just call your API here. The header will be sent
      $.ajax({
        url: 'http://testczapi.azurewebsites.net/api/secured/ping',
        method: 'GET'
      }).then(function(data, textStatus, jqXHR) {
        $('#display-stuff').text(data);
      }, function() {
        alert("You need to download the server seed and start it to call this API");
      });
    })
    
    $('.btn-unauth').click(function(e) {
      // Just call your API here. The header will be sent
      $.ajax({
        url: 'http://testczapi.azurewebsites.net/api/ping',
        method: 'GET'
      }).then(function(data, textStatus, jqXHR) {
        $('#display-stuff').text(data);
      }, function() {
        alert("You need to download the server seed and start it to call this API");
      });
    })


}, false);

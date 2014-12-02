'use strict';

/**
 * @ngdoc service
 * @name applebeesApp.Spotify
 * @description Wrapper for the Spotify Web API
 * @requires $http
 */
angular.module('applebeesApp')
  .factory('Spotify', function ($http) {

    var apiUrl = 'https://api.spotify.com/v1/';
    var formTrackSearchUrl = function(artist, track) {
      // Spotify search filtering is broken :(
      //var qs = 'type=track&q=artist:'+encodeURIComponent(artist)+'+'+'track='+encodeURIComponent(track);

      // This will have to do
      var qs = 'type=track&q='+ encodeURIComponent(artist) + ' ' +encodeURIComponent(track);
      return apiUrl + 'search?' + qs + '&limit=1';
    };

    // Public API here
    return {
      getTrackId: function (artist, track) {
        var url = formTrackSearchUrl(artist, track);
        return $http.get(url).then(function(res) {
          return (res.data.tracks && res.data.tracks.items.length > 0) ? res.data.tracks.items[0].id : '';
        });
      }
    };
  });

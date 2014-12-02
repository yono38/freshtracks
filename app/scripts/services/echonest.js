'use strict';

/**
 * @ngdoc service
 * @name applebeesApp.Playlist
 * @description Wrapper for the Echonest API
 * @requires $http
 * @requires $q
 */
angular.module('applebeesApp')
  .factory('Echonest', function ($http, $q) {

    var apiPath = 'http://developer.echonest.com/api/v4/',
      apiKey = 'ZYUBZ2CI4SAEPVHYL';
    
    var getArtistPlaylistUrl = function(artist) {
        var limit = 8;
        if (!artist) {
          throw new Error('Invalid artist name!');
        }
        var qs = 'playlist/basic?api_key='+ apiKey +'&format=json&results='+ limit +'&type=artist-radio&artist=';
        // 
        qs = qs += artist.split(' ').join('+');
        return apiPath + qs;
    };

    var getPlaylistByArtist = function (artist) {
        var apiUrl, deferred, echonestCall;
        deferred = $q.defer();

        try {
          apiUrl = getArtistPlaylistUrl(artist);
        } catch(err) {
            deferred.reject({err: err.toString()});
            return deferred.promise;
        }

        echonestCall = $http.get(apiUrl);
        echonestCall.then(function(res) {
          if (res.status !== 200) {
            deferred.reject({err: 'API call failed!'});
          } else if (res.data.response.status.code !== 0) {
            deferred.reject({err: res.status.message});
          } else {
            var songs = res.data.response.songs;
            var formattedSongs = songs.map(function(song) {
              return {
                track: song.title,
                artist: song.artist_name
              };
            });
            deferred.resolve({songs: formattedSongs});
          }
        });
        
        return deferred.promise;
    };

    // Public API here
    return {
      getPlaylistByArtist: getPlaylistByArtist 
    };
  });

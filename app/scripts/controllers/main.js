'use strict';

/**
 * @ngdoc function
 * @name applebeesApp.controller:MainCtrl
 * @description Handles the playlist creator view
 * # MainCtrl
 * Controller of the applebeesApp
 */
angular.module('applebeesApp')
  .controller('MainCtrl', function ($scope, $location, Echonest, Spotify, $q) {

    // Ten of my favorites!
    $scope.artists = [
      'Animal Collective',
      'Belle and Sebastian',
      'Chance the Rapper',
      'Kendrick Lamar',
      'Kygo',
      'Modest Mouse',
      'Neutral Milk Hotel',
      'Of Montreal',
      'Shpongle',
      'The Shins'
    ];

    var loadTracksFromSpotify = function(trackData) {
      var spotifyPromises = [];
      trackData.songs.map(function(song) {
        spotifyPromises.push(Spotify.getTrackId(song.artist, song.track));
      });
      $q.all(spotifyPromises)
      .then(function(vals) {
        // remove any empty values
        vals = vals.filter(function(n){ return n !== ''; });
        $scope.songIds = vals.join(',');
        $scope.searching = false;
      });
    };

    $scope.getPlaylistUrl = function() {
      return 'https://embed.spotify.com/?uri=spotify:trackset:' + $scope.songIds;
    };

    $scope.getSpotifyUrl = function() {
      return 'http://open.spotify.com/trackset/Applebee%27s%20Playlist/' + $scope.songIds;
    };

    $scope.getPlaylist = function() {
      $scope.searching = true;
      Echonest.getPlaylistByArtist($scope.selectedArtist)
      .then(function(data) {
        loadTracksFromSpotify(data);
      }, function(err) { // error
        console.error(err);
        $location.path('404');
      });
    };

    $scope.reset = function() {
      delete $scope.songIds;
    };

  });

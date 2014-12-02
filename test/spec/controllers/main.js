'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('applebeesApp'));

  var MainCtrl,
    MockEchonest,
    MockLocation,
    MockSpotify,
    MockQ,
    defaultSongIds,
    scope;

  defaultSongIds = '5MdbIuFZ22yUIZcBVc051J,4y4gIF4tD785sjnCFAtqRu,311fWdp7RrvN4Fuz7sv6Ea,6rbeWjEavBHvX2kr6lSogS,4WBYM8hwZRtEhtzWzE9pAp,1jYRmGWagnoivbBRFVg9CZ,2CYlFMXuhZTNT7rUk86KG6';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MockEchonest = jasmine.createSpyObj('Echonest', ['getPlaylistByArtist']);
    MockSpotify = jasmine.createSpyObj('Spotify', ['getTrackId']);
    MockLocation = jasmine.createSpyObj('$location', ['path']);
    MockQ = jasmine.createSpyObj('$q', ['all']);
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      Echonest: MockEchonest,
      $q: MockQ,
      Spotify: MockSpotify,
      $location: MockLocation
    });
  }));

  it('should have a list of artists', function () {
    expect(scope.artists.length).toBe(10);
  });

  it('should clear songIds on reset', function () {
    scope.songIds = defaultSongIds;
    scope.reset();
    scope.$digest();
    expect(scope.songIds).toBeUndefined();
  });

  describe('getPlaylist', function() {
    it('should redirect to /404 on reject', function () {
      // mock being rejected
      MockEchonest.getPlaylistByArtist.andReturn({then: function(cb, err) {
        err();
      }});
      scope.getPlaylist();
      expect(MockLocation.path).toHaveBeenCalled();
    });
    it('should get spotify track data on success', function() {
      // TODO set up fixtures to move into own files
      var mockTrackData = {'songs':[{'track':'The Party\'s Crashing Us','artist':'of Montreal'},{'track':'\'There Goes My Formula!\'','artist':'The Minders'},{'track':'Do You Realize??','artist':'The Flaming Lips'},{'track':'The Late Great Cassiopia','artist':'The Essex Green'},{'track':'Darkest Wave','artist':'Elf Power'},{'track':'Tropical Ice-land','artist':'The Fiery Furnaces'},{'track':'Emasculate The Masculine','artist':'The Unicorns'},{'track':'Majesty','artist':'The Music Tapes'}]};
      var mockSpotifyData =['5MdbIuFZ22yUIZcBVc051J', '4y4gIF4tD785sjnCFAtqRu', '311fWdp7RrvN4Fuz7sv6Ea', '6rbeWjEavBHvX2kr6lSogS', '4WBYM8hwZRtEhtzWzE9pAp', '1jYRmGWagnoivbBRFVg9CZ', '2CYlFMXuhZTNT7rUk86KG6'];
      MockEchonest.getPlaylistByArtist.andReturn({then: function(cb) {
        cb(mockTrackData);
      }});
      MockQ.all.andReturn({then: function(cb) {
        cb(mockSpotifyData);
      }});
      scope.getPlaylist();
      scope.$digest();
      expect(MockSpotify.getTrackId).toHaveBeenCalled();
      expect(MockSpotify.getTrackId.calls.length).toBe(mockTrackData.songs.length);
      expect(MockSpotify.getTrackId.calls[0].args).toEqual([mockTrackData.songs[0].artist, mockTrackData.songs[0].track]);
      expect(MockQ.all).toHaveBeenCalled();
      expect(scope.songIds).toEqual(defaultSongIds);
    });
  });

  it('should return embed url on getPlaylistUrl', function() {
    scope.songIds = defaultSongIds;
    var url = scope.getPlaylistUrl();
    expect(url).toEqual('https://embed.spotify.com/?uri=spotify:trackset:' + defaultSongIds);
  });

  it('should return web url on getSpotifyUrl ', function() {
    scope.songIds = defaultSongIds;
    var url = scope.getSpotifyUrl();
    expect(url).toEqual('http://open.spotify.com/trackset/Applebee%27s%20Playlist/' + defaultSongIds);
  });

});

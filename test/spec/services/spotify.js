'use strict';

describe('Service: Spotify', function () {

  // load the service's module
  beforeEach(module('applebeesApp'));

  // instantiate service
  var Spotify, httpBackend;
  beforeEach(inject(function (_Spotify_, $httpBackend) {
    Spotify = _Spotify_;
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
       
  it('should return track ID', function () {
    // TODO add JSON fixtures
    var url = 'https://api.spotify.com/v1/search?type=track&q=Kendrick%20Lamar Michael%20Jordan&limit=1';
    httpBackend.whenGET(url).respond(
  {
    'tracks' : {
      'href' : 'https://api.spotify.com/v1/search?query=Kendrick+Lamar+Michael+Jordan&offset=0&limit=1&type=track',
      'items' : [ {
        'album' : {
          'album_type' : 'album',
          'available_markets' : [ 'AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'RO', 'SE', 'SG', 'SI', 'SK', 'SV', 'TR', 'TW', 'US', 'UY' ],
          'external_urls' : {
            'spotify' : 'https://open.spotify.com/album/5wwQGuazQaPtxOddReACsV'
          },
          'href' : 'https://api.spotify.com/v1/albums/5wwQGuazQaPtxOddReACsV',
          'id' : '5wwQGuazQaPtxOddReACsV',
          'images' : [ {
            'height' : 640,
            'url' : 'https://i.scdn.co/image/feb4bce46ff46d89b3f2fe162c09aafd30b281f8',
            'width' : 640
          }, {
            'height' : 300,
            'url' : 'https://i.scdn.co/image/3fde491aa99dff770685a6752a61bc36457394cb',
            'width' : 300
          }, {
            'height' : 64,
            'url' : 'https://i.scdn.co/image/280bdc97b22cf2906b3d977850e56046898f6a34',
            'width' : 64
          } ],
          'name' : 'Overly Dedicated',
          'type' : 'album',
          'uri' : 'spotify:album:5wwQGuazQaPtxOddReACsV'
        },
        'artists' : [ {
          'external_urls' : {
            'spotify' : 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg'
          },
          'href' : 'https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg',
          'id' : '2YZyLoL8N0Wb9xBt1NhZWg',
          'name' : 'Kendrick Lamar',
          'type' : 'artist',
          'uri' : 'spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg'
        }, {
          'external_urls' : {
            'spotify' : 'https://open.spotify.com/artist/5IcR3N7QB1j6KBL8eImZ8m'
          },
          'href' : 'https://api.spotify.com/v1/artists/5IcR3N7QB1j6KBL8eImZ8m',
          'id' : '5IcR3N7QB1j6KBL8eImZ8m',
          'name' : 'Schoolboy Q',
          'type' : 'artist',
          'uri' : 'spotify:artist:5IcR3N7QB1j6KBL8eImZ8m'
        } ],
        'available_markets' : [ 'AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'RO', 'SE', 'SG', 'SI', 'SK', 'SV', 'TR', 'TW', 'US', 'UY' ],
        'disc_number' : 1,
        'duration_ms' : 350698,
        'explicit' : true,
        'external_ids' : {
          'isrc' : 'USUYG1001595'
        },
        'external_urls' : {
          'spotify' : 'https://open.spotify.com/track/2j1jZttFb1v7oLYULf7NSN'
        },
        'href' : 'https://api.spotify.com/v1/tracks/2j1jZttFb1v7oLYULf7NSN',
        'id' : '2j1jZttFb1v7oLYULf7NSN',
        'name' : 'Michael Jordan',
        'popularity' : 55,
        'preview_url' : 'https://p.scdn.co/mp3-preview/bbba2d46f5f0357da5df13a016871b07011d549a',
        'track_number' : 6,
        'type' : 'track',
        'uri' : 'spotify:track:2j1jZttFb1v7oLYULf7NSN'
      } ],
      'limit' : 1,
      'next' : null,
      'offset' : 0,
      'previous' : null,
      'total' : 1
    }
  });

    Spotify.getTrackId('Kendrick Lamar', 'Michael Jordan').then(function(trackId) {
      expect(trackId).toEqual('2j1jZttFb1v7oLYULf7NSN');
    });
    httpBackend.flush();
  });

});

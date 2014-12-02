'use strict';

describe('Service: Echonest', function () {

  // load the service's module
  beforeEach(module('applebeesApp'));

  // instantiate service
  var Echonest, httpBackend;
  beforeEach(inject(function (_Echonest_, $httpBackend) {
    Echonest = _Echonest_;
    httpBackend= $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
       
  describe('getPlaylistByArtist', function() {
    it('should error if no artist name passed in', function () {
      Echonest.getPlaylistByArtist().catch(function(err){
        expect(err.err).toEqual('Error: Invalid artist name!');
      });
      Echonest.getPlaylistByArtist('').catch(function(err){
        expect(err.err).toEqual('Error: Invalid artist name!');
      });
    });

    it('should retrieve an array of artist and track names for a valid artist', function() {
      // TODO add JSON fixtures
      var url = 'http://developer.echonest.com/api/v4/playlist/basic?api_key=ZYUBZ2CI4SAEPVHYL&format=json&results=8&type=artist-radio&artist=Kendrick+Lamar';
      httpBackend.whenGET(url).respond(
        {'response': {'status': {'version': '4.2', 'code': 0, 'message': 'Success'}, 'songs': [{'artist_id': 'AREJQVO12C1DF51FFE', 'id': 'SOCTKNI12DA01F4510', 'artist_name': 'Kendrick Lamar', 'title': 'Michael Jordan'}, {'artist_id': 'AREQFUK11F94B58515', 'id': 'SOOZWMO13665641761', 'artist_name': 'Nipsey Hussle', 'title': 'Rose Clique'}, {'artist_id': 'ARU6W7J1187B9948B1', 'id': 'SOLAZTJ143B2E865D3', 'artist_name': 'Dom Kennedy', 'title': 'When I Come Around'}, {'artist_id': 'ARREQCK1269FB2EE5C', 'id': 'SOYZERS13F6B66D526', 'artist_name': 'Schoolboy Q', 'title': 'Collard Greens'}, {'artist_id': 'ARFIDHF12496DAB7E1', 'id': 'SOASPWY13D64742187', 'artist_name': 'J. Cole', 'title': 'Work Out'}, {'artist_id': 'ARA47DP11C8A42AC5A', 'id': 'SOQFPJF131C394C975', 'artist_name': 'Jay Rock', 'title': 'Say Wassup'}, {'artist_id': 'ARIIISN1304CD6042A', 'id': 'SOBPXDO131C394C387', 'artist_name': 'MellowHype', 'title': '64'}, {'artist_id': 'AR8VVK71187B98E6F8', 'id': 'SOLKHYU13C1C3D33FD', 'artist_name': 'Smoke DZA', 'title': 'Ashtray'}]}}
      );
      Echonest.getPlaylistByArtist('Kendrick Lamar').then(function(data) {
        var expectedData = {songs: [{'track':'Michael Jordan','artist':'Kendrick Lamar'},{'track':'Rose Clique','artist':'Nipsey Hussle'},{'track':'When I Come Around','artist':'Dom Kennedy'},{'track':'Collard Greens','artist':'Schoolboy Q'},{'track':'Work Out','artist':'J. Cole'},{'track':'Say Wassup','artist':'Jay Rock'},{'track':'64','artist':'MellowHype'},{'track':'Ashtray','artist':'Smoke DZA'}]};
        expect(data).toEqual(expectedData);
      }); 
      httpBackend.flush();
    });

    it('should throw an error if unknown artist entered', function() {
      var url = 'http://developer.echonest.com/api/v4/playlist/basic?api_key=ZYUBZ2CI4SAEPVHYL&format=json&results=8&type=artist-radio&artist=iamnotarealartist';
      httpBackend.whenGET(url).respond(
        {'response': {'status': {'version': '4.2', 'code': 5, 'message': 'The Identifier specified does not exist'}}}
      );
      Echonest.getPlaylistByArtist('iamnotarealartist').then(function(data, err) {
        expect(data).toBe(undefined);
        expect(err).not.toBe(undefined);
      });
      httpBackend.flush();
    });
  });

});

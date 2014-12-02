# Fresh Tracks
## By Jason Schapiro
### A code challenge for F Sharp

**View it live here: http://freshtracks.jasonschapiro.com**

The Problem
===========
Create a Single Page Application that provides an autocomplete search bar. The user should be able to search for artists by name in the aforementioned search bar. Upon selecting an artist, the user is presented a playlist of songs based on that artist's style.

Artist Search
--------------
For artist search, please create an array of your 10 favorite artists.  Use a typeahead library, like Twitter's typeahead.js (https://github.com/twitter/typeahead.js/), to perform the autocomplete functionality.

Playlist Creation
------------------
For creating a playlist from the artist, please use Echonest, or a similar external library, to use the selected artist from the autocomplete search bar to populate playlist.

**NOTE: As an additional step, I decided to use Spotify to create an embedded playlist based on the tracks chosen by Echonest. Check it out!**


INSTALLATION
===========
Clone the repo, then run `npm install`, `bower install` and `grunt serve` to run the application locally.

You can run the tests using the `grunt test` command.

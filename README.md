#FretMonster

#### About this project

Forked and improved from [davidpots/fretmonster](https://github.com/davidpots/fretmonster)
The following improvements were made:

- remove the meta redirect as it breaks development
- move Rakefile to npm (more appropriate for clientside deps)
- externalize jquery dependency
- whitespace format javascript and html files
- remove unused html and sass cache folder
- refactor instrument stringDiff prop to be an array instead of an object
- add ability to dynamically populate instruments from instruments file
- seperate instruments variable into seperate file
- set the default key to that of the first open string
- dynamically calculate string diff based on the note

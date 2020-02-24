# FretMonster!

#### About this project

Still pretty early in development, but I want to share progress. Test it out by clicking around above. So far, this is demonstrating the fundamental functionality that this project will use. Next on the list is some proper attention paid to visual design, cleaning up the code, making it work beautifully across all devices, and other tidbits relating to the overall product experience.

You might be interested in my original [fretboard project](http://davidpots.com/blog/guitar-fretboard-ascii-svg/), which tackles this same scale problem from the POV of chords. I'll probably get back to this approach one day, though I'd keep it as chord-only (whereas FretMonster will likely be scale-only).

Finally, you should also check out [Songnotes](http://songnotes.cc), my personalized collection of hand-crafted guitar tabs/chords/lyrics/notes.

#### Change Log

Dec 4, 2018

*   Added major and minor blues scales

August 28, 2016

*   Added mandolin!

July 31, 2014

*   Adds support for ukulele and bass! As part of this, some refactoring of the Javascript was done which allows me to add more instruments (and tunings) as I wish. Instuments are [stored in JSON format](https://gist.github.com/davidpots/fe9d5eae4f86970bda55), where each instrument has a unique number of strings, string notes, frets-to-label (i.e., the dots on the fretboard), etc. This keeps the fretboard-generating logic properly instrument agnostic, which it definitely was not before.
*   Semi-tweaking of the scale + key changer UI. I didn't like it before and am not crazy about the current solution/fix, but it's a small improvement. Soon on the list is for me to tweak this UI/interaction, as well as cleaning up some of the CSS.

July 24, 2014

*   Dropdowns for key + scale selector! Still crude-ish, but a start.
*   Big CSS overhaul. Using a variant of the wonderful BASSCSS which I'm still implementing in places, but it's mostly there. Nasty inline styles are gone. Styling from here on out will be much easier and more organized.
*   A bit more device-size-aware / responsive /etc.
*   Brings in next wave of the design polish, made easier by leveraging SCSS variables a bit.
*   Adds a bunch of new scales -- the modes, mainly
*   Adds initial logic to check for interval exceptions, mainly that of b5 actually needing to be a 4# (as in the Lydian scale).

July 18, 2014

*   Brought in some color. Needs polish still, but better than it used to be.
*   "Hightlight triads" is no longer an on/off toggle. Now, a user switches between _either_ "highlight root" or "hightlight triads".
*   Added a sexy CSS animation, used on root notes. Thanks [Jackson](http://twitter.com/jxnblk).
*   Fixes a bug where interval/notes wouldn't persist if you changed key or scale.

July 7, 2014

*   If you change between "show notes" and "show intervals", your choice now persists if you change either the scale or the key. Same thing for the "show triads" option.

July 3, 2014

*   Implemented much more cleaned up & flexible HTML structure for the fretboard.
*   Implemented horizontal scrolling if your screen isn't wide enough for the fretboard.
*   Big cleanup and organization of the Javascript.

June 29, 2014

*   Got the JS-powered scale changing engine working, hurrah!

* * *

[View this project on GitHub](https://github.com/davidpots/fretmonster) | [Follow me on Twitter](http://twitter.com/davidpots)

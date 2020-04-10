String.prototype.removePitch = function() {
  return this.replace(/\d+/g, '');
}

String.prototype.getPitch = function() {
  return parseInt(this.match(/(\d+)/).pop());
}

var defaultScale = scales[Object.keys(scales)[0]],
  defaultInstrument = instruments[Object.keys(instruments)[0]],
  defaultKey = defaultInstrument.strings.slice(-1)[0].removePitch(),
  currentScale = defaultScale,
  currentKey = defaultKey,
  currentInstrument = defaultInstrument,
  showingIntervals = true,
  showingNotes = false,
  highlightingRoot = true,
  highlightingTriads = false;

var fretboardLength = 0;
for (var i in instruments) {
  var lastFret = getInstrumentLastFretNumber(instruments[i]);
  if (lastFret > fretboardLength) fretboardLength = lastFret;
}

var grid = {},
  notes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
  keyDiff = {
    'E': 0,
    'F': 1,
    'F#': 2,
    'Gb': 2,
    'G': 3,
    'G#': 4,
    'Ab': 4,
    'A': 5,
    'A#': 6,
    'Bb': 6,
    'B': 7,
    'C': 8,
    'C#': 9,
    'Db': 9,
    'D': 10,
    'D#': 11,
    'Eb': 11,
  },
  toneMap = {
    1: '1',
    2: 'b2',
    3: '2',
    4: 'b3',
    5: '3',
    6: '4',
    7: 'b5',
    8: '5',
    9: 'b6',
    10: '6',
    11: 'b7',
    12: '7'
  };


function rearrange(toSplit, divider) {

  // Splits an array, shifts rear portion (after "divider") to the front
  // Universal function, used throughout the app.

  var backLop = [],
    frontLop = [],
    combined = [];
  backLop = toSplit.slice(divider, toSplit.length);
  frontLop = toSplit.slice(0, divider);
  combined = backLop.concat(frontLop);
  return combined;
}


function generateFretboard() {

  // Create & populate the placeholder & empty fretboard HTML

  // Append the empty Fretboard wrapper to the DOM
  $('.fretboard_wrapper').empty();

  // Generates the HTML for the fretboard, dynamic based on instrument # of strings/etc.
  var fretboardHTML = '<div class="table_wrapper">\n';
  fretboardHTML += '<table class="string_labels">\n';
  for (var i = 0; i < currentInstrument.numStrings; i++) {
    fretboardHTML += '<tr><td><div class="cell">' + currentInstrument.strings[i] + '</div></td></tr>\n';
  }
  fretboardHTML += '</table>\n';
  fretboardHTML += '<table class="fretboard">\n';
  for (var i = 0; i < currentInstrument.numStrings; i++) {
    fretboardHTML += '<tr class="string"></tr>\n';
  }
  fretboardHTML += '<tr class="legend"></tr>\n';
  fretboardHTML += '</table>\n';
  fretboardHTML += '</div>';

  $('.fretboard_wrapper').append(fretboardHTML);

  // Prime the HTML that each fret/cell will be filled with
  cellHTML = '<td><div class="cell fret"></div></td>';

  // Apply the fret/cell HTML into each string
  $('.fretboard .string').each(function (i, string) {
    for (var i = 0; i <= fretboardLength; i++) {
      $(string).append(cellHTML);
    }
    $(string).find('.cell').each(function (cellNum, cellObj) {
      if (cellNum == 0) {
        $(cellObj).addClass('fret--open');
      } else {
        $(cellObj).addClass('fret--hasBG');
      }
      if (cellNum == fretboardLength) {
        $(cellObj).addClass('fret--trailer');
      }
    });
  });

  // Apply the fret number row beneath all strings
  for (var i = 1; i < fretboardLength; i++) {
    $('.fretboard .legend').append(cellHTML);
  }
  $('.fretboard .legend').find('.fret').each(function (fretNum, fretObj) {
    $(fretObj).hide();
    $(fretObj).addClass('fret--fretNum').attr('data-fret-num', fretNum).text(fretNum);
  });
  $('.fret_marker').empty();
  var showFrets = currentInstrument.fretsToLabel;
  $(showFrets).each(function (i, obj) {
    $('.fret--fretNum[data-fret-num=' + obj + ']').show();
  });

}


function tonify(scale) {

  // Convert the scale's "o" and "-" blips into the intervals per that scale.
  // Example: "o-o-oo-o-o-o" becomes ["1", "", "2", "", "3", "4", "", "5", "", "6", "", "7"]

  // Convert scale string to an array
  scale = scale.split('');
  // Iterate through each tone
  var tone;
  $(scale).each(function (i, obj) {
    tone = i + 1;
    if (obj == 'o') {
      scale[i] = toneMap[tone];
    } else {
      scale[i] = '';
    }
  });
  return scale;
}

function getStringDiffOfStringNum(stringNum) {
  return 12 - computeStringDiff(currentInstrument.strings[stringNum].removePitch());
}

function computeStringDiff(note) {
  return (12 - keyDiff[note]) % 12;
}

function getInstrumentLastFretNumber(instrument) { 
  return instrument.fretsToLabel[instrument.fretsToLabel.length - 1] + 2; 
}

function computeScaleTones(scale, key, length) {

  // Accepts (1) a scale, (2) a desired key, and (3) the desired length of the fretboard

  scaleName = scale;

  // Convert the scale's blip pattern into key-agnostic intervals
  scale = tonify(scale);

  // Convert the tones in tonified scale to be as they'd appear on the E string, starting at fret 0
  // For example, a major scale in the key of G would be converted
  // from ["1", "", "2", "", "3", "4", "", "5", "", "6", "", "7"] to ["6", "", "7", "1", "", "2", "", "3", "4", "", "5", ""]
  scale = rearrange(scale, (12 - keyDiff[key]));

  // Populate each string with the scale, adjusted for variable string tone
  for (var i = 0; i < currentInstrument.numStrings; i++) {
    var fullString = rearrange(scale, getStringDiffOfStringNum(i));
    grid[i] = fullString.concat(fullString).slice(0, length);

  }
  console.log("A " + currentScale.name + " scale in the key of " + key + " has been saved to the variable 'grid'.");
}



function addTonesToFretboard() {

  // Remove any existing notes, in case user is generating a new scale
  $('.fretboard .note').remove();

  // Set the core HTML that each tone/interval gets
  var noteHTML = '<div class="note"></div>';

  var dotHTML;

  // Go through each string, add the tones/intervals where appropriate
  $('.fretboard .string').each(function (stringNum, stringObj) {

    // Give each active fret the empty noteHTML...
    $(grid[stringNum]).each(function (gridNum, gridObj) {
      if (gridObj != "") {
        $(stringObj).find('.fret').eq(gridNum).html(noteHTML);
      }
    });

    // Give each active fret the necessary data attributes...
    $(grid[stringNum]).each(function (gridNum, gridObj) {
      if (gridObj != "") {
        $(stringObj).find('.fret').eq(gridNum).find('.note').attr('data-active', true).attr('data-interval', gridObj);
      }
    });

    // Give each active fret its absolute note...
    var extendedNotes = notes.concat(notes);
    extendedNotes = rearrange(extendedNotes, getStringDiffOfStringNum(stringNum));
    $(stringObj).find('.fret').each(function (fretNum, fretObj) {
      $(fretObj).find('.note').attr('data-note', extendedNotes[fretNum]);
    });

    // Give each active fret the necessary data attributes...
    $(grid[stringNum]).each(function (gridNum, gridObj) {
      if (gridObj != "") {

        if (showingNotes == true) {
          dotHTML = $(stringObj).find('.fret').eq(gridNum).find('.note').attr('data-note');
        }
        if (showingIntervals == true) {
          dotHTML = gridObj;
        }
        if (highlightingTriads == true) {
          var x = $(stringObj).find('.fret').eq(gridNum).find('.note');
          if (["1","3","b3","5"].includes($(x).attr('data-interval'))) {
            $(x).addClass('highlight');
          }
        }

        $(stringObj).find('.fret').eq(gridNum).find('.note').text(dotHTML);
      }
    });

    notePlayer();
  });

  //Guitar strings are E2=82.41Hz, A2=110Hz, D3=146.8Hz, G3=196Hz, B3=246.9Hz, E4=329.6Hz
  //Bass strings are (5th string) B0=30.87Hz, (4th string) E1=41.20Hz, A1=55Hz, D2=73.42Hz, G2=98Hz
  //Mandolin & violin strings are G3=196Hz, D4=293.7Hz, A4=440Hz, E5=659.3Hz
  //Viola & tenor banjo strings are C3=130.8Hz, G3=196Hz, D4=293.7Hz, A4=440Hz
  //Cello strings are C2=65.41Hz, G2=98Hz, D3=146.8Hz, A3=220Hz
  function calculateOctaveFromStringAndNote({
    stringNum, 
    fretNum, 
    note,
  }) {
    const noteToPositionMapping = {
      'C': 0,
      'C#': 1,
      'Db': 1,
      'D': 2,
      'D#': 3,
      'Eb': 3,
      'E': 4,
      'F': 5,
      'F#': 6,
      'Gb': 6,
      'G': 7,
      'G#': 8,
      'Ab': 8,
      'A': 9,
      'A#': 10,
      'Bb': 10,
      'B': 11,
    };
    const currentInstrumentStrings = currentInstrument.strings.slice().reverse();
    const openString = currentInstrumentStrings[stringNum];
    if (fretNum > 0) {
      const openStringPosition = noteToPositionMapping[openString.removePitch()];
      const notePosition = noteToPositionMapping[note];
      if (fretNum > 11 && notePosition < openStringPosition) {
        return openString.getPitch() + 2;
      }
      if (notePosition < openStringPosition || fretNum > 11) {
        return openString.getPitch() + 1;
      }
    }
    return openString.getPitch();
  }

  function notePlayer() {
    if (!window.Tone) {
      return console.info("include tonejs library for note player");
    }
    $($(".string").get().reverse()).each(function(stringNum) {
      //we create a new instance for each string to we can use drones and chrords
      const tone_instrument = new Tone.Synth().toMaster();
      $(this).find(".fret").each(function(fretNum) {
        //not all frets have notes and all frets only have one note
        $(this).find(".note").each(function() {
          const note = $(this).data("note");
          const octave = calculateOctaveFromStringAndNote({
            stringNum, 
            fretNum, 
            note,
          });
          //clean up
          $(this).off("mousedown");
          $(this).off("mouseup");

          $(this).on("mousedown", function() {
              console.log({"action": "attack", stringNum, fretNum, note, octave});
              return tone_instrument.triggerAttack(`${note}${octave}`);
          });
          //not triggered on right clicks
          $(this).on("mouseup", () => {
              console.log({"action": "release", stringNum, fretNum, note, octave});
              return tone_instrument.triggerRelease();
          });
        });
      });
    });
  }
}

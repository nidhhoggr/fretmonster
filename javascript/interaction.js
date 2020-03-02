$(document).ready(function () {

  // Sets up size for the overlays
  $('.js-overlay').css('position', 'fixed')
  var el = $('.js-overlay');
  $(el).height($(window).height());

  // close the overlays
  $('.js-closeOverlay').click(function () {
    $(this).closest('.js-overlay').hide();
  });

  $('body').click(function () {
    $('.js-overlay.fixed').hide();
  });

  // to launch scale picker overlay
  $('.js-summonScalePicker').click(function () {
    $('.js-scalePicker').fadeIn('fast');
    return false;
  });

  // to launch scale picker overlay
  $('.js-summonKeyPicker').click(function () {
    $('.js-keyPicker').fadeIn('fast');
    return false;
  });

  $('.js-keySelector a[data-key-name="' + defaultKey + '"]').addClass('active');
  $('.js-summonKeyPicker').text(defaultKey);

  $('.js-scaleSelector a[data-scale-name="' + defaultScale.name + '"]').addClass('active');
  $('.js-summonScalePicker').text(defaultScale.name);

  // Generate the placeholder Fretboard wrapper
  generateFretboard();

  // Give the user a pre-canned scale to start with.
  computeScaleTones(defaultScale.pattern, defaultKey, fretboardLength);
  addTonesToFretboard();

});

$(window).on('load', function () {

  // Lets the user tweak or toggle some misc display options.

  // Notes-Interval toggle

  $('.showNotes').click(function () {
    var replaceWith;
    $('.note[data-active="true"]').each(function (i, obj) {
      replaceWith = $(obj).data('note');
      $(obj).text(replaceWith);
    });
    showingNotes = true;
    showingIntervals = false;
    $('.showIntervals').removeClass('active--toggle');
    $(this).toggleClass('active--toggle');
    return false;
  });

  $('.showIntervals').click(function () {
    var replaceWith;
    $('.note[data-active="true"]').each(function (i, obj) {
      replaceWith = $(obj).data('interval');
      $(obj).text(replaceWith);
    });
    showingNotes = false;
    showingIntervals = true;
    $('.showNotes').removeClass('active--toggle');
    $(this).toggleClass('active--toggle');
    return false;
  });

  // Triads-Root toggle
  $('.highlightRoot').click(function () {
    $('.note[data-active="true"]').each(function (i, obj) {
      if (($(obj).attr('data-interval') == "3") || ($(obj).attr('data-interval') == "5") || ($(obj).attr('data-interval') == "b3")) {
        $(this).removeClass('highlight');
      }
      if ($(obj).attr('data-interval') == "1") {
        $(this).addClass('highlight');
      }
    });
    highlightingRoot = true;
    highlightingTriads = false;
    $('.highlightTriads').removeClass('active--toggle');
    $(this).addClass('active--toggle');
    return false;
  });

  $('.highlightTriads').click(function () {
    $('.note[data-active="true"]').each(function (i, obj) {
      if (($(obj).attr('data-interval') == "3") || ($(obj).attr('data-interval') == "5") || ($(obj).attr('data-interval') == "b3") || ($(obj).attr('data-interval') == "1")) {
        $(this).addClass('highlight');
      }
    });
    highlightingRoot = false;
    highlightingTriads = true;
    $('.highlightRoot').removeClass('active--toggle');
    $(this).addClass('active--toggle');
    return false;
  });

  // Key Changer!
  $('.js-keySelector a').click(function () {
    $('.js-keySelector a').removeClass('active');
    $(this).addClass('active');
    currentKey = $(this).attr('data-key-name');
    computeScaleTones(currentScale.pattern, currentKey, fretboardLength);
    addTonesToFretboard();

    // Put into function
    $('.js-summonKeyPicker').text(currentKey);
    $(this).closest('.js-overlay').hide();

    return false;
  })

  // Scale Changer!
  $('.js-scaleSelector a').click(function () {
    $('.js-scaleSelector a').removeClass('active');
    $(this).addClass('active');
    var newScale = $(this).attr('data-scale-name');
    currentScale = scales[newScale];
    computeScaleTones(currentScale.pattern, currentKey, fretboardLength);
    addTonesToFretboard();

    // Check for rare chords w/ wacky intervals. Make into function?
    // Lydian
    if (newScale == 'lydian_mode') {
      $('.note[data-interval="b5"]').attr('data-interval', '4#');
      if (showingIntervals == true) {
        $('.note[data-interval="b5"]').text('4#');
      }
    }

    // Put into function
    $('.js-summonScalePicker').text(currentScale.name);
    $(this).closest('.js-overlay').hide();
    return false;
  })

  //Dynamically populate the instruments
  Object.keys(instruments).map((k, v) => {
    var instrument = instruments[k];
    var next = instruments[Object.keys(instruments)[v + 1]];
    $('.js-instrumentSelector').append('<a data-instrument="' + k + '" class="phs pvxs inline-block" href="#">' + instrument.name + '</a>'.concat(next ? ' | ' : ''));
  });
  
  $('.js-instrumentSelector a').first().addClass('active--toggle');

  // Instrument Changer!
  $('.js-instrumentSelector a').click(function () {
    $('.js-instrumentSelector a').removeClass('active--toggle');
    $(this).addClass('active--toggle');
    var newInstrument = $(this).data('instrument'); // e.g., 'ukulele'
    if (currentInstrument.name != newInstrument) {
      currentInstrument = instruments[newInstrument];
      generateFretboard();
      computeScaleTones(currentScale.pattern, currentKey, fretboardLength);
      addTonesToFretboard();
    }
    return false;
  });

});

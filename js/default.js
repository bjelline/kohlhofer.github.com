/*jslint indent: 2 */

'use strict';

function fetchLastTweet() {
  $('#tweet').hide();
  $.getJSON("http://twitter.com/statuses/user_timeline/bjelline.json?count=2&include_entities=1&callback=?", function (data) {
    var js_date = "" + new Date(Date.parse(data[0].created_at));
    js_date = js_date.replace(/:\d\d GMT.*/,'');
    $("#lasttweet").html(
      "<a id='twitterlink' href=https://twitter.com/#!/bjelline/status/" + data[0].id_str + ">" + js_date.toLocaleString() + "</a>" + data[0].text
    );
    $('#tweet').fadeIn();
    console.dir(data);
  });
}

function scrollToMe(event) {
  var link = $(this).attr('href'),
      top  = $(link).offset().top;
  event.preventDefault();
  $('html,body').animate({
    scrollTop: top
  }, 800);
  window.history.replaceState( { anchor: link }, "slide " + link, link);
}

$(function () {
  // $('#loading').show();
  //fetch the last tweet
  fetchLastTweet();
  $('.slide').addClass('position-absolute');	

  $('a[rel="popover"]').popover();
  $('a[rel="tooltip"]').tooltip();

  // scrollTop always returns 0 in my firefox.
  // fall back to normal linking if that happens

  $('#navigation a').click(scrollToMe);

  /*
  window.scrollorama = $.scrollorama({
              blocks:'.slide',
              enablePin:false
  });
  scrollorama.onBlockChange(function() {
      var i = scrollorama.blockIndex;
      $('#console').text('onBlockChange | i='+i+' | block='+scrollorama.settings.blocks.eq(i).attr('id'));
  });
  scrollorama.animate('h1',{
    delay: 400, duration: 300, property:'left', start:-1400, end:0 
  })
  */
});

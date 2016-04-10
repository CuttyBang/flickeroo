$(document).ready(function(){
  var url = 'https://api.flickr.com/services/rest/';
  var key = '4e45669371625ebbc0477774d58d8a1e';
  var deviceSize;
  var pics = [];

  function searchImg(){
    $('.photo-container').html('');
    var query = $("input[type=text]").val();
    var key = '4e45669371625ebbc0477774d58d8a1e';
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+key+"&tags="+query+"&licence=1&format=json&nojsoncallback=1";
    $.getJSON(url, function(reply){
      $.each(reply.photos.photo, function(i, result){
        sizeURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+key+"&photo_id="+result.id+"&format=json&nojsoncallback=1";
        $.getJSON(sizeURL, function(size){
          $.each(size.sizes.size, function(i,sizeResult){
            if(sizeResult.width==deviceSize){
              pics.push(sizeResult);
              $('.photo-container').append('<p><a href="'+sizeResult.url+'" target="_blank"><img src="'+sizeResult.source+'"/>');
            }
          });
        });
      });
    });
  }

  //window.onload = init;

  $('#submit').on('mousedown', function(){
    if($("input[type=text]").val() === '' | !deviceSize){
      $('#alert').removeClass('hidden');
    }else{
      searchImg();
      $("input[type=text]").val('');
    }
  });

  $("#small").click(function(){
    deviceSize=500;
  });

  $("#med").click(function(){
    deviceSize=800;
  });

  $("#large").click(function(){
    deviceSize=1024;
  });

});

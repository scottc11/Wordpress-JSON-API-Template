var mediaJSON;


// when page is fully loaded, get wordpress media
$(document).ready(function() {

  // below function retrieves/interacts with the WP API
  jQuery.extend({
      getValues: function(url) {
          var result = null;
          $.ajax({
              url: url,
              type: 'get',
              dataType: 'json',
              async: false,
              success: function(data) {
                  result = data;
              }
          });
         return result;
      }
  });

  

  console.log(mediaJSON);

  loadContent();
});

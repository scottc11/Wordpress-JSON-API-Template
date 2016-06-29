
var jsonData;

// when page is fully loaded, get wordpress posts
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

  jsonData = $.getValues("http://frommusictocode.com/wp-json/wp/v2/posts");
  console.log(jsonData[0]);
  console.log(typeof jsonData[0].date);

  // assign variable to jquery request so you only have to do it once
  var $postContainer = $('.post-container');

  // set date of post in the p element
  $postContainer.children('.post-date').text(jsonData[0].date);
  // set the content of the post inside the p element
  $postContainer.children('.post-content').text(jsonData[0].content.rendered);

});


var jsonData;
var latestPost;
var mediaData;
var postImage;


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

  jsonData = $.getValues("http://frommusictocode.com/wp-json/wp/v2/posts/");  // get all posts
  mediaData = $.getValues("http://frommusictocode.com/wp-json/wp/v2/media/");  // get all posts
  console.log("<-----POST DATA----->");
  console.log(jsonData);
  console.log("<-----MEDIA DATA----->");
  console.log(mediaData);

  latestPost = jsonData[0]; // return the most recent post (always the first in the array of posts)
  latestPostMedia = getPostMedia(latestPost, mediaData);

  loadContent(latestPost);
});

function getPostMedia(post, media) {
  for (var i = 0; i < media.length; i++) {
    if (media[i].post == post.id) {
      postImage = media[i];
    }
  }
}

function loadContent(post) {

  // assign variable to jquery request so you only have to do it once
  var $postContainer = $('.post-container');

  // FILL IN HTML ELEMENTS
  $postContainer.css('background-image', 'url(' + postImage.source_url + ')');
  $postContainer.children('.post-title').text(post.title);
  $postContainer.children('.post-date').text(post.date);  // set date of post in the p element
}

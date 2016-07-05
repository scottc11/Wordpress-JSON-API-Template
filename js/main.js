
var jsonData;  // URL response
var latestPost;
var mediaData; // URL response


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

  // OBTAIN LATEST POST DATA (text and image)
  latestPost = jsonData[1]; // return the most recent post (always the first in the array of posts)
  latestPostMedia = getPostMedia(latestPost, mediaData); // Get latest post media

  loadContent(latestPost, latestPostMedia);
});

// Getting the latest post media by iterating through each media and pairing it with the post ID.
function getPostMedia(post, media) {
  for (var i = 0; i < media.length; i++) {
    if (media[i].post == post.id) {
      console.log(media[i]);
      return media[i];
    }
  }
}

// LOADING CONTENT INTO HTML ELEMENTS
function loadContent(post, media) {
  console.log(post);
  // assign variable to jquery request so you only have to do it once
  var $postContainer = $('.post-container');

  var dateString = dateConverter(post.date);

  // Fill in the html elements
  $postContainer.css('background-image', 'url(' + media.media_details.sizes.large.source_url + ')');
  $postContainer.children('.post-header-container').children('.post-title').text(post.title.rendered);
  $postContainer.children('.post-header-container').children('.post-date').text(dateString);


}

// returns a string of the given dateObject retrieved from wordpress by using the built in Date() methods in javascript
function dateConverter(wordpressDate) {
  var months = [
              "January", "February", "March",
              "April", "May", "June", "July",
              "August", "September", "October",
              "November", "December"
            ];
  var date = new Date(wordpressDate);
  dateString = date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
  console.log(date);
  console.log(typeof date);
  console.log("<------STRING----->");
  console.log(dateString);

  return dateString;
}

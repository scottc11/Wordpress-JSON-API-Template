
var jsonData;
var postData;
var postImageURL;

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

  postData = jsonData[0]; // return the most recent post

  loadContent();
});

function loadContent() {
  // assign variable to jquery request so you only have to do it once
  var $postContainer = $('.post-container');
  postImageURL = getImageURL(postData.content.rendered);  // get the first image within the post
  $postContainer.css('background-image', 'url(' + postImageURL + ')');
  $postContainer.children('.post-title').text(postData.title);
  $postContainer.children('.post-date').text(postData.date);  // set date of post in the p element
  // $postContainer.children('.post-content').text(postData.content.rendered);  // set the content of the post inside the p element
}

function getImageURL(renderedHTML) {
  var imageURL_1 = renderedHTML.split("<img"); // find the first "<img>" tag
  var imageURL_2  = imageURL_1[1].split('src="');  // find the "scr" of the returned <img> tag
  var imageURL_3  = imageURL_2[1].split(' ');  // split the remaining html content after the 'src' (image url)
  var imageURL = imageURL_3[0].substring(0, imageURL_3[0].lastIndexOf('"'));  // return a string between index [0] of image url and the last quotation on the end of the url
  console.log(imageURL);
  console.log(typeof imageURL);
  return imageURL;
}

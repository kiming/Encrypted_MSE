
var video_element = document.querySelector('video');
var xhr = new XMLHttpRequest();
xhr.open("GET", '../static/test.json', true);
xhr.send();
var media_info;
xhr.onreadystatechange = function() {
    if(xhr.readyState === xhr.DONE) {
        media_info = JSON.parse(xhr.response);
        console.log(media_info);
    }
}
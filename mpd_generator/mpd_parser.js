var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var mpdfile_url = process.argv[2];

var video_set;
var audio_set;

function handleRange(range_str) {
    return range_str.split('-').map(x => Number.parseInt(x));
}

fs.readFile(mpdfile_url, (e, data) => {
    var doc = new DOMParser().parseFromString(data.toString(), 'text/xml');
    var sets = doc.getElementsByTagName('AdaptationSet');
    for (var i = 0; i < sets.length; ++i) {
        var set = sets[i];
        //set.firstElementChild

        var mt = set.getAttribute('mimeType');
        if (mt.indexOf('audio') !== -1)
            audio_set = set;
        else if (mt.indexOf('video') !== -1)
            video_set = set;
    }

    var video = {};
    var audio = {};
    {
        video.mimeType = video_set.getAttribute('mimeType');
        var video_rep = video_set.getElementsByTagName('Representation')[0];
        video.bandwidth = Number.parseInt(video_rep.getAttribute('bandwidth'));
        video.codecs = video_rep.getAttribute('codecs');
        video.height = video_rep.getAttribute('height')
        video.width = video_rep.getAttribute('width');
        var seg_list = video_rep.getElementsByTagName('SegmentList')[0];
        video.duration = Number.parseInt(seg_list.getAttribute('duration'));
        video.timescale = Number.parseInt(seg_list.getAttribute('timescale'));
        var ini = seg_list.getElementsByTagName('Initialization')[0];
        var segments = seg_list.getElementsByTagName('SegmentURL');
        video.initialization = ini.getAttribute('range').split('-').map(x => Number.parseInt(x));
        video.segments = [];
        for (var i = 0; i < segments.length; ++i) {
            var seg_node = segments[i];
            video.segments.push(seg_node.getAttribute('mediaRange').split('-').map(x => Number.parseInt(x)));
        }
        console.log(video);
    }

    {
        audio.mimeType = audio_set.getAttribute('mimeType');
        var audio_rep = audio_set.getElementsByTagName('Representation')[0];
        audio.bandwidth = Number.parseInt(audio_rep.getAttribute('bandwidth'));
        audio.codecs = audio_rep.getAttribute('codecs');
        var seg_list = audio_rep.getElementsByTagName('SegmentList')[0];
        audio.duration = Number.parseInt(seg_list.getAttribute('duration'));
        audio.timescale = Number.parseInt(seg_list.getAttribute('timescale'));
        var ini = seg_list.getElementsByTagName('Initialization')[0];
        var segments = seg_list.getElementsByTagName('SegmentURL');
        audio.initialization = ini.getAttribute('range').split('-').map(x => Number.parseInt(x));
        audio.segments = [];
        for (var i = 0; i < segments.length; ++i) {
            var seg_node = segments[i];
            audio.segments.push(seg_node.getAttribute('mediaRange').split('-').map(x => Number.parseInt(x)));
        }
        console.log(audio);
    }

    fs.writeFile('../web_server/public/static/test.json', JSON.stringify({
        src: 'tf.mp4',
        video: video,
        audio: audio
    }), err => console.error(err));

});
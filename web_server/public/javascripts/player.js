
function parseRangeString(range_str) {
    var range_strs = range_str.split('-');
    return new Segment(Number.parseInt(range_strs[0]), Number.parseInt(range_strs[1]), Segment.UNLOADED);
}

const PlayerEvents = {
    PARSE_MPD_FINISHED: 'mpd_finished',
    WEBSOCKET_READY: 'websocket_ready'
};

const WSRequestType = {
    SEGMENT_CONTENT: 1
};

class Player {
    constructor(mpd_url, video_url, video_element) {
        this.mpd_url = mpd_url;
        this.video_url = video_url;
        this.video_element = video_element;

        this._dashLoaded = false;
        this._initialInfoLoaded = false;
        this._emitter = new EventEmitter();
        this._orderQueue = [];

        this._readMPD(this);
        this.on(PlayerEvents.PARSE_MPD_FINISHED, this._setupVideo);
        this.on(PlayerEvents.WEBSOCKET_READY, this._flushOrderQueue);

        //this.type
        //this.codecs
        //this.width
        //this.height
        //this.bandwidth
        //this.initialization
        //this.segments

        //this.mediaSource
        //this.sourceBuffer
    }

    on(event, listener) {
        this._emitter.addListener(event, listener);
    }

    off(event, listener) {
        this._emitter.removeListener(event, listener);
    }

    _wsSend(_self, request) {
        if (_self.ws.readyState == WebSocket.OPEN)
            _self.ws.send(JSON.stringify(request));
        else
            _self._orderQueue.push(JSON.stringify(request));
    }

    _flushOrderQueue(_self) {
        console.log('Hi~~');
        var queue = _self._orderQueue;
        while (queue.length > 0) {
            var msg = queue.shift();
            _self.ws.send(msg);
        }
    }

    _readMPD(_self) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.mpd_url, true);
        xhr.responseType = "text";
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                var tempoutput = xhr.response;
                var parser = new DOMParser();
                var data = parser.parseFromString(tempoutput, "text/xml", 0);
                var rep = data.querySelectorAll("Representation");
                _self.type = rep[0].getAttribute("mimeType");
                _self.codecs = rep[0].getAttribute("codecs");
                _self.width = rep[0].getAttribute("width");
                _self.height = rep[0].getAttribute("height");
                _self.bandwidth = rep[0].getAttribute("bandwidth");
                var ini = data.querySelectorAll("Initialization");
                _self.initialization = parseRangeString(ini[0].getAttribute("range").toString());
                var segmentsRawData = data.querySelectorAll("SegmentURL");
                _self.segments = [];
                for (var i = 0; i < segmentsRawData.length; ++i) {
                    var segment_raw = segmentsRawData[i];
                    _self.segments.push(parseRangeString(segment_raw.getAttribute("mediaRange").toString()));
                }
                _self._dashLoaded = true;
                _self._emitter.emitEvent(PlayerEvents.PARSE_MPD_FINISHED, [_self]);

            }
        };
    }

    _videoDataParser(_self, data) {
        // _self.sourceBuffer.addEventListener('updateend', function (_) {
        //     _self.video_element.play();
        // });
        console.log(_self.video_element.error);
        _self.sourceBuffer.appendBuffer(data);
    }

    _setupVideo(_self) {
        _self.mediaSource = new MediaSource();
        var url = URL.createObjectURL(_self.mediaSource);
        _self.video_element.src = url;
        _self.video_element.width = _self.width;
        _self.video_element.height = _self.height;

        _self.mediaSource.addEventListener('sourceopen', e => {
            _self.sourceBuffer = _self.mediaSource.addSourceBuffer(_self.type + ";  codecs=\"" + _self.codecs + "\"");
            _self._initVideo(_self);
        });
    }

    _requestSegment(_self, segment) {
        //initialize websocket
        if (_self.ws === undefined) {
            _self.ws = new WebSocket(_self.video_url);
            _self.ws.binaryType = "arraybuffer";
            _self.ws.onopen = function () {
                _self._emitter.emitEvent(PlayerEvents.WEBSOCKET_READY, [_self])
            };
            _self.ws.onmessage = function (e) {
                _self._videoDataParser(_self, e.data);
            };
            _self.ws.onerror = function (e) {
                //TODO
            };
        }
        var request = {
            type: WSRequestType.SEGMENT_CONTENT,
            // content: [0, 11193280]
            content: [segment.start, segment.end]
        }
        _self._wsSend(_self, request);
    }

    _initVideo(_self) {
        _self._requestSegment(_self, _self.initialization);
        // for(var i in _self.segments) {
        //     _self._requestSegment(_self, _self.segments[i]);
        // }
        _self._requestSegment(_self, _self.segments[0]);
        _self._requestSegment(_self, _self.segments[1]);
        _self._requestSegment(_self, _self.segments[2]);
    }
}


var video = document.querySelector('video');
var dash_url = '../static/video_dash.mpd';
var player = new Player(dash_url, "ws://localhost:8181", video);
var button = document.querySelector('button');
button.onclick = function(start, end) {
    video.play();
};


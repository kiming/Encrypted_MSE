(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var PlayerEvents = {
    PARSE_MPD_FINISHED: 'mpd_finished',
    WEBSOCKET_READY: 'websocket_ready'
};

exports['default'] = PlayerEvents;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){

// import {sum, square, variable, MyClass} from './import';
// // 25
// console.log(square(6));

// var cred = {
//     name: 'Ritesh Kumar',
//     enrollmentNo: 11115078
// }

// var x = new MyClass(cred);

// //Ritesh Kumar
// console.log(x.getName());

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _playerJs = require('./player.js');

var _playerJs2 = _interopRequireDefault(_playerJs);

exports['default'] = _playerJs2['default'];
module.exports = exports['default'];

},{"./player.js":3}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _segmentJs = require('./segment.js');

var _segmentJs2 = _interopRequireDefault(_segmentJs);

var _eventsPlayerEventsJs = require('./events/player-events.js');

var _eventsPlayerEventsJs2 = _interopRequireDefault(_eventsPlayerEventsJs);

var Player = function Player(media_info, video_element) {
    _classCallCheck(this, Player);

    this.media_info = media_info;
    this.video_element = video_element;

    this.current_video_track = 0;
    this.current_audio_track = [0, 0];

    this.segments_video = [];
    this.segments_audio = [];
};

exports['default'] = Player;
module.exports = exports['default'];

},{"./events/player-events.js":1,"./segment.js":4}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _statusSegmentStatusJs = require('./status/segment-status.js');

var _statusSegmentStatusJs2 = _interopRequireDefault(_statusSegmentStatusJs);

var Segment = function Segment(id, start, end, status) {
    _classCallCheck(this, Segment);

    this.id = id;
    this.start = start;
    this.end = end;
    this.status = _statusSegmentStatusJs2['default'].UNLOADED;
};

exports['default'] = Segment;
module.exports = exports['default'];

},{"./status/segment-status.js":5}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var SegmentStatus = {
    UNLOADED: 0,
    LOADING: 1,
    DECODING: 2,
    LOADED: 3,
    CLEARING: 4,
    CLEARED: 5
};

exports["default"] = SegmentStatus;
module.exports = exports["default"];

},{}]},{},[2]);

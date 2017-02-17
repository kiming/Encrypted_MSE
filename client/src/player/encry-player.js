
import Segment from '../models/segment.js';
import PlayerEvents from '../events/player-events.js';
import EventEmitter from 'events';

class EncryPlayer {
    constructor(media_info, video_element) {
        this._media_info = media_info;
        this._video_element = video_element;

        this.current_video_track = 0;
        this.current_audio_track = 0;

        this.segments_video = [];
        this.segments_audio = [];

        this._emitter = new EventEmitter();
        this._orderQueue = [];

        this._video = media_info.video;
        this._audio = media_info.audio;
        
        this._ws = new WebSocket(media_info.address);
        this._ms = new MediaSource();
        this._video_element.src = URL.createObjectURL(this._ms);
        this._video_element.width = this._video.width;
        this._video_element.height = this._video.height;

        this._ms.addEventListener('sourceopen', e => {
            this.sb_video = this._ms.addSourceBuffer(this._video.mimeType + ";  codecs=\"" + this._video.codecs);
            this.sb_audio = this._ms.addSourceBuffer(this._audio.mimeType + ";  codecs=\"" + this._audio.codecs);
            console.log('Everything is ok till now.');
        });
        

    }

    on(event, listener) {
        this._emitter.addListener(event, listener);
    }

    off(event, listener) {
        this._emitter.removeListener(event, listener);
    }


    
}

export default EncryPlayer;
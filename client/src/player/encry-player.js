
import Segment from '../models/segment.js';
import PlayerEvents from '../events/player-events.js';
import EventEmitter from 'events';

class EncryPlayer {
    constructor(media_info, video_element) {
        this.media_info = media_info;
        this.video_element = video_element;

        this.current_video_track = 0;
        this.current_audio_track = 0;

        this.segments_video = [];
        this.segments_audio = [];

        this._mediaInfoLoaded = false;
        this._initLoaded = false;

        this._emitter = new EventEmitter();
        this._orderQueue = [];
        
        
    }

    on(event, listener) {
        this._emitter.addListener(event, listener);
    }

    off(event, listener) {
        this._emitter.removeListener(event, listener);
    }


    
}

export default EncryPlayer;
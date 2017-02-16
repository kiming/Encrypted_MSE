
import Segment from './segment.js';
import PlayerEvents from './events/player-events.js';

class Player {
    constructor(media_info, video_element) {
        this.media_info = media_info;
        this.video_element = video_element;

        this.current_video_track = 0;
        this.current_audio_track = [0, 0];

        this.segments_video = [];
        this.segments_audio = [];
    }
}

export default Player;

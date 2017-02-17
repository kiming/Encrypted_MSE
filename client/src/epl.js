
import EncryPlayer from './player/encry-player.js';

function createEncryptedPlayer(media_info, video_element) {
    return new EncryPlayer(media_info, video_element);
}

// interfaces
let elpjs = {
    createEncryptedPlayer: createEncryptedPlayer
};

Object.defineProperty(elpjs, 'version', {
    enumerable: true,
    get: function () {
        // replaced by browserify-versionify transform
        return '__VERSION__';
    }
});

export default elpjs;
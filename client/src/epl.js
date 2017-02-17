
import EncryPlayer from './player/encry-player.js';

// interfaces
let elpjs = {
    getPlayer: new EncryPlayer(345, 345) //for test
};

Object.defineProperty(elpjs, 'version', {
    enumerable: true,
    get: function () {
        // replaced by browserify-versionify transform
        return '__VERSION__';
    }
});

export default elpjs;
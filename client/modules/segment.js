
import SegmentStatus from './status/segment-status.js';

class Segment {
    constructor(id, start, end, status) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.status = SegmentStatus.UNLOADED;
    }
}

export default Segment;
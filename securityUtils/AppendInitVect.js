import { Transform } from "stream";
/**
* A transform stream that appends an initialization vector to the beginning of a file.
* 
* @extends Transform
*/

class AppendInitVect extends Transform {
  /**
   * Creates a new instance of the AppendInitVect class.
   *
   * @param {Buffer} initVect - The initialization vector to append.
   * @param {Object} [opts] - The options for the Transform stream.
   */
  constructor(initVect, opts) {
    super(opts);
    this.initVect = initVect;
    this.appended = false;
  }
  /**
   * Transforms a chunk of data by appending the initialization vector to the beginning of the file.
   *
   * @param {Buffer} chunk - The chunk of data to transform.
   * @param {string} encoding - The encoding of the chunk.
   * @param {function} cb - The callback function to invoke when the transformation is complete.
   */
  _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }

    this.push(chunk);
    cb();
  }
}

module.exports = AppendInitVect;

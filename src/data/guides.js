/* Travel guides index — combines both batches and sorts newest first. */

const a = require('./guides-a');
const b = require('./guides-b');

const guides = [].concat(a, b).sort((x, y) => (x.date < y.date ? 1 : -1));

module.exports = guides;

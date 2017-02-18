'use strict';

const env = require('./env');

const colors = env();

// See: https://github.com/ManoMarks/docker-swarm-visualizer/blob/master/src/data-provider.js
const toHash = function (text) {
  if (!text) {
    throw new Error('Text is missing.');
  }

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
};

// See: https://github.com/ManoMarks/docker-swarm-visualizer/blob/master/src/data-provider.js
const toColor = function (hash) {
  if (!hash) {
    throw new Error('Hash is missing.');
  }

  const color = [];

  for (let i = 0; i < 3; i++) {
    color[i] = (hash >> (i * 8)) & 0xFF;
  }

  return color;
};

const color = function (label) {
  if (!label) {
    throw new Error('Label is missing.');
  }

  if (colors[label]) {
    // Exact match
    return colors[label];
  }

  if (colors[label.split(':')[0]]) {
    // Try without tag
    return colors[label];
  }

  return toColor(toHash(label));
};

module.exports = color;
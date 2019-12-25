#!/usr/bin/env node

const workboxBuild = require('workbox-build')
const config = require('../jmart.config.json')
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  /*
  {
      swSrc: 'src/sw.js',
      swDest: 'dist/sw.js',
      globDirectory: 'dist',
      globPatterns: ['**\/*.{js,css,html,png}'],
    }
  */
  return workboxBuild
    .injectManifest(config.workbox)
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn)
      console.log(`${count} files will be precached, totaling ${size} bytes.`)
    })
}

buildSW()

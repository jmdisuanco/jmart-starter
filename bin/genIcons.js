#!/usr/bin/env node

const sharp = require('sharp')
const fs = require('fs-extra')
const path = require('path')

const generateIcons = () =>{

  let list = [
'icon-72x72',
'icon-96x96',
'icon-128x128',
'icon-144x144',
'icon-152x152',
'icon-192x192',
'icon-384x384',
'icon-120x120',
'icon-180x180',
]



  let srcIcon = `${process.cwd()}/public/icon-512x512.png`
  let icon = sharp(srcIcon)
  list.forEach( (i) => {
    console.log(i)
    let size = i.split('-')[1].split('x')
    icon
      .resize(parseInt(size[0]), parseInt(size[1]))
      .toFile(`${process.cwd()}/public/${i}.png`)
  } )
   
};

generateIcons()
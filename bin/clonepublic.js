#!/usr/bin/env node

const fs = require('fs-extra')

const cloneProject = () =>{
  let src = `${process.cwd()}/public`
  let dest = `${process.cwd()}/dist`
  fs.copySync(src, dest)


};

cloneProject()
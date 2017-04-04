function buildConfig(env) {
  if(env){
    return require('./config/' + env + '.js')(env)
  } else {
    return require('./config/dev.js')()
  }
  
}

module.exports = buildConfig;
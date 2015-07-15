var path = require('path'),
    rootPath = path.join(__dirname, '/../'),
    defaultConfig = require(path.join(rootPath, 'config.json')),
    buildConfiguration = process.env.NODE_ENV || 'debug',
    defaultPort = process.env.NODE_PORT ||
        (buildConfiguration === 'production' ? defaultConfig.port : defaultConfig.debugPort);

module.exports = {
    port: defaultPort,

    isDebug: buildConfiguration === 'debug',
    rooPath: rootPath
};
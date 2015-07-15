var controllerMap = require('./controllerMap.json'),
    fs = require('fs'),
    domain = require('domain'),
    controllerPath = __dirname + '/../controller/',
    controllerPostfix = 'Controller.js',
    controllerDomain = domain.create();

controllerDomain.on('error', function(err) {
    console.log('Controll Ararm');
});

var initialize = function(expressApp) {
        controllerDomain.run(function() {
            addAllRoutes(expressApp);
        });
    },
    addAllRoutes = function(expressApp) {
        for (var i = 0, item = controllerMap.routers[0]; i < controllerMap.routers.length; i++, item = controllerMap.routers[i]) {
            var controller = getController(item.controller);

            if (controller) {
                addRoutes(expressApp, item, controller);
            }
        }
    },
    addRoutes = function(expressApp, route, controller) {
        if (route.isNamespace) {
            addNamespace(expressApp, route, controller);
        } else {
            addRoute(expressApp, route, controller);
        }
    },
    addRoute = function addRoute(expressApp, item, controller) {
        expressApp[item.httpRequest](item.name, controller[item.action]);
    },
    addNamespace = function(expressApp, route, controller) {
        expressApp.namespace(route.name, function() {
            for (var i = 0, item = route.namespaces[0]; i < route.namespaces.length; i++, item = route.namespaces[i]) {
                addRoute(expressApp, item, controller);
            }
        });
    },
    getController = function(controllerName) {
        if (getControllerFile(controllerName)) {
            return require(getFullControllerPath(controllerName));
        }

        return null;
    },
    getFullControllerPath = function(controllerName) {
        return controllerPath + controllerName + controllerPostfix;
    },
    getControllerFile = function(controllerName) {
        var path = getFullControllerPath(controllerName);
        return !!fs.existsSync(path);
    };

module.exports.initialize = initialize;
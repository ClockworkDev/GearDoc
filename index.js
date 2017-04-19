var pug = require("pug");

function generateDoc(componentSource) {
    initMockupClockworkRT();
    initExtensionPoints();
    eval(componentSource);
    preproccessExtensionPoints(extensionPoints);
    return generateHTML(extensionPoints);
}

var extensionPoints;
function initExtensionPoints() {
    extensionPoints = {
        components: [],
        collisions: [],
        renderingLibraries: [],
        renderingPipeline: null
    };
}


var CLOCKWORKRT = {};
function initMockupClockworkRT() {
    CLOCKWORKRT = {};
    //List of components, only two operations are allowed: register and get
    CLOCKWORKRT.components = (function () {
        var list = [];
        return {
            register: function (x) {
                //Array
                if (x && x.length > 0) {
                    x.forEach(x => list.push(x));
                    x.forEach(x => extensionPoints.components.push(x));
                }
                //Element
                if (x && x.length == undefined) {
                    list.push(x);
                    extensionPoints.components.push(x);
                }
            },
            get: function () {
                return list;
            }
        };
    })();

    //List of components, only two operations are allowed: register and get
    CLOCKWORKRT.collisions = (function () {
        var list = [];
        return {
            register: function (x) {
                //Array
                if (x && x.length > 0) {
                    x.forEach(x => list.push(x));
                    x.forEach(x => extensionPoints.collisions.push(x));
                }
                //Element
                if (x && x.length == undefined) {
                    list.push(x);
                    extensionPoints.collisions.push(x);
                }
            },
            get: function () {
                return list;
            }
        };
    })();
    //List of rendering libraries, plus rendering pipeline
    CLOCKWORKRT.rendering = (function () {
        var renderingLibraries = {};
        var renderingPipeline = ["<previousRenderingPipeline>"];
        return {
            register: function (name, constructor,desc) {
                renderingLibraries[name] = constructor;
                extensionPoints.renderingLibraries.push({name:name,description:desc});
            },
            get: function (name) {
                return renderingLibraries[name];
            },
            setPipeline: function (pipeline) {
                //This pipeline is an array with all the rendering librarie that have to be used
                renderingPipeline = pipeline;
                extensionPoints.renderingPipeline = pipeline;
            },
            getPipeline: function () {
                return renderingPipeline;
            }
        };
    })();
}

function preproccessExtensionPoints(extensionPoints){
    extensionPoints.components.forEach(function(component){
        component.events= component.events.filter(function(e){return e.description});
    })
}

function generateHTML(extensionPoints) {
    var template = pug.compileFile('template.pug');
    return template(extensionPoints);
}

exports.generateDoc=generateDoc;
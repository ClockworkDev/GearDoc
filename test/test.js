var fs = require("fs");
var geardoc = require("../index.js");
[0, 1, 2].forEach(function (n) {
    var clockworkComponent = fs.readFileSync("test/testComponent"+n+".js", 'utf-8');
    var doc = geardoc.generateDoc(clockworkComponent);
    fs.writeFileSync("test/testComponent"+n+".html", doc);
});
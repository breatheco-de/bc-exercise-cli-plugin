var c9workspace = {
    isC9: false,
    name: "undefined",
    owner: "undefined",
    ideUrl: "undefined",
    serverUrl: "undefined"
};
(function () {
    c9workspace.isC9 = (function () { if (process.env.C9_USER === undefined) {
        return false;
    }
    else {
        return true;
    } })();
    c9workspace.owner = process.env.C9_USER;
    c9workspace.name = process.env.C9_PROJECT;
    c9workspace.ideUrl = "https://ide.c9.io/" + process.env.C9_USER + "/" + c9workspace.name;
    c9workspace.serverUrl = "https://" + c9workspace.name + "-" + c9workspace.owner + ".c9user.io";
})();
var c9config = {
    isC9: c9workspace.isC9,
    print: function () {
        console.log(c9workspace);
    },
    workspace: c9workspace
};
module.exports = c9config;
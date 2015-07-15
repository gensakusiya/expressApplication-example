module.exports = {
    "index": function(req, res) {
        res.send('hello world');
    },
    "add": function(req, res) {
        var a = 1 / 0;
        res.send('hello add');
    }
};
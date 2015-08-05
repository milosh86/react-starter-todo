var o = [];

module.exports = {
    seto: function (el) {
      o.push(el);
    },
    
    getall: function () {
        return o.join('');
    }
}

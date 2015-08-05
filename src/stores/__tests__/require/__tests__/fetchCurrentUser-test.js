jest.dontMock('../a.js')
jest.dontMock('../b.js')

describe('TEST', function() {
    var o, b = require('../b.js');
    
    it('class 1', function () {
        o = require('../a.js');
        
        var a = o.getall();
        expect(a).toBe('');
        
        o.seto(1);
        expect(o.getall()).toBe('1');
    });
    
    it('class 2', function () {
        o = require('../a.js');
        b = require('../b.js');
        var a = o.getall();
        expect(a).toBe('5');
        
        o.seto(2);
        expect(o.getall()).toBe('52');
    });
});

'use strict';
import { Clicker } from './clicker';
describe('Clicker', function () {
    it('initialises with the correct name', function () {
        var clicker = new Clicker('12434', 'testClicker');
        expect(clicker.getName()).toEqual('testClicker');
    });
});
//# sourceMappingURL=clicker.spec.js.map
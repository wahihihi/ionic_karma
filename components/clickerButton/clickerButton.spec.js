import { async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { ClickerButton } from './clickerButton';
import { ClickerMock } from '../../models/clicker.mock';
var fixture = null;
var instance = null;
describe('ClickerButton', function () {
    beforeEach(async(function () { return TestUtils.beforeEachCompiler([ClickerButton]).then(function (compiled) {
        fixture = compiled.fixture;
        instance = compiled.instance;
        instance.clicker = new ClickerMock();
    }); }));
    afterEach(function () {
        fixture.destroy();
    });
    it('initialises', function () {
        expect(instance).not.toBeNull();
    });
    it('displays the clicker name and count', function () {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.button-inner')[0].innerHTML).toEqual('TEST CLICKER (10)');
    });
    it('does a click', function () {
        fixture.detectChanges();
        spyOn(instance['clickerService'], 'doClick');
        TestUtils.eventFire(fixture.nativeElement.querySelectorAll('button')[0], 'click');
        expect(instance['clickerService'].doClick).toHaveBeenCalled();
    });
});
//# sourceMappingURL=clickerButton.spec.js.map
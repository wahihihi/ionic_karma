import { FormBuilder } from '@angular/forms';
import { async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { ClickerForm } from './clickerForm';
var fixture = null;
var instance = null;
describe('ClickerForm', function () {
    beforeEach(async(function () { return TestUtils.beforeEachCompiler([ClickerForm]).then(function (compiled) {
        fixture = compiled.fixture;
        instance = compiled.instance;
        instance.clicker = { name: 'TEST CLICKER' };
        instance.clicker.getCount = function () { return 10; };
        fixture.autoDetectChanges(true);
    }); }));
    afterEach(function () {
        fixture.destroy();
    });
    it('initialises', function () {
        expect(fixture).not.toBeNull();
        expect(instance).not.toBeNull();
    });
    it('passes new clicker through to service', function () {
        var clickerName = 'dave';
        instance.form = new FormBuilder().group({ clickerNameInput: [clickerName] });
        spyOn(instance, 'newClicker').and.callThrough();
        spyOn(instance['clickerService'], 'newClicker').and.callThrough();
        fixture.detectChanges();
        fixture.nativeElement.querySelectorAll('button')[1].click();
        expect(instance.newClicker).toHaveBeenCalledWith(Object({ clickerNameInput: clickerName }));
        expect(instance['clickerService'].newClicker).toHaveBeenCalledWith(clickerName);
    });
    it('doesn\'t try to add a clicker with no name', function () {
        spyOn(instance['clickerService'], 'newClicker').and.callThrough();
        instance.newClicker({});
        expect(instance['clickerService'].newClicker).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=clickerForm.spec.js.map
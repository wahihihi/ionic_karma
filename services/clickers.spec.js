import { ClickersService } from './clickers';
import { StorageMock } from './mocks';
var clickers = null;
describe('ClickersService', function () {
    beforeEach(function () {
        clickers = new ClickersService(new StorageMock());
        spyOn(clickers['storage'], 'set').and.callThrough();
    });
    it('initialises', function () {
        expect(clickers).not.toBeNull();
    });
    it('initialises with clickers from mock storage', function (done) {
        clickers['init']()
            .then(function () {
            expect(clickers.getClickers().length).toEqual(StorageMock.CLICKER_IDS.length);
            done();
        });
    });
    it('can initialise a clicker from string', function () {
        var clickerString = '{"id":"0g2vt8qtlm","name":"harold","clicks":[{"time":1450410168819,"location":"TODO"},{"time":1450410168945,"location":"TODO"}]}';
        var clicker = clickers['initClicker'](clickerString);
        expect(clicker.getName()).toEqual('harold');
        expect(clicker.getCount()).toEqual(2);
    });
    it('returns undefined for a bad id', function () {
        expect(clickers.getClicker('dave')).not.toBeDefined();
    });
    it('adds a new clicker with the correct name', function (done) {
        clickers['init']()
            .then(function () {
            var idAdded = clickers.newClicker('dave');
            expect(clickers['storage'].set).toHaveBeenCalledWith(idAdded, jasmine.any(String));
            expect(clickers.getClickers()[3].getName()).toEqual('dave');
            done();
        });
    });
    it('removes a clicker by id', function () {
        var idToRemove = clickers.newClicker('dave');
        clickers.removeClicker(idToRemove);
        expect(clickers['storage'].set).toHaveBeenCalledWith(idToRemove, jasmine.any(String));
    });
    it('does a click', function () {
        var idToClick = clickers.newClicker('dave');
        var clickedClicker = null;
        clickers.doClick(idToClick);
        expect(clickers['storage'].set).toHaveBeenCalledWith(idToClick, jasmine.any(String));
        clickedClicker = clickers.getClicker(idToClick);
        expect(clickedClicker.getCount()).toEqual(1);
    });
    it('loads IDs from storage', function (done) {
        clickers['initIds']()
            .then(function (ids) {
            expect(ids).toEqual(StorageMock.CLICKER_IDS);
            done();
        });
    });
    it('loads clickers from storage', function (done) {
        clickers['initClickers'](StorageMock.CLICKER_IDS)
            .then(function (resolvedClickers) {
            expect(resolvedClickers.length).toEqual(3);
            expect(resolvedClickers[0].getId()).toEqual(StorageMock.CLICKER_IDS[0]);
            expect(resolvedClickers[1].getId()).toEqual(StorageMock.CLICKER_IDS[1]);
            expect(resolvedClickers[2].getId()).toEqual(StorageMock.CLICKER_IDS[2]);
            done();
        });
    });
});
//# sourceMappingURL=clickers.spec.js.map
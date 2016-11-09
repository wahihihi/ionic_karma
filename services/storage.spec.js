import { StorageService } from './';
import { StorageMock } from './mocks';
var storage = null;
describe('StorageService', function () {
    beforeEach(function () {
        spyOn(StorageService, 'initStorage').and.returnValue(new StorageMock());
        storage = new StorageService();
        spyOn(storage['storage'], 'get').and.callThrough();
        spyOn(storage['storage'], 'set').and.callThrough();
        spyOn(storage['storage'], 'remove').and.callThrough();
    });
    it('initialises', function () {
        expect(storage).not.toBeNull();
    });
    it('gets', function () {
        storage.get('dave');
        expect(storage['storage'].get).toHaveBeenCalledWith('dave');
    });
    it('sets', function () {
        storage.set('dave', 'test');
        expect(storage['storage'].set).toHaveBeenCalledWith('dave', 'test');
    });
    it('removes', function () {
        storage.remove('dave');
        expect(storage['storage'].remove).toHaveBeenCalledWith('dave');
    });
});
//# sourceMappingURL=storage.spec.js.map
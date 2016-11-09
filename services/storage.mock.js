'use strict';
export var StorageMock = (function () {
    function StorageMock() {
    }
    StorageMock.prototype.get = function (key) {
        var rtn = null;
        switch (key) {
            case 'ids':
                rtn = JSON.stringify(StorageMock.CLICKER_IDS);
                break;
            case StorageMock.CLICKER_IDS[0]:
                rtn = "{\"id\":\"" + StorageMock.CLICKER_IDS[0] + "\",\"name\":\"test1\",\"clicks\":[{\"time\":1450410168819,\"location\":\"TODO\"}]}";
                break;
            case StorageMock.CLICKER_IDS[1]:
                rtn = "{\"id\":\"" + StorageMock.CLICKER_IDS[1] + "\",\"name\":\"test2\",\"clicks\":[{\"time\":1450410168819,\"location\":\"TODO\"},{\"time\":1450410168945,\"location\":\"TODO\"}]}";
                break;
            case StorageMock.CLICKER_IDS[2]:
                rtn = "{\"id\":\"" + StorageMock.CLICKER_IDS[2] + "\",\"name\":\"test3\", \"clicks\":[{ \"time\": 1450410168819, \"location\": \"TODO\" }, { \"time\": 1450410168945, \"location\": \"TODO\" }] }";
                break;
            default:
                rtn = 'SHOULD NOT BE HERE!';
        }
        return new Promise(function (resolve) {
            resolve(rtn);
        });
    };
    StorageMock.prototype.set = function (key, value) {
        return new Promise(function (resolve) {
            resolve({ key: key, value: value });
        });
    };
    StorageMock.prototype.remove = function (key) {
        return new Promise(function (resolve) {
            resolve({ key: key });
        });
    };
    StorageMock.CLICKER_IDS = ['yy5d8klsj0', 'q20iexxg4a', 'wao2xajl8a'];
    return StorageMock;
}());
//# sourceMappingURL=storage.mock.js.map
export var ClickersServiceMock = (function () {
    function ClickersServiceMock() {
    }
    ClickersServiceMock.prototype.doClick = function () {
        return true;
    };
    ClickersServiceMock.prototype.newClicker = function () {
        return true;
    };
    ClickersServiceMock.prototype.getClickers = function () {
        return [];
    };
    return ClickersServiceMock;
}());
//# sourceMappingURL=clickers.mock.js.map
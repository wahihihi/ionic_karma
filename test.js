import './polyfills.ts';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule } from 'ionic-angular';
import { ConfigMock, NavMock, PlatformMock } from './mocks';
import { ClickersServiceMock } from './services/clickers.mock';
import { ClickersService } from './services';
// Prevent Karma from running prematurely.
__karma__.loaded = function () { };
Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing'),
])
    .then(function (_a) {
    var testing = _a[0], testingBrowser = _a[1];
    testing.getTestBed().initTestEnvironment(testingBrowser.BrowserDynamicTestingModule, testingBrowser.platformBrowserDynamicTesting());
})
    .then(function () { return require.context('./', true, /\.spec\.ts/); })
    .then(function (context) { return context.keys().map(context); })
    .then(__karma__.start, __karma__.error);
export var TestUtils = (function () {
    function TestUtils() {
    }
    TestUtils.beforeEachCompiler = function (components) {
        return TestUtils.configureIonicTestingModule(components)
            .compileComponents().then(function () {
            var fixture = TestBed.createComponent(components[0]);
            return {
                fixture: fixture,
                instance: fixture.debugElement.componentInstance,
            };
        });
    };
    TestUtils.configureIonicTestingModule = function (components) {
        return TestBed.configureTestingModule({
            declarations: components.slice(),
            providers: [
                { provide: App, useClass: ConfigMock },
                { provide: Config, useClass: ConfigMock },
                Form,
                { provide: Keyboard, useClass: ConfigMock },
                { provide: MenuController, useClass: ConfigMock },
                { provide: NavController, useClass: NavMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: ClickersService, useClass: ClickersServiceMock },
            ],
            imports: [
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
            ],
        });
    };
    // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
    TestUtils.eventFire = function (el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        }
        else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    };
    return TestUtils;
}());
//# sourceMappingURL=test.js.map
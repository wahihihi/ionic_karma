'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { StorageService } from './storage';
import { Click, Clicker } from '../models';
export var ClickersService = (function () {
    // don't know why Injection isn't working without @Inject:
    // http://stackoverflow.com/questions/34449486/angular-2-0-injected-http-service-is-undefined
    function ClickersService(storage) {
        this.storage = storage;
        this.ids = [];
        this.clickers = [];
        this.init();
    }
    // as init is async separate logic here so it's testable
    ClickersService.prototype.init = function () {
        var _this = this;
        return this.initIds()
            .then(function (ids) { _this.ids = ids; })
            .then(function () { return _this.initClickers(_this.ids); })
            .then(function (clickers) { return _this.clickers = clickers; });
    };
    // initialise Ids from SQL storage
    ClickersService.prototype.initIds = function () {
        return this.storage.get('ids') // return the promise so we can chain initClickers
            .then(function (rawIds) {
            if (!rawIds)
                return [];
            // ids are stored as stringified JSON array
            return JSON.parse(rawIds);
        });
    };
    // initialise Clickers from SQL storage given an array of ids
    ClickersService.prototype.initClickers = function (ids) {
        var _this = this;
        // get all existing ids
        var proms = [];
        proms = ids.map(function (id) { return _this.storage.get(id); });
        return Promise.all(proms)
            .then(function (clickers) { return clickers.map(function (clicker) { return _this.initClicker(clicker); }); });
    };
    // initialise a clicker from a raw JSON string out of the DB
    ClickersService.prototype.initClicker = function (clicker) {
        var parsedClicker = JSON.parse(clicker);
        var newClicker = new Clicker(parsedClicker['id'], parsedClicker['name']);
        // add the clicks - need to re-instantiate object
        for (var _i = 0, _a = parsedClicker['clicks']; _i < _a.length; _i++) {
            var click = _a[_i];
            newClicker.addClick(new Click(click.time, click.location));
        }
        return newClicker;
    };
    ClickersService.prototype.getClicker = function (id) {
        return this.clickers['find'](function (clicker) { return clicker.getId() === id; });
    };
    ClickersService.prototype.getClickers = function () {
        return this.clickers;
    };
    ClickersService.prototype.newClicker = function (name) {
        var id = this.uid();
        var clicker = new Clicker(id, name);
        // add the clicker to the service
        this.clickers.push(clicker);
        // add the id to the service (need to keep a separate reference of IDs so we can cold load clickers)
        this.ids.push(id);
        // save the clicker by id
        this.storage.set(id, JSON.stringify(clicker));
        // save the service's ids array
        this.storage.set('ids', JSON.stringify(this.ids));
        return id;
    };
    ClickersService.prototype.removeClicker = function (id) {
        // remove clicker from the service
        this.clickers = this.clickers.filter(function (clicker) { return clicker.getId() !== id; });
        // remove from ids array
        this.ids = this.ids.filter(function (filterId) { return filterId !== id; });
        // null id in db
        this.storage.remove(id);
        // update service's ids array
        this.storage.set('ids', JSON.stringify(this.ids));
    };
    ClickersService.prototype.doClick = function (id) {
        var clicker = this.getClicker(id);
        clicker.doClick();
        // save the clicker with updated click in storage
        this.storage.set(clicker.getId(), JSON.stringify(clicker));
    };
    ClickersService.prototype.uid = function () {
        return Math.random().toString(35).substr(2, 10);
    };
    ClickersService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [StorageService])
    ], ClickersService);
    return ClickersService;
}());
//# sourceMappingURL=clickers.js.map
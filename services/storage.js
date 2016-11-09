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
import { Storage } from '@ionic/storage';
export var StorageService = (function () {
    function StorageService() {
        this.storage = StorageService.initStorage();
    }
    StorageService.initStorage = function () {
        return new Storage();
    };
    StorageService.prototype.get = function (key) {
        return this.storage.get(key);
    };
    StorageService.prototype.set = function (key, value) {
        return this.storage.set(key, value);
    };
    StorageService.prototype.remove = function (key) {
        return this.storage.remove(key);
    };
    StorageService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], StorageService);
    return StorageService;
}());
//# sourceMappingURL=storage.js.map
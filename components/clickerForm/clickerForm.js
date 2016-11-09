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
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ClickersService } from '../../services';
export var ClickerForm = (function () {
    function ClickerForm(clickerService, fb) {
        this.clickerService = clickerService;
        this.form = fb.group({
            clickerNameInput: ['', Validators.required],
        });
    }
    ClickerForm.prototype.newClicker = function (formValue) {
        // need to mark the clickerName control as touched so validation
        // will apply after the user has tried to add a clicker
        this.form.controls['clickerNameInput'].markAsTouched();
        if (!this.form.controls['clickerNameInput'].valid) {
            return false;
        }
        this.clickerService.newClicker(formValue['clickerNameInput']);
        this.form.reset();
        return true;
    };
    ClickerForm = __decorate([
        Component({
            selector: 'clicker-form',
            templateUrl: 'clickerForm.html',
        }), 
        __metadata('design:paramtypes', [ClickersService, FormBuilder])
    ], ClickerForm);
    return ClickerForm;
}());
//# sourceMappingURL=clickerForm.js.map
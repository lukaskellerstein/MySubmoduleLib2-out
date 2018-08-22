import { Component, EventEmitter, Input, Output, ComponentFactoryResolver, Directive, ViewContainerRef, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent(fb) {
        this.fb = fb;
        this.config = {};
        this.submit = new EventEmitter();
        this.objectGetKeys = Object.keys;
    }
    Object.defineProperty(DynamicFormComponent.prototype, "controls", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var controls = [];
            Object.keys(this.config).forEach(function (key) {
                /** @type {?} */
                var value = _this.config[key];
                if (!value.hasOwnProperty("name")) {
                    value.name = key;
                }
                controls.push(value);
            });
            return controls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "changes", {
        get: /**
         * @return {?}
         */
        function () { return this.form.valueChanges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "valid", {
        get: /**
         * @return {?}
         */
        function () { return this.form.valid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this.form.value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DynamicFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.form = this.createGroup();
    };
    /**
     * @return {?}
     */
    DynamicFormComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.form) {
            /** @type {?} */
            var controls_1 = Object.keys(this.form.controls);
            /** @type {?} */
            var configControls_1 = this.controls.map(function (item) { return item.name; });
            controls_1
                .filter(function (control) { return !configControls_1.includes(control); })
                .forEach(function (control) { return _this.form.removeControl(control); });
            configControls_1
                .filter(function (control) { return !controls_1.includes(control); })
                .forEach(function (name) {
                /** @type {?} */
                var config = _this.controls.find(function (control) { return control.name === name; });
                _this.form.addControl(name, _this.createControl(config));
            });
        }
    };
    /**
     * @return {?}
     */
    DynamicFormComponent.prototype.createGroup = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var group = this.fb.group({});
        this.controls.forEach(function (control) { return group.addControl(control.name, _this.createControl(control)); });
        return group;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DynamicFormComponent.prototype.createControl = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var disabled = config.disabled, validation = config.validation, value = config.value;
        return this.fb.control({ disabled: disabled, value: value }, validation);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DynamicFormComponent.prototype.handleSubmit = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.submit.emit(this.value);
    };
    /**
     * @param {?} name
     * @param {?} disable
     * @return {?}
     */
    DynamicFormComponent.prototype.setDisabled = /**
     * @param {?} name
     * @param {?} disable
     * @return {?}
     */
    function (name, disable) {
        if (this.form.controls[name]) {
            /** @type {?} */
            var method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }
        this.config = this.controls.map(function (item) {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DynamicFormComponent.prototype.setValue = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    };
    DynamicFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-dynamic-form',
                    exportAs: 'dynamicForm',
                    template: "<form class=\"dynamic-form\" [formGroup]=\"form\" (submit)=\"handleSubmit($event)\">\n  <ng-container *ngFor=\"let fieldKey of objectGetKeys(config);\">\n    key: {{ fieldKey }}\n    <ng-container dynamicField [config]=\"config[fieldKey]\" [name]=\"fieldKey\" [group]=\"form\">\n    </ng-container>\n  </ng-container>\n  <input *ngIf=\"true\" type=\"submit\" name=\"submit\" value=\"Submit\"> \n</form>My ",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    DynamicFormComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    DynamicFormComponent.propDecorators = {
        config: [{ type: Input }],
        submit: [{ type: Output }]
    };
    return DynamicFormComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ObjectLinkComponent = /** @class */ (function () {
    function ObjectLinkComponent() {
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    ObjectLinkComponent.prototype.onLinkClick = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        // TODO: trigger event to add new form to forms container
        ev.stopPropagation();
        ev.preventDefault();
    };
    ObjectLinkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-object-link',
                    template: "<a href=\"#\" (click)=\"onLinkClick($event)\">{{ config.name }}</a>"
                },] },
    ];
    return ObjectLinkComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MyButtonComponent = /** @class */ (function () {
    function MyButtonComponent() {
    }
    MyButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-my-button',
                    template: "<div class=\"dynamic-field form-button\" [formGroup]=\"group\">\n  <button [disabled]=\"config.disabled\" type=\"submit\">\n    {{ config.label }}\n  </button>\n</div>",
                    styles: [""]
                },] },
    ];
    return MyButtonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MyInputComponent = /** @class */ (function () {
    function MyInputComponent() {
    }
    MyInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-my-input',
                    template: "<div class=\"dynamic-field form-input\" [formGroup]=\"group\">\n  <label>{{ config.label }}</label>\n  <input type=\"text\" [attr.placeholder]=\"config.placeholder\" [formControlName]=\"config.name\">\n</div>",
                    styles: [""]
                },] },
    ];
    return MyInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MySelectComponent = /** @class */ (function () {
    function MySelectComponent() {
    }
    MySelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-my-select',
                    template: "<div class=\"dynamic-field form-select\" [formGroup]=\"group\">\n  <label>{{ config.label }}</label>\n  <select [formControlName]=\"config.name\">\n    <option value=\"\">{{ config.placeholder }}</option>\n    <option *ngFor=\"let option of config.options\">\n      {{ option }}\n    </option>\n  </select>\n</div>",
                    styles: [""]
                },] },
    ];
    return MySelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var components = {
    button: MyButtonComponent,
    input: MyInputComponent,
    select: MySelectComponent,
    object: ObjectLinkComponent
};
var DynamicFieldDirective = /** @class */ (function () {
    function DynamicFieldDirective(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    /**
     * @return {?}
     */
    DynamicFieldDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    };
    /**
     * @return {?}
     */
    DynamicFieldDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!components[this.config.type]) {
            /** @type {?} */
            var supportedTypes = Object.keys(components).join(', ');
            throw new Error("Trying to use an unsupported type (" + this.config.type + ").\n        Supported types: " + supportedTypes);
        }
        /** @type {?} */
        var component = this.resolver.resolveComponentFactory(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.buildFieldConfig(this.config);
        this.component.instance.group = this.group;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DynamicFieldDirective.prototype.buildFieldConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (!config.name) {
            config.name = this.name;
            if (!config.label) {
                config.label = this.name;
            }
            // TODO further field config prerender changes
            return config;
        }
    };
    DynamicFieldDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dynamicField]'
                },] },
    ];
    /** @nocollapse */
    DynamicFieldDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef }
    ]; };
    DynamicFieldDirective.propDecorators = {
        config: [{ type: Input }],
        name: [{ type: Input }],
        group: [{ type: Input }]
    };
    return DynamicFieldDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var WidgetsModule = /** @class */ (function () {
    function WidgetsModule() {
    }
    WidgetsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule
                    ],
                    declarations: [MyInputComponent, MyButtonComponent, MySelectComponent, ObjectLinkComponent],
                    exports: [MyInputComponent, MyButtonComponent, MySelectComponent, ObjectLinkComponent],
                    entryComponents: [MyButtonComponent, MyInputComponent, MySelectComponent, ObjectLinkComponent]
                },] },
    ];
    return WidgetsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FormGeneratorModule = /** @class */ (function () {
    function FormGeneratorModule() {
    }
    FormGeneratorModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        WidgetsModule
                    ],
                    declarations: [DynamicFormComponent, DynamicFieldDirective],
                    exports: [DynamicFormComponent, DynamicFieldDirective]
                },] },
    ];
    return FormGeneratorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DynamicFormComponent, DynamicFieldDirective, MyButtonComponent, MyInputComponent, MySelectComponent, ObjectLinkComponent, FormGeneratorModule, WidgetsModule as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC93aWRnZXRzL215LXNlbGVjdC9teS1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2Zvcm0tZ2VuZXJhdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWZvcm0nLFxuICBleHBvcnRBczogJ2R5bmFtaWNGb3JtJyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBjbGFzcz1cImR5bmFtaWMtZm9ybVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGRLZXkgb2Ygb2JqZWN0R2V0S2V5cyhjb25maWcpO1wiPlxuICAgIGtleToge3sgZmllbGRLZXkgfX1cbiAgICA8bmctY29udGFpbmVyIGR5bmFtaWNGaWVsZCBbY29uZmlnXT1cImNvbmZpZ1tmaWVsZEtleV1cIiBbbmFtZV09XCJmaWVsZEtleVwiIFtncm91cF09XCJmb3JtXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8aW5wdXQgKm5nSWY9XCJ0cnVlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiPiBcbjwvZm9ybT5NeSBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZyA9IHt9XG5cbiAgQE91dHB1dCgpXG4gIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgZ2V0IGNvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gW11cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgaWYgKCF2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcIm5hbWVcIikpIHtcbiAgICAgICAgdmFsdWUubmFtZSA9IGtleTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xzLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250cm9scztcbiAgfVxuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlczsgfVxuICBnZXQgdmFsaWQoKSB7IHJldHVybiB0aGlzLmZvcm0udmFsaWQ7IH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLmZvcm0udmFsdWU7IH1cblxuICBvYmplY3RHZXRLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnN0IGNvbmZpZ0NvbnRyb2xzID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSk7XG5cbiAgICAgIGNvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb25maWdDb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKGNvbnRyb2wpID0+IHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKGNvbnRyb2wpKTtcblxuICAgICAgY29uZmlnQ29udHJvbHNcbiAgICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29udHJvbHMuZmluZCgoY29udHJvbCkgPT4gY29udHJvbC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgICB0aGlzLmZvcm0uYWRkQ29udHJvbChuYW1lLCB0aGlzLmNyZWF0ZUNvbnRyb2woY29uZmlnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBncm91cC5hZGRDb250cm9sKGNvbnRyb2wubmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbnRyb2wpKSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbChjb25maWc6IEZpZWxkQ29uZmlnKTogRm9ybUNvbnRyb2wge1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIHZhbGlkYXRpb24sIHZhbHVlIH0gPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXMuZmIuY29udHJvbCh7IGRpc2FibGVkLCB2YWx1ZSB9LCB2YWxpZGF0aW9uKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZChuYW1lOiBzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdKSB7XG4gICAgICBjb25zdCBtZXRob2QgPSBkaXNhYmxlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1vYmplY3QtbGluaycsXG4gIHRlbXBsYXRlOiBgPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib25MaW5rQ2xpY2soJGV2ZW50KVwiPnt7IGNvbmZpZy5uYW1lIH19PC9hPmBcbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0TGlua0NvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkICB7XG5cbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBvbkxpbmtDbGljayhldil7XG4gICAgLy8gVE9ETzogdHJpZ2dlciBldmVudCB0byBhZGQgbmV3IGZvcm0gdG8gZm9ybXMgY29udGFpbmVyIFxuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW15LWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImR5bmFtaWMtZmllbGQgZm9ybS1idXR0b25cIiBbZm9ybUdyb3VwXT1cImdyb3VwXCI+XG4gIDxidXR0b24gW2Rpc2FibGVkXT1cImNvbmZpZy5kaXNhYmxlZFwiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICB7eyBjb25maWcubGFiZWwgfX1cbiAgPC9idXR0b24+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTXlCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBGaWVsZCB7XG4gIGNvbmZpZzogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2Jhc2UvZmllbGQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktaW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkeW5hbWljLWZpZWxkIGZvcm0taW5wdXRcIiBbZm9ybUdyb3VwXT1cImdyb3VwXCI+XG4gIDxsYWJlbD57eyBjb25maWcubGFiZWwgfX08L2xhYmVsPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJjb25maWcucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbmZpZy5uYW1lXCI+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTXlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkICB7XG5cbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW15LXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImR5bmFtaWMtZmllbGQgZm9ybS1zZWxlY3RcIiBbZm9ybUdyb3VwXT1cImdyb3VwXCI+XG4gIDxsYWJlbD57eyBjb25maWcubGFiZWwgfX08L2xhYmVsPlxuICA8c2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwiY29uZmlnLm5hbWVcIj5cbiAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3sgY29uZmlnLnBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5vcHRpb25zXCI+XG4gICAgICB7eyBvcHRpb24gfX1cbiAgICA8L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTXlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBGaWVsZCB7XG5cbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE9iamVjdExpbmtDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvb2JqZWN0LWxpbmsvb2JqZWN0LWxpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi93aWRnZXRzL2Jhc2UvZmllbGQnO1xuaW1wb3J0IHsgTXlCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1pbnB1dC9teS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvbXktc2VsZWN0L215LXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuL3dpZGdldHMvYmFzZS9maWVsZC5jb25maWcnO1xuXG5jb25zdCBjb21wb25lbnRzOiB7IFt0eXBlOiBzdHJpbmddOiBUeXBlPEZpZWxkPiB9ID0ge1xuICBidXR0b246IE15QnV0dG9uQ29tcG9uZW50LFxuICBpbnB1dDogTXlJbnB1dENvbXBvbmVudCxcbiAgc2VsZWN0OiBNeVNlbGVjdENvbXBvbmVudCxcbiAgb2JqZWN0OiBPYmplY3RMaW5rQ29tcG9uZW50XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZHluYW1pY0ZpZWxkXSdcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIGltcGxlbWVudHMgRmllbGQsIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY29uZmlnOiBGaWVsZENvbmZpZztcblxuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxGaWVsZD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIWNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pIHtcbiAgICAgIGNvbnN0IHN1cHBvcnRlZFR5cGVzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cykuam9pbignLCAnKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRyeWluZyB0byB1c2UgYW4gdW5zdXBwb3J0ZWQgdHlwZSAoJHt0aGlzLmNvbmZpZy50eXBlfSkuXG4gICAgICAgIFN1cHBvcnRlZCB0eXBlczogJHtzdXBwb3J0ZWRUeXBlc31gXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PEZpZWxkPihjb21wb25lbnRzW3RoaXMuY29uZmlnLnR5cGVdKTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQpO1xuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuYnVpbGRGaWVsZENvbmZpZyh0aGlzLmNvbmZpZylcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XG4gIH1cblxuICBidWlsZEZpZWxkQ29uZmlnKGNvbmZpZykge1xuICAgIGlmICghY29uZmlnLm5hbWUpIHtcbiAgICAgIGNvbmZpZy5uYW1lID0gdGhpcy5uYW1lO1xuXG4gICAgICBpZiAoIWNvbmZpZy5sYWJlbCkge1xuICAgICAgICBjb25maWcubGFiZWwgPSB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgICAvLyBUT0RPIGZ1cnRoZXIgZmllbGQgY29uZmlnIHByZXJlbmRlciBjaGFuZ2VzXG4gICAgICByZXR1cm4gY29uZmlnO1xuXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE15SW5wdXRDb21wb25lbnQgfSBmcm9tICcuL215LWlucHV0L215LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL215LXNlbGVjdC9teS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IE9iamVjdExpbmtDb21wb25lbnQgfSBmcm9tICcuL29iamVjdC1saW5rL29iamVjdC1saW5rLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNeUlucHV0Q29tcG9uZW50LCBNeUJ1dHRvbkNvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTXlJbnB1dENvbXBvbmVudCwgTXlCdXR0b25Db21wb25lbnQsIE15U2VsZWN0Q29tcG9uZW50LCBPYmplY3RMaW5rQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTXlCdXR0b25Db21wb25lbnQsIE15SW5wdXRDb21wb25lbnQsIE15U2VsZWN0Q29tcG9uZW50LCBPYmplY3RMaW5rQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBXaWRnZXRzTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLWZpZWxkL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFdpZGdldHNNb2R1bGUgfSBmcm9tICcuL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBXaWRnZXRzTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0R5bmFtaWNGb3JtQ29tcG9uZW50LCBEeW5hbWljRmllbGREaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUdlbmVyYXRvck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0lBNkNFLDhCQUFvQixFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtzQkF4QjFCLEVBQUU7c0JBR2lCLElBQUksWUFBWSxFQUFPOzZCQW1CbkMsTUFBTSxDQUFDLElBQUk7S0FFYTtJQWpCeEMsc0JBQUksMENBQVE7Ozs7UUFBWjtZQUFBLGlCQVVDOztZQVRDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHOztnQkFDbEMsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2pDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2lCQUNsQjtnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUNILE9BQU8sUUFBUSxDQUFDO1NBQ2pCOzs7T0FBQTtJQUNELHNCQUFJLHlDQUFPOzs7O1FBQVgsY0FBaUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFOzs7T0FBQTtJQUNqRSxzQkFBSSx1Q0FBSzs7OztRQUFULGNBQWMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzs7T0FBQTtJQUN2QyxzQkFBSSx1Q0FBSzs7OztRQUFULGNBQW1CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7O09BQUE7Ozs7SUFNNUMsdUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENB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
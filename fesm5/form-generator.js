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
        if (!this.form) {
            this.form = this.createGroup();
        }
        /** @type {?} */
        var controls = Object.keys(this.form.controls);
        /** @type {?} */
        var configControls = this.controls.map(function (item) { return item.name; });
        controls
            .filter(function (control) { return !configControls.includes(control); })
            .forEach(function (control) { return _this.form.removeControl(control); });
        configControls
            .filter(function (control) { return !controls.includes(control); })
            .forEach(function (name) {
            /** @type {?} */
            var config = _this.controls.find(function (control) { return control.name === name; });
            _this.form.addControl(name, _this.createControl(config));
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC93aWRnZXRzL215LXNlbGVjdC9teS1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2Zvcm0tZ2VuZXJhdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWZvcm0nLFxuICBleHBvcnRBczogJ2R5bmFtaWNGb3JtJyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBjbGFzcz1cImR5bmFtaWMtZm9ybVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGRLZXkgb2Ygb2JqZWN0R2V0S2V5cyhjb25maWcpO1wiPlxuICAgIGtleToge3sgZmllbGRLZXkgfX1cbiAgICA8bmctY29udGFpbmVyIGR5bmFtaWNGaWVsZCBbY29uZmlnXT1cImNvbmZpZ1tmaWVsZEtleV1cIiBbbmFtZV09XCJmaWVsZEtleVwiIFtncm91cF09XCJmb3JtXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8aW5wdXQgKm5nSWY9XCJ0cnVlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiPiBcbjwvZm9ybT5NeSBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZyA9IHt9XG5cbiAgQE91dHB1dCgpXG4gIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgZ2V0IGNvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gW11cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgaWYgKCF2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcIm5hbWVcIikpIHtcbiAgICAgICAgdmFsdWUubmFtZSA9IGtleTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xzLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250cm9scztcbiAgfVxuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlczsgfVxuICBnZXQgdmFsaWQoKSB7IHJldHVybiB0aGlzLmZvcm0udmFsaWQ7IH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLmZvcm0udmFsdWU7IH1cblxuICBvYmplY3RHZXRLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUdyb3VwKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udHJvbHMgPSBPYmplY3Qua2V5cyh0aGlzLmZvcm0uY29udHJvbHMpO1xuICAgIGNvbnN0IGNvbmZpZ0NvbnRyb2xzID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSk7XG5cbiAgICBjb250cm9sc1xuICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbmZpZ0NvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgLmZvckVhY2goKGNvbnRyb2wpID0+IHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKGNvbnRyb2wpKTtcblxuICAgIGNvbmZpZ0NvbnRyb2xzXG4gICAgICAuZmlsdGVyKChjb250cm9sKSA9PiAhY29udHJvbHMuaW5jbHVkZXMoY29udHJvbCkpXG4gICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbnRyb2xzLmZpbmQoKGNvbnRyb2wpID0+IGNvbnRyb2wubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKG5hbWUsIHRoaXMuY3JlYXRlQ29udHJvbChjb25maWcpKTtcbiAgICAgIH0pO1xuXG5cbiAgfVxuXG4gIGNyZWF0ZUdyb3VwKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gZ3JvdXAuYWRkQ29udHJvbChjb250cm9sLm5hbWUsIHRoaXMuY3JlYXRlQ29udHJvbChjb250cm9sKSkpO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRyb2woY29uZmlnOiBGaWVsZENvbmZpZyk6IEZvcm1Db250cm9sIHtcbiAgICBjb25zdCB7IGRpc2FibGVkLCB2YWxpZGF0aW9uLCB2YWx1ZSB9ID0gY29uZmlnO1xuICAgIHJldHVybiB0aGlzLmZiLmNvbnRyb2woeyBkaXNhYmxlZCwgdmFsdWUgfSwgdmFsaWRhdGlvbik7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWQobmFtZTogc3RyaW5nLCBkaXNhYmxlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXSkge1xuICAgICAgY29uc3QgbWV0aG9kID0gZGlzYWJsZSA/ICdkaXNhYmxlJyA6ICdlbmFibGUnO1xuICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdW21ldGhvZF0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29udHJvbHMubWFwKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZWQgPSBkaXNhYmxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV0uc2V0VmFsdWUodmFsdWUsIHsgZW1pdEV2ZW50OiB0cnVlIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2Jhc2UvZmllbGQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItb2JqZWN0LWxpbmsnLFxuICB0ZW1wbGF0ZTogYDxhIGhyZWY9XCIjXCIgKGNsaWNrKT1cIm9uTGlua0NsaWNrKCRldmVudClcIj57eyBjb25maWcubmFtZSB9fTwvYT5gXG59KVxuZXhwb3J0IGNsYXNzIE9iamVjdExpbmtDb21wb25lbnQgaW1wbGVtZW50cyBGaWVsZCAge1xuXG4gIGNvbmZpZzogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgb25MaW5rQ2xpY2soZXYpe1xuICAgIC8vIFRPRE86IHRyaWdnZXIgZXZlbnQgdG8gYWRkIG5ldyBmb3JtIHRvIGZvcm1zIGNvbnRhaW5lciBcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2Jhc2UvZmllbGQnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1teS1idXR0b24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkeW5hbWljLWZpZWxkIGZvcm0tYnV0dG9uXCIgW2Zvcm1Hcm91cF09XCJncm91cFwiPlxuICA8YnV0dG9uIFtkaXNhYmxlZF09XCJjb25maWcuZGlzYWJsZWRcIiB0eXBlPVwic3VibWl0XCI+XG4gICAge3sgY29uZmlnLmxhYmVsIH19XG4gIDwvYnV0dG9uPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE15QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgRmllbGQge1xuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW15LWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZHluYW1pYy1maWVsZCBmb3JtLWlucHV0XCIgW2Zvcm1Hcm91cF09XCJncm91cFwiPlxuICA8bGFiZWw+e3sgY29uZmlnLmxhYmVsIH19PC9sYWJlbD5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiY29uZmlnLnBsYWNlaG9sZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb25maWcubmFtZVwiPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE15SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBGaWVsZCAge1xuXG4gIGNvbmZpZzogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgXG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2Jhc2UvZmllbGQnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1teS1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkeW5hbWljLWZpZWxkIGZvcm0tc2VsZWN0XCIgW2Zvcm1Hcm91cF09XCJncm91cFwiPlxuICA8bGFiZWw+e3sgY29uZmlnLmxhYmVsIH19PC9sYWJlbD5cbiAgPHNlbGVjdCBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbmZpZy5uYW1lXCI+XG4gICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt7IGNvbmZpZy5wbGFjZWhvbGRlciB9fTwvb3B0aW9uPlxuICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb25maWcub3B0aW9uc1wiPlxuICAgICAge3sgb3B0aW9uIH19XG4gICAgPC9vcHRpb24+XG4gIDwvc2VsZWN0PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE15U2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgRmllbGQge1xuXG4gIGNvbmZpZzogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgVHlwZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBPYmplY3RMaW5rQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL29iamVjdC1saW5rL29iamVjdC1saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4vd2lkZ2V0cy9iYXNlL2ZpZWxkJztcbmltcG9ydCB7IE15QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL215LWJ1dHRvbi9teS1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE15SW5wdXRDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE15U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL215LXNlbGVjdC9teS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi93aWRnZXRzL2Jhc2UvZmllbGQuY29uZmlnJztcblxuY29uc3QgY29tcG9uZW50czogeyBbdHlwZTogc3RyaW5nXTogVHlwZTxGaWVsZD4gfSA9IHtcbiAgYnV0dG9uOiBNeUJ1dHRvbkNvbXBvbmVudCxcbiAgaW5wdXQ6IE15SW5wdXRDb21wb25lbnQsXG4gIHNlbGVjdDogTXlTZWxlY3RDb21wb25lbnQsXG4gIG9iamVjdDogT2JqZWN0TGlua0NvbXBvbmVudFxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2R5bmFtaWNGaWVsZF0nXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIEZpZWxkLCBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogRmllbGRDb25maWc7XG5cbiAgQElucHV0KClcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8RmllbGQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxuICApIHsgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCFjb21wb25lbnRzW3RoaXMuY29uZmlnLnR5cGVdKSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWRUeXBlcyA9IE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmpvaW4oJywgJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBUcnlpbmcgdG8gdXNlIGFuIHVuc3VwcG9ydGVkIHR5cGUgKCR7dGhpcy5jb25maWcudHlwZX0pLlxuICAgICAgICBTdXBwb3J0ZWQgdHlwZXM6ICR7c3VwcG9ydGVkVHlwZXN9YFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxGaWVsZD4oY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSk7XG4gICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5jb25maWcgPSB0aGlzLmJ1aWxkRmllbGRDb25maWcodGhpcy5jb25maWcpXG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICB9XG5cbiAgYnVpbGRGaWVsZENvbmZpZyhjb25maWcpIHtcbiAgICBpZiAoIWNvbmZpZy5uYW1lKSB7XG4gICAgICBjb25maWcubmFtZSA9IHRoaXMubmFtZTtcblxuICAgICAgaWYgKCFjb25maWcubGFiZWwpIHtcbiAgICAgICAgY29uZmlnLmxhYmVsID0gdGhpcy5uYW1lO1xuICAgICAgfVxuICAgICAgLy8gVE9ETyBmdXJ0aGVyIGZpZWxkIGNvbmZpZyBwcmVyZW5kZXIgY2hhbmdlc1xuICAgICAgcmV0dXJuIGNvbmZpZztcblxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNeUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9teS1pbnB1dC9teS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXlCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL215LWJ1dHRvbi9teS1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE15U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9teS1zZWxlY3QvbXktc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYmplY3RMaW5rQ29tcG9uZW50IH0gZnJvbSAnLi9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTXlJbnB1dENvbXBvbmVudCwgTXlCdXR0b25Db21wb25lbnQsIE15U2VsZWN0Q29tcG9uZW50LCBPYmplY3RMaW5rQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW015SW5wdXRDb21wb25lbnQsIE15QnV0dG9uQ29tcG9uZW50LCBNeVNlbGVjdENvbXBvbmVudCwgT2JqZWN0TGlua0NvbXBvbmVudF0sXG4gIGVudHJ5Q29tcG9uZW50czogW015QnV0dG9uQ29tcG9uZW50LCBNeUlucHV0Q29tcG9uZW50LCBNeVNlbGVjdENvbXBvbmVudCwgT2JqZWN0TGlua0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0c01vZHVsZSB7IH1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy1maWVsZC9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXaWRnZXRzTW9kdWxlIH0gZnJvbSAnLi9keW5hbWljLWZpZWxkL3dpZGdldHMvd2lkZ2V0cy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgV2lkZ2V0c01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0R5bmFtaWNGb3JtQ29tcG9uZW50LCBEeW5hbWljRmllbGREaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1HZW5lcmF0b3JNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQTZDRSw4QkFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7c0JBeEIxQixFQUFFO3NCQUdpQixJQUFJLFlBQVksRUFBTzs2QkFtQm5DLE1BQU0sQ0FBQyxJQUFJO0tBRWE7SUFqQnhDLHNCQUFJLDBDQUFROzs7O1FBQVo7WUFBQSxpQkFVQzs7WUFUQyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRzs7Z0JBQ2xDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNqQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDbEI7Z0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QixDQUFDLENBQUM7WUFDSCxPQUFPLFFBQVEsQ0FBQztTQUNqQjs7O09BQUE7SUFDRCxzQkFBSSx5Q0FBTzs7OztRQUFYLGNBQWlDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTs7O09BQUE7SUFDakUsc0JBQUksdUNBQUs7Ozs7UUFBVCxjQUFjLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7O09BQUE7SUFDdkMsc0JBQUksdUNBQUs7Ozs7UUFBVCxjQUFtQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7OztPQUFBOzs7O0lBTTVDLHVDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcs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
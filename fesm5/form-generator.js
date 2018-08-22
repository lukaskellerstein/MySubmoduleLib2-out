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
        this.config = [];
        this.submit = new EventEmitter();
        this.objectGetKeys = Object.keys;
    }
    Object.defineProperty(DynamicFormComponent.prototype, "controls", {
        get: /**
         * @return {?}
         */
        function () { return this.config; },
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
                var config = _this.config.find(function (control) { return control.name === name; });
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
        this.config = this.config.map(function (item) {
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
                    template: "<form class=\"dynamic-form\" [formGroup]=\"form\" (submit)=\"handleSubmit($event)\">\n  <ng-container *ngFor=\"let fieldKey of objectGetKeys(config);\">\n    key: {{ fieldKey }}\n    <ng-container dynamicField [config]=\"config[fieldKey]\" [name]=\"fieldKey\" [group]=\"form\">\n    </ng-container>\n  </ng-container>\n  <input *ngIf=\"true\" type=\"submit\" name=\"submit\" value=\"Submit\"> \n</form>",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC93aWRnZXRzL215LXNlbGVjdC9teS1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2Zvcm0tZ2VuZXJhdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWZvcm0nLFxuICBleHBvcnRBczogJ2R5bmFtaWNGb3JtJyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBjbGFzcz1cImR5bmFtaWMtZm9ybVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGRLZXkgb2Ygb2JqZWN0R2V0S2V5cyhjb25maWcpO1wiPlxuICAgIGtleToge3sgZmllbGRLZXkgfX1cbiAgICA8bmctY29udGFpbmVyIGR5bmFtaWNGaWVsZCBbY29uZmlnXT1cImNvbmZpZ1tmaWVsZEtleV1cIiBbbmFtZV09XCJmaWVsZEtleVwiIFtncm91cF09XCJmb3JtXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8aW5wdXQgKm5nSWY9XCJ0cnVlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiPiBcbjwvZm9ybT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogRmllbGRDb25maWdbXSA9IFtdO1xuXG4gIEBPdXRwdXQoKVxuICBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZm9ybTogRm9ybUdyb3VwO1xuXG4gIGdldCBjb250cm9scygpIHsgcmV0dXJuIHRoaXMuY29uZmlnIH1cbiAgZ2V0IGNoYW5nZXMoKTogT2JzZXJ2YWJsZTxhbnk+IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXM7IH1cbiAgZ2V0IHZhbGlkKCkgeyByZXR1cm4gdGhpcy5mb3JtLnZhbGlkOyB9XG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5mb3JtLnZhbHVlOyB9XG5cbiAgb2JqZWN0R2V0S2V5cyA9IE9iamVjdC5rZXlzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnN0IGNvbmZpZ0NvbnRyb2xzID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSk7XG5cbiAgICAgIGNvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb25maWdDb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKGNvbnRyb2wpID0+IHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKGNvbnRyb2wpKTtcblxuICAgICAgY29uZmlnQ29udHJvbHNcbiAgICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnLmZpbmQoKGNvbnRyb2wpID0+IGNvbnRyb2wubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wobmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbmZpZykpO1xuICAgICAgICB9KTtcblxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUdyb3VwKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gZ3JvdXAuYWRkQ29udHJvbChjb250cm9sLm5hbWUsIHRoaXMuY3JlYXRlQ29udHJvbChjb250cm9sKSkpO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRyb2woY29uZmlnOiBGaWVsZENvbmZpZyk6IEZvcm1Db250cm9sIHtcbiAgICBjb25zdCB7IGRpc2FibGVkLCB2YWxpZGF0aW9uLCB2YWx1ZSB9ID0gY29uZmlnO1xuICAgIHJldHVybiB0aGlzLmZiLmNvbnRyb2woeyBkaXNhYmxlZCwgdmFsdWUgfSwgdmFsaWRhdGlvbik7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWQobmFtZTogc3RyaW5nLCBkaXNhYmxlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXSkge1xuICAgICAgY29uc3QgbWV0aG9kID0gZGlzYWJsZSA/ICdkaXNhYmxlJzogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb25maWcubWFwKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZWQgPSBkaXNhYmxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV0uc2V0VmFsdWUodmFsdWUsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW9iamVjdC1saW5rJyxcbiAgdGVtcGxhdGU6IGA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkxpbmtDbGljaygkZXZlbnQpXCI+e3sgY29uZmlnLm5hbWUgfX08L2E+YFxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RMaW5rQ29tcG9uZW50IGltcGxlbWVudHMgRmllbGQgIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIG9uTGlua0NsaWNrKGV2KXtcbiAgICAvLyBUT0RPOiB0cmlnZ2VyIGV2ZW50IHRvIGFkZCBuZXcgZm9ybSB0byBmb3JtcyBjb250YWluZXIgXG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZHluYW1pYy1maWVsZCBmb3JtLWJ1dHRvblwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiY29uZmlnLmRpc2FibGVkXCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgIHt7IGNvbmZpZy5sYWJlbCB9fVxuICA8L2J1dHRvbj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeUJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkIHtcbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1teS1pbnB1dCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImR5bmFtaWMtZmllbGQgZm9ybS1pbnB1dFwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGxhYmVsPnt7IGNvbmZpZy5sYWJlbCB9fTwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImNvbmZpZy5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29uZmlnLm5hbWVcIj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRmllbGQgIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIFxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZHluYW1pYy1maWVsZCBmb3JtLXNlbGVjdFwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGxhYmVsPnt7IGNvbmZpZy5sYWJlbCB9fTwvbGFiZWw+XG4gIDxzZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJjb25maWcubmFtZVwiPlxuICAgIDxvcHRpb24gdmFsdWU9XCJcIj57eyBjb25maWcucGxhY2Vob2xkZXIgfX08L29wdGlvbj5cbiAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLm9wdGlvbnNcIj5cbiAgICAgIHt7IG9wdGlvbiB9fVxuICAgIDwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL3dpZGdldHMvYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBNeUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL215LWlucHV0L215LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1zZWxlY3QvbXktc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4vd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbmNvbnN0IGNvbXBvbmVudHM6IHsgW3R5cGU6IHN0cmluZ106IFR5cGU8RmllbGQ+IH0gPSB7XG4gIGJ1dHRvbjogTXlCdXR0b25Db21wb25lbnQsXG4gIGlucHV0OiBNeUlucHV0Q29tcG9uZW50LFxuICBzZWxlY3Q6IE15U2VsZWN0Q29tcG9uZW50LFxuICBvYmplY3Q6IE9iamVjdExpbmtDb21wb25lbnRcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkeW5hbWljRmllbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBGaWVsZCwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPEZpZWxkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSkge1xuICAgICAgY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5qb2luKCcsICcpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVHJ5aW5nIHRvIHVzZSBhbiB1bnN1cHBvcnRlZCB0eXBlICgke3RoaXMuY29uZmlnLnR5cGV9KS5cbiAgICAgICAgU3VwcG9ydGVkIHR5cGVzOiAke3N1cHBvcnRlZFR5cGVzfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8RmllbGQ+KGNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5idWlsZEZpZWxkQ29uZmlnKHRoaXMuY29uZmlnKVxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgfVxuXG4gIGJ1aWxkRmllbGRDb25maWcoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcubmFtZSkge1xuICAgICAgY29uZmlnLm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgIGlmICghY29uZmlnLmxhYmVsKSB7XG4gICAgICAgIGNvbmZpZy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE8gZnVydGhlciBmaWVsZCBjb25maWcgcHJlcmVuZGVyIGNoYW5nZXNcbiAgICAgIHJldHVybiBjb25maWc7XG5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTXlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE15QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbXktc2VsZWN0L215LXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vb2JqZWN0LWxpbmsvb2JqZWN0LWxpbmsuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW015SW5wdXRDb21wb25lbnQsIE15QnV0dG9uQ29tcG9uZW50LCBNeVNlbGVjdENvbXBvbmVudCwgT2JqZWN0TGlua0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNeUlucHV0Q29tcG9uZW50LCBNeUJ1dHRvbkNvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNeUJ1dHRvbkNvbXBvbmVudCwgTXlJbnB1dENvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldHNNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtZmllbGQvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV2lkZ2V0c01vZHVsZSB9IGZyb20gJy4vZHluYW1pYy1maWVsZC93aWRnZXRzL3dpZGdldHMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdpZGdldHNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtR2VuZXJhdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7SUFtQ0UsOEJBQW9CLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO3NCQWRYLEVBQUU7c0JBR0UsSUFBSSxZQUFZLEVBQU87NkJBU25DLE1BQU0sQ0FBQyxJQUFJO0tBRVk7SUFQdkMsc0JBQUksMENBQVE7Ozs7UUFBWixjQUFpQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUEsRUFBRTs7O09BQUE7SUFDckMsc0JBQUkseUNBQU87Ozs7UUFBWCxjQUFpQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7OztPQUFBO0lBQ2pFLHNCQUFJLHVDQUFLOzs7O1FBQVQsY0FBYyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7OztPQUFBO0lBQ3ZDLHNCQUFJLHVDQUFLOzs7O1FBQVQsY0FBbUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzs7T0FBQTs7OztJQU01Qyx1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNoQzs7OztJQUVELDBDQUFXOzs7SUFBWDtRQUFBLGlCQWlCQztRQWhCQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7O1lBQ2IsSUFBTSxVQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUNqRCxJQUFNLGdCQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsSUFBSSxHQUFBLENBQUMsQ0FBQztZQUU5RCxVQUFRO2lCQUNMLE1BQU0sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLENBQUMsZ0JBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUEsQ0FBQztpQkFDdEQsT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUEsQ0FBQyxDQUFDO1lBRTFELGdCQUFjO2lCQUNYLE1BQU0sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLENBQUMsVUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBQSxDQUFDO2lCQUNoRCxPQUFPLENBQUMsVUFBQyxJQUFJOztnQkFDWixJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFBLENBQUMsQ0FBQztnQkFDcEUsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN4RCxDQUFDLENBQUM7U0FFTjtLQUNGOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQUEsaUJBSUM7O1FBSEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUM5RixPQUFPLEtBQUssQ0FBQztLQUNkOzs7OztJQUVELDRDQUFhOzs7O0lBQWIsVUFBYyxNQUFtQjtRQUN2QixJQUFBLDBCQUFRLEVBQUUsOEJBQVUsRUFBRSxvQkFBSyxDQUFZO1FBQy9DLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ3pEOzs7OztJQUVELDJDQUFZOzs7O0lBQVosVUFBYSxLQUFZO1FBQ3ZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCOzs7Ozs7SUFFRCwwQ0FBVzs7Ozs7SUFBWCxVQUFZLElBQVksRUFBRSxPQUFnQjtRQUN4QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUM1QixJQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsU0FBUyxHQUFFLFFBQVEsQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ25DLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO1lBQ2pDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDYixDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRUQsdUNBQVE7Ozs7O0lBQVIsVUFBUyxJQUFZLEVBQUUsS0FBVTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDN0Q7O2dCQXhGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxvWkFPSjtvQkFDTixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7Z0JBakJtQixXQUFXOzs7eUJBbUI1QixLQUFLO3lCQUdMLE1BQU07OytCQXZCVDs7Ozs7OztBQ0FBOzs7Ozs7O0lBY0UseUNBQVc7Ozs7SUFBWCxVQUFZLEVBQUU7O1FBRVosRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNyQjs7Z0JBYkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxxRUFBaUU7aUJBQzVFOzs4QkFSRDs7Ozs7OztBQ0FBOzs7O2dCQUtDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLHlLQUlMO29CQUNMLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7NEJBYkQ7Ozs7Ozs7QUNBQTs7OztnQkFLQyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxrTkFHTDtvQkFDTCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7OzJCQVpEOzs7Ozs7O0FDQUE7Ozs7Z0JBS0MsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsNFRBUUw7b0JBQ0wsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs0QkFqQkQ7Ozs7Ozs7QUNBQTtBQVVBLElBQU0sVUFBVSxHQUFvQztJQUNsRCxNQUFNLEVBQUUsaUJBQWlCO0lBQ3pCLEtBQUssRUFBRSxnQkFBZ0I7SUFDdkIsTUFBTSxFQUFFLGlCQUFpQjtJQUN6QixNQUFNLEVBQUUsbUJBQW1CO0NBQzVCLENBQUM7O0lBaUJBLCtCQUNVLFVBQ0E7UUFEQSxhQUFRLEdBQVIsUUFBUTtRQUNSLGNBQVMsR0FBVCxTQUFTO0tBQ2Q7Ozs7SUFFTCwyQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDNUM7S0FDRjs7OztJQUVELHdDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFDakMsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDYix3Q0FBc0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFDQUNuQyxjQUFnQixDQUNwQyxDQUFDO1NBQ0g7O1FBQ0QsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBUSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUM7Ozs7O0lBRUQsZ0RBQWdCOzs7O0lBQWhCLFVBQWlCLE1BQU07UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDaEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNqQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDMUI7O1lBRUQsT0FBTyxNQUFNLENBQUM7U0FFZjtLQUNGOztnQkFwREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCOzs7O2dCQW5CUSx3QkFBd0I7Z0JBQTJELGdCQUFnQjs7O3lCQXFCekcsS0FBSzt1QkFHTCxLQUFLO3dCQUdMLEtBQUs7O2dDQTNCUjs7Ozs7OztBQ0FBOzs7O2dCQVNDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjtxQkFDcEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUM7b0JBQzNGLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDO29CQUN0RixlQUFlLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQztpQkFDL0Y7O3dCQWxCRDs7Ozs7OztBQ0FBOzs7O2dCQVFDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsYUFBYTtxQkFDZDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxxQkFBcUIsQ0FBQztvQkFDM0QsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLENBQUM7aUJBQ3ZEOzs4QkFqQkQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==
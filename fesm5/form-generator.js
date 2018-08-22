import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ComponentFactoryResolver, Directive, ViewContainerRef, NgModule } from '@angular/core';
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
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush
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
        }
        if (!config.label) {
            config.label = this.name;
        }
        // TODO further field config prerender changes
        return config;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC93aWRnZXRzL215LXNlbGVjdC9teS1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2Zvcm0tZ2VuZXJhdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9keW5hbWljLWZpZWxkL3dpZGdldHMvYmFzZS9maWVsZC5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgZXhwb3J0QXM6ICdkeW5hbWljRm9ybScsXG4gIHRlbXBsYXRlOiBgPGZvcm0gY2xhc3M9XCJkeW5hbWljLWZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIiAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkS2V5IG9mIG9iamVjdEdldEtleXMoY29uZmlnKTtcIj5cbiAgICBrZXk6IHt7IGZpZWxkS2V5IH19XG4gICAgPG5nLWNvbnRhaW5lciBkeW5hbWljRmllbGQgW2NvbmZpZ109XCJjb25maWdbZmllbGRLZXldXCIgW25hbWVdPVwiZmllbGRLZXlcIiBbZ3JvdXBdPVwiZm9ybVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGlucHV0ICpuZ0lmPVwidHJ1ZVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXRcIj4gXG48L2Zvcm0+TXkgYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY29uZmlnID0ge31cblxuICBAT3V0cHV0KClcbiAgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBnZXQgY29udHJvbHMoKSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBbXVxuICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29uZmlnW2tleV07XG4gICAgICBpZiAoIXZhbHVlLmhhc093blByb3BlcnR5KFwibmFtZVwiKSkge1xuICAgICAgICB2YWx1ZS5uYW1lID0ga2V5O1xuICAgICAgfVxuICAgICAgY29udHJvbHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnRyb2xzO1xuICB9XG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzOyB9XG4gIGdldCB2YWxpZCgpIHsgcmV0dXJuIHRoaXMuZm9ybS52YWxpZDsgfVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTsgfVxuXG4gIG9iamVjdEdldEtleXMgPSBPYmplY3Qua2V5cztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVHcm91cCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybS5jb250cm9scyk7XG4gICAgY29uc3QgY29uZmlnQ29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLm1hcCgoaXRlbSkgPT4gaXRlbS5uYW1lKTtcblxuICAgIGNvbnRyb2xzXG4gICAgICAuZmlsdGVyKChjb250cm9sKSA9PiAhY29uZmlnQ29udHJvbHMuaW5jbHVkZXMoY29udHJvbCkpXG4gICAgICAuZm9yRWFjaCgoY29udHJvbCkgPT4gdGhpcy5mb3JtLnJlbW92ZUNvbnRyb2woY29udHJvbCkpO1xuXG4gICAgY29uZmlnQ29udHJvbHNcbiAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29udHJvbHMuZmluZCgoY29udHJvbCkgPT4gY29udHJvbC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wobmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbmZpZykpO1xuICAgICAgfSk7XG5cblxuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBncm91cC5hZGRDb250cm9sKGNvbnRyb2wubmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbnRyb2wpKSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbChjb25maWc6IEZpZWxkQ29uZmlnKTogRm9ybUNvbnRyb2wge1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIHZhbGlkYXRpb24sIHZhbHVlIH0gPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXMuZmIuY29udHJvbCh7IGRpc2FibGVkLCB2YWx1ZSB9LCB2YWxpZGF0aW9uKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZChuYW1lOiBzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdKSB7XG4gICAgICBjb25zdCBtZXRob2QgPSBkaXNhYmxlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1vYmplY3QtbGluaycsXG4gIHRlbXBsYXRlOiBgPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib25MaW5rQ2xpY2soJGV2ZW50KVwiPnt7IGNvbmZpZy5uYW1lIH19PC9hPmBcbn0pXG5leHBvcnQgY2xhc3MgT2JqZWN0TGlua0NvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkICB7XG5cbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBvbkxpbmtDbGljayhldil7XG4gICAgLy8gVE9ETzogdHJpZ2dlciBldmVudCB0byBhZGQgbmV3IGZvcm0gdG8gZm9ybXMgY29udGFpbmVyIFxuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW15LWJ1dHRvbicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImR5bmFtaWMtZmllbGQgZm9ybS1idXR0b25cIiBbZm9ybUdyb3VwXT1cImdyb3VwXCI+XG4gIDxidXR0b24gW2Rpc2FibGVkXT1cImNvbmZpZy5kaXNhYmxlZFwiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICB7eyBjb25maWcubGFiZWwgfX1cbiAgPC9idXR0b24+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTXlCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBGaWVsZCB7XG4gIGNvbmZpZzogRmllbGRDb25maWc7XG4gIGdyb3VwOiBGb3JtR3JvdXA7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2Jhc2UvZmllbGQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktaW5wdXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkeW5hbWljLWZpZWxkIGZvcm0taW5wdXRcIiBbZm9ybUdyb3VwXT1cImdyb3VwXCI+XG4gIDxsYWJlbD57eyBjb25maWcubGFiZWwgfX08L2xhYmVsPlxuICA8aW5wdXQgdHlwZT1cInRleHRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJjb25maWcucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbmZpZy5uYW1lXCI+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTXlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkICB7XG5cbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW15LXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImR5bmFtaWMtZmllbGQgZm9ybS1zZWxlY3RcIiBbZm9ybUdyb3VwXT1cImdyb3VwXCI+XG4gIDxsYWJlbD57eyBjb25maWcubGFiZWwgfX08L2xhYmVsPlxuICA8c2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwiY29uZmlnLm5hbWVcIj5cbiAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e3sgY29uZmlnLnBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNvbmZpZy5vcHRpb25zXCI+XG4gICAgICB7eyBvcHRpb24gfX1cbiAgICA8L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTXlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBGaWVsZCB7XG5cbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE9iamVjdExpbmtDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvb2JqZWN0LWxpbmsvb2JqZWN0LWxpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi93aWRnZXRzL2Jhc2UvZmllbGQnO1xuaW1wb3J0IHsgTXlCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1pbnB1dC9teS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXlTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvbXktc2VsZWN0L215LXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuL3dpZGdldHMvYmFzZS9maWVsZC5jb25maWcnO1xuXG5jb25zdCBjb21wb25lbnRzOiB7IFt0eXBlOiBzdHJpbmddOiBUeXBlPEZpZWxkPiB9ID0ge1xuICBidXR0b246IE15QnV0dG9uQ29tcG9uZW50LFxuICBpbnB1dDogTXlJbnB1dENvbXBvbmVudCxcbiAgc2VsZWN0OiBNeVNlbGVjdENvbXBvbmVudCxcbiAgb2JqZWN0OiBPYmplY3RMaW5rQ29tcG9uZW50XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZHluYW1pY0ZpZWxkXSdcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIGltcGxlbWVudHMgRmllbGQsIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY29uZmlnOiBGaWVsZENvbmZpZztcblxuICBASW5wdXQoKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxGaWVsZD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIWNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pIHtcbiAgICAgIGNvbnN0IHN1cHBvcnRlZFR5cGVzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cykuam9pbignLCAnKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRyeWluZyB0byB1c2UgYW4gdW5zdXBwb3J0ZWQgdHlwZSAoJHt0aGlzLmNvbmZpZy50eXBlfSkuXG4gICAgICAgIFN1cHBvcnRlZCB0eXBlczogJHtzdXBwb3J0ZWRUeXBlc31gXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PEZpZWxkPihjb21wb25lbnRzW3RoaXMuY29uZmlnLnR5cGVdKTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQpO1xuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuYnVpbGRGaWVsZENvbmZpZyh0aGlzLmNvbmZpZylcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XG4gIH1cblxuICBidWlsZEZpZWxkQ29uZmlnKGNvbmZpZykge1xuICAgIGlmICghY29uZmlnLm5hbWUpIHtcbiAgICAgIGNvbmZpZy5uYW1lID0gdGhpcy5uYW1lO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmxhYmVsKSB7XG4gICAgICBjb25maWcubGFiZWwgPSB0aGlzLm5hbWU7XG4gICAgfVxuICAgIC8vIFRPRE8gZnVydGhlciBmaWVsZCBjb25maWcgcHJlcmVuZGVyIGNoYW5nZXNcbiAgICByZXR1cm4gY29uZmlnO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTXlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE15QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbXktc2VsZWN0L215LXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vb2JqZWN0LWxpbmsvb2JqZWN0LWxpbmsuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW015SW5wdXRDb21wb25lbnQsIE15QnV0dG9uQ29tcG9uZW50LCBNeVNlbGVjdENvbXBvbmVudCwgT2JqZWN0TGlua0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNeUlucHV0Q29tcG9uZW50LCBNeUJ1dHRvbkNvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNeUJ1dHRvbkNvbXBvbmVudCwgTXlJbnB1dENvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldHNNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtZmllbGQvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV2lkZ2V0c01vZHVsZSB9IGZyb20gJy4vZHluYW1pYy1maWVsZC93aWRnZXRzL3dpZGdldHMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdpZGdldHNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtR2VuZXJhdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7SUE4Q0UsOEJBQW9CLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO3NCQXhCMUIsRUFBRTtzQkFHaUIsSUFBSSxZQUFZLEVBQU87NkJBbUJuQyxNQUFNLENBQUMsSUFBSTtLQUVhO0lBakJ4QyxzQkFBSSwwQ0FBUTs7OztRQUFaO1lBQUEsaUJBVUM7O1lBVEMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFBO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7O2dCQUNsQyxJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDakMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7aUJBQ2xCO2dCQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxRQUFRLENBQUM7U0FDakI7OztPQUFBO0lBQ0Qsc0JBQUkseUNBQU87Ozs7UUFBWCxjQUFpQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7OztPQUFBO0lBQ2pFLHNCQUFJLHVDQUFLOzs7O1FBQVQsY0FBYyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7OztPQUFBO0lBQ3ZDLHNCQUFJLHVDQUFLOzs7O1FBQVQsY0FBbUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtB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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('form-generator', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['form-generator'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DynamicFormComponent = (function () {
        function DynamicFormComponent(fb) {
            this.fb = fb;
            this.config = [];
            this.submit = new core.EventEmitter();
        }
        Object.defineProperty(DynamicFormComponent.prototype, "controls", {
            get: /**
             * @return {?}
             */ function () {
                return this.config.filter(function (_a) {
                    var type = _a.type;
                    return type !== 'button';
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormComponent.prototype, "changes", {
            get: /**
             * @return {?}
             */ function () { return this.form.valueChanges; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormComponent.prototype, "valid", {
            get: /**
             * @return {?}
             */ function () { return this.form.valid; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormComponent.prototype, "value", {
            get: /**
             * @return {?}
             */ function () { return this.form.value; },
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
            { type: core.Component, args: [{
                        selector: 'lib-dynamic-form',
                        exportAs: 'dynamicForm',
                        template: "<form class=\"dynamic-form\" [formGroup]=\"form\" (submit)=\"handleSubmit($event)\">\n  <ng-container *ngFor=\"let field of config | keyvalue;\">\n    {{ field | json }}\n    <ng-container dynamicField [config]=\"field.value\" [name]=\"field.key\" [group]=\"form\">\n    </ng-container>\n  </ng-container>\n  <input *ngIf=\"true\" type=\"submit\" name=\"submit\" value=\"Submit\"> \n</form>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DynamicFormComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder }
            ];
        };
        DynamicFormComponent.propDecorators = {
            config: [{ type: core.Input }],
            submit: [{ type: core.Output }]
        };
        return DynamicFormComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ObjectLinkComponent = (function () {
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
            { type: core.Component, args: [{
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
    var MyButtonComponent = (function () {
        function MyButtonComponent() {
        }
        MyButtonComponent.decorators = [
            { type: core.Component, args: [{
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
    var MyInputComponent = (function () {
        function MyInputComponent() {
        }
        MyInputComponent.decorators = [
            { type: core.Component, args: [{
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
    var MySelectComponent = (function () {
        function MySelectComponent() {
        }
        MySelectComponent.decorators = [
            { type: core.Component, args: [{
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
    var DynamicFieldDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: '[dynamicField]'
                    },] },
        ];
        /** @nocollapse */
        DynamicFieldDirective.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef }
            ];
        };
        DynamicFieldDirective.propDecorators = {
            config: [{ type: core.Input }],
            name: [{ type: core.Input }],
            group: [{ type: core.Input }]
        };
        return DynamicFieldDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var WidgetsModule = (function () {
        function WidgetsModule() {
        }
        WidgetsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule
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
    var FormGeneratorModule = (function () {
        function FormGeneratorModule() {
        }
        FormGeneratorModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
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

    exports.DynamicFormComponent = DynamicFormComponent;
    exports.DynamicFieldDirective = DynamicFieldDirective;
    exports.MyButtonComponent = MyButtonComponent;
    exports.MyInputComponent = MyInputComponent;
    exports.MySelectComponent = MySelectComponent;
    exports.ObjectLinkComponent = ObjectLinkComponent;
    exports.FormGeneratorModule = FormGeneratorModule;
    exports.ɵa = WidgetsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvb2JqZWN0LWxpbmsvb2JqZWN0LWxpbmsuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC93aWRnZXRzL215LWJ1dHRvbi9teS1idXR0b24uY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC93aWRnZXRzL215LWlucHV0L215LWlucHV0LmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9teS1zZWxlY3QvbXktc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvd2lkZ2V0cy5tb2R1bGUudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9mb3JtLWdlbmVyYXRvci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9keW5hbWljLWZpZWxkL3dpZGdldHMvYmFzZS9maWVsZC5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgZXhwb3J0QXM6ICdkeW5hbWljRm9ybScsXG4gIHRlbXBsYXRlOiBgPGZvcm0gY2xhc3M9XCJkeW5hbWljLWZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIiAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGNvbmZpZyB8IGtleXZhbHVlO1wiPlxuICAgIHt7IGZpZWxkIHwganNvbiB9fVxuICAgIDxuZy1jb250YWluZXIgZHluYW1pY0ZpZWxkIFtjb25maWddPVwiZmllbGQudmFsdWVcIiBbbmFtZV09XCJmaWVsZC5rZXlcIiBbZ3JvdXBdPVwiZm9ybVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGlucHV0ICpuZ0lmPVwidHJ1ZVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXRcIj4gXG48L2Zvcm0+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnW10gPSBbXTtcblxuICBAT3V0cHV0KClcbiAgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBnZXQgY29udHJvbHMoKSB7IHJldHVybiB0aGlzLmNvbmZpZy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSAhPT0gJ2J1dHRvbicpOyB9XG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzOyB9XG4gIGdldCB2YWxpZCgpIHsgcmV0dXJuIHRoaXMuZm9ybS52YWxpZDsgfVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTsgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnN0IGNvbmZpZ0NvbnRyb2xzID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSk7XG5cbiAgICAgIGNvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb25maWdDb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKGNvbnRyb2wpID0+IHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKGNvbnRyb2wpKTtcblxuICAgICAgY29uZmlnQ29udHJvbHNcbiAgICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnLmZpbmQoKGNvbnRyb2wpID0+IGNvbnRyb2wubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wobmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbmZpZykpO1xuICAgICAgICB9KTtcblxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUdyb3VwKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gZ3JvdXAuYWRkQ29udHJvbChjb250cm9sLm5hbWUsIHRoaXMuY3JlYXRlQ29udHJvbChjb250cm9sKSkpO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRyb2woY29uZmlnOiBGaWVsZENvbmZpZyk6IEZvcm1Db250cm9sIHtcbiAgICBjb25zdCB7IGRpc2FibGVkLCB2YWxpZGF0aW9uLCB2YWx1ZSB9ID0gY29uZmlnO1xuICAgIHJldHVybiB0aGlzLmZiLmNvbnRyb2woeyBkaXNhYmxlZCwgdmFsdWUgfSwgdmFsaWRhdGlvbik7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWQobmFtZTogc3RyaW5nLCBkaXNhYmxlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXSkge1xuICAgICAgY29uc3QgbWV0aG9kID0gZGlzYWJsZSA/ICdkaXNhYmxlJzogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb25maWcubWFwKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZWQgPSBkaXNhYmxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV0uc2V0VmFsdWUodmFsdWUsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW9iamVjdC1saW5rJyxcbiAgdGVtcGxhdGU6IGA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkxpbmtDbGljaygkZXZlbnQpXCI+e3sgY29uZmlnLm5hbWUgfX08L2E+YFxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RMaW5rQ29tcG9uZW50IGltcGxlbWVudHMgRmllbGQgIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIG9uTGlua0NsaWNrKGV2KXtcbiAgICAvLyBUT0RPOiB0cmlnZ2VyIGV2ZW50IHRvIGFkZCBuZXcgZm9ybSB0byBmb3JtcyBjb250YWluZXIgXG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZHluYW1pYy1maWVsZCBmb3JtLWJ1dHRvblwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiY29uZmlnLmRpc2FibGVkXCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgIHt7IGNvbmZpZy5sYWJlbCB9fVxuICA8L2J1dHRvbj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeUJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkIHtcbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1teS1pbnB1dCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImR5bmFtaWMtZmllbGQgZm9ybS1pbnB1dFwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGxhYmVsPnt7IGNvbmZpZy5sYWJlbCB9fTwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImNvbmZpZy5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29uZmlnLm5hbWVcIj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRmllbGQgIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIFxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZHluYW1pYy1maWVsZCBmb3JtLXNlbGVjdFwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGxhYmVsPnt7IGNvbmZpZy5sYWJlbCB9fTwvbGFiZWw+XG4gIDxzZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJjb25maWcubmFtZVwiPlxuICAgIDxvcHRpb24gdmFsdWU9XCJcIj57eyBjb25maWcucGxhY2Vob2xkZXIgfX08L29wdGlvbj5cbiAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLm9wdGlvbnNcIj5cbiAgICAgIHt7IG9wdGlvbiB9fVxuICAgIDwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL3dpZGdldHMvYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBNeUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL215LWlucHV0L215LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1zZWxlY3QvbXktc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4vd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbmNvbnN0IGNvbXBvbmVudHM6IHsgW3R5cGU6IHN0cmluZ106IFR5cGU8RmllbGQ+IH0gPSB7XG4gIGJ1dHRvbjogTXlCdXR0b25Db21wb25lbnQsXG4gIGlucHV0OiBNeUlucHV0Q29tcG9uZW50LFxuICBzZWxlY3Q6IE15U2VsZWN0Q29tcG9uZW50LFxuICBvYmplY3Q6IE9iamVjdExpbmtDb21wb25lbnRcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkeW5hbWljRmllbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBGaWVsZCwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPEZpZWxkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSkge1xuICAgICAgY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5qb2luKCcsICcpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVHJ5aW5nIHRvIHVzZSBhbiB1bnN1cHBvcnRlZCB0eXBlICgke3RoaXMuY29uZmlnLnR5cGV9KS5cbiAgICAgICAgU3VwcG9ydGVkIHR5cGVzOiAke3N1cHBvcnRlZFR5cGVzfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8RmllbGQ+KGNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5idWlsZEZpZWxkQ29uZmlnKHRoaXMuY29uZmlnKVxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgfVxuXG4gIGJ1aWxkRmllbGRDb25maWcoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcubmFtZSkge1xuICAgICAgY29uZmlnLm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgIGlmICghY29uZmlnLmxhYmVsKSB7XG4gICAgICAgIGNvbmZpZy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE8gZnVydGhlciBmaWVsZCBjb25maWcgcHJlcmVuZGVyIGNoYW5nZXNcbiAgICAgIHJldHVybiBjb25maWc7XG5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTXlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE15QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbXktc2VsZWN0L215LXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vb2JqZWN0LWxpbmsvb2JqZWN0LWxpbmsuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW015SW5wdXRDb21wb25lbnQsIE15QnV0dG9uQ29tcG9uZW50LCBNeVNlbGVjdENvbXBvbmVudCwgT2JqZWN0TGlua0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNeUlucHV0Q29tcG9uZW50LCBNeUJ1dHRvbkNvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNeUJ1dHRvbkNvbXBvbmVudCwgTXlJbnB1dENvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldHNNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtZmllbGQvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV2lkZ2V0c01vZHVsZSB9IGZyb20gJy4vZHluYW1pYy1maWVsZC93aWRnZXRzL3dpZGdldHMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdpZGdldHNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtR2VuZXJhdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkZvcm1CdWlsZGVyIiwiSW5wdXQiLCJPdXRwdXQiLCJEaXJlY3RpdmUiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJWaWV3Q29udGFpbmVyUmVmIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIs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
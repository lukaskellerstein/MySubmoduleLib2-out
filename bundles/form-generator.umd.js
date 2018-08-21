(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('MySubmoduleLib1'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('form-generator', ['exports', '@angular/core', '@angular/forms', 'MySubmoduleLib1', '@angular/common'], factory) :
    (factory((global['form-generator'] = {}),global.ng.core,global.ng.forms,null,global.ng.common));
}(this, (function (exports,core,forms,MySubmoduleLib1,common) { 'use strict';

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
                        template: "<form class=\"dynamic-form\" [formGroup]=\"form\" (submit)=\"handleSubmit($event)\">\n  <ng-container *ngFor=\"let field of config;\" dynamicField [config]=\"field\" [group]=\"form\">\n  </ng-container>\n</form>",
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
    /** @type {?} */
    var components = {
        button: MySubmoduleLib1.MyButtonComponent,
        input: MySubmoduleLib1.MyInputComponent,
        select: MySubmoduleLib1.MySelectComponent
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
                this.component.instance.config = this.config;
                this.component.instance.group = this.group;
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
            group: [{ type: core.Input }]
        };
        return DynamicFieldDirective;
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
                            MySubmoduleLib1.UiComponentsModule
                        ],
                        declarations: [DynamicFormComponent, DynamicFieldDirective],
                        exports: [DynamicFormComponent, DynamicFieldDirective],
                        entryComponents: [MySubmoduleLib1.MyButtonComponent, MySubmoduleLib1.MyInputComponent, MySubmoduleLib1.MySelectComponent]
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
    exports.FormGeneratorModule = FormGeneratorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZm9ybS1nZW5lcmF0b3IubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZpZWxkQ29uZmlnfSBmcm9tICdNeVN1Ym1vZHVsZUxpYjEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgZXhwb3J0QXM6ICdkeW5hbWljRm9ybScsXG4gIHRlbXBsYXRlOiBgPGZvcm0gY2xhc3M9XCJkeW5hbWljLWZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIiAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGNvbmZpZztcIiBkeW5hbWljRmllbGQgW2NvbmZpZ109XCJmaWVsZFwiIFtncm91cF09XCJmb3JtXCI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9mb3JtPmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY29uZmlnOiBGaWVsZENvbmZpZ1tdID0gW107XG5cbiAgQE91dHB1dCgpXG4gIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgZ2V0IGNvbnRyb2xzKCkgeyByZXR1cm4gdGhpcy5jb25maWcuZmlsdGVyKCh7dHlwZX0pID0+IHR5cGUgIT09ICdidXR0b24nKTsgfVxuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlczsgfVxuICBnZXQgdmFsaWQoKSB7IHJldHVybiB0aGlzLmZvcm0udmFsaWQ7IH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLmZvcm0udmFsdWU7IH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUdyb3VwKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5mb3JtKSB7XG4gICAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybS5jb250cm9scyk7XG4gICAgICBjb25zdCBjb25maWdDb250cm9scyA9IHRoaXMuY29udHJvbHMubWFwKChpdGVtKSA9PiBpdGVtLm5hbWUpO1xuXG4gICAgICBjb250cm9sc1xuICAgICAgICAuZmlsdGVyKChjb250cm9sKSA9PiAhY29uZmlnQ29udHJvbHMuaW5jbHVkZXMoY29udHJvbCkpXG4gICAgICAgIC5mb3JFYWNoKChjb250cm9sKSA9PiB0aGlzLmZvcm0ucmVtb3ZlQ29udHJvbChjb250cm9sKSk7XG5cbiAgICAgIGNvbmZpZ0NvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZy5maW5kKChjb250cm9sKSA9PiBjb250cm9sLm5hbWUgPT09IG5hbWUpO1xuICAgICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKG5hbWUsIHRoaXMuY3JlYXRlQ29udHJvbChjb25maWcpKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG4gIH1cblxuICBjcmVhdGVHcm91cCgpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IGdyb3VwLmFkZENvbnRyb2woY29udHJvbC5uYW1lLCB0aGlzLmNyZWF0ZUNvbnRyb2woY29udHJvbCkpKTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBjcmVhdGVDb250cm9sKGNvbmZpZzogRmllbGRDb25maWcpOiBGb3JtQ29udHJvbCB7XG4gICAgY29uc3QgeyBkaXNhYmxlZCwgdmFsaWRhdGlvbiwgdmFsdWUgfSA9IGNvbmZpZztcbiAgICByZXR1cm4gdGhpcy5mYi5jb250cm9sKHsgZGlzYWJsZWQsIHZhbHVlIH0sIHZhbGlkYXRpb24pO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zdWJtaXQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldERpc2FibGVkKG5hbWU6IHN0cmluZywgZGlzYWJsZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHNbbmFtZV0pIHtcbiAgICAgIGNvbnN0IG1ldGhvZCA9IGRpc2FibGUgPyAnZGlzYWJsZSc6ICdlbmFibGUnO1xuICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdW21ldGhvZF0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBpdGVtLmRpc2FibGVkID0gZGlzYWJsZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdLnNldFZhbHVlKHZhbHVlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgVHlwZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge015QnV0dG9uQ29tcG9uZW50LCBNeUlucHV0Q29tcG9uZW50LCBNeVNlbGVjdENvbXBvbmVudCwgRmllbGQsIEZpZWxkQ29uZmlnfSBmcm9tICdNeVN1Ym1vZHVsZUxpYjEnO1xuXG5jb25zdCBjb21wb25lbnRzOiB7W3R5cGU6IHN0cmluZ106IFR5cGU8RmllbGQ+fSA9IHtcbiAgYnV0dG9uOiAgTXlCdXR0b25Db21wb25lbnQsXG4gIGlucHV0OiBNeUlucHV0Q29tcG9uZW50LFxuICBzZWxlY3Q6IE15U2VsZWN0Q29tcG9uZW50XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZHluYW1pY0ZpZWxkXSdcbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIGltcGxlbWVudHMgRmllbGQsIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY29uZmlnOiBGaWVsZENvbmZpZztcblxuICBASW5wdXQoKVxuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPEZpZWxkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCFjb21wb25lbnRzW3RoaXMuY29uZmlnLnR5cGVdKSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWRUeXBlcyA9IE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmpvaW4oJywgJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBUcnlpbmcgdG8gdXNlIGFuIHVuc3VwcG9ydGVkIHR5cGUgKCR7dGhpcy5jb25maWcudHlwZX0pLlxuICAgICAgICBTdXBwb3J0ZWQgdHlwZXM6ICR7c3VwcG9ydGVkVHlwZXN9YFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxGaWVsZD4oY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSk7XG4gICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5ncm91cCA9IHRoaXMuZ3JvdXA7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFVpQ29tcG9uZW50c01vZHVsZSwgTXlCdXR0b25Db21wb25lbnQsIE15SW5wdXRDb21wb25lbnQsIE15U2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnTXlTdWJtb2R1bGVMaWIxJztcbmltcG9ydCB7IER5bmFtaWNGaWVsZERpcmVjdGl2ZSB9IGZyb20gJy4vZHluYW1pYy1maWVsZC9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBVaUNvbXBvbmVudHNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTXlCdXR0b25Db21wb25lbnQsIE15SW5wdXRDb21wb25lbnQsIE15U2VsZWN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtR2VuZXJhdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkZvcm1CdWlsZGVyIiwiSW5wdXQiLCJPdXRwdXQiLCJNeUJ1dHRvbkNvbXBvbmVudCIsIk15SW5wdXRDb21wb25lbnQiLCJNeVNlbGVjdENvbXBvbmVudCIsIkRpcmVjdGl2ZSIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIlZpZXdDb250YWluZXJSZWYiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIlVpQ29tcG9uZW50c01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBNkJFLDhCQUFvQixFQUFlO1lBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTswQkFaWCxFQUFFOzBCQUdFLElBQUlBLGlCQUFZLEVBQU87U0FTWjtRQUx2QyxzQkFBSSwwQ0FBUTs7O2dCQUFaO2dCQUFpQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBTTt3QkFBTCxjQUFJO29CQUFNLE9BQUEsSUFBSSxLQUFLLFFBQVE7aUJBQUEsQ0FBQyxDQUFDO2FBQUU7OztXQUFBO1FBQzVFLHNCQUFJLHlDQUFPOzs7Z0JBQVgsY0FBaUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFOzs7V0FBQTtRQUNqRSxzQkFBSSx1Q0FBSzs7O2dCQUFULGNBQWMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzs7V0FBQTtRQUN2QyxzQkFBSSx1Q0FBSzs7O2dCQUFULGNBQW1CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7O1dBQUE7Ozs7UUFJNUMsdUNBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2hDOzs7O1FBRUQsMENBQVc7OztZQUFYO2dCQUFBLGlCQWlCQztnQkFoQkMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFOztvQkFDYixJQUFNLFVBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O29CQUNqRCxJQUFNLGdCQUFjLEdB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
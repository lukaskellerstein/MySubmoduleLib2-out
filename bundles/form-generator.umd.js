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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlLnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZm9ybS1nZW5lcmF0b3IubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZpZWxkQ29uZmlnfSBmcm9tICdNeVN1Ym1vZHVsZUxpYjEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBjbGFzcz1cImR5bmFtaWMtZm9ybVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY29uZmlnO1wiIGR5bmFtaWNGaWVsZCBbY29uZmlnXT1cImZpZWxkXCIgW2dyb3VwXT1cImZvcm1cIj5cbiAgPC9uZy1jb250YWluZXI+XG48L2Zvcm0+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnW10gPSBbXTtcblxuICBAT3V0cHV0KClcbiAgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBnZXQgY29udHJvbHMoKSB7IHJldHVybiB0aGlzLmNvbmZpZy5maWx0ZXIoKHt0eXBlfSkgPT4gdHlwZSAhPT0gJ2J1dHRvbicpOyB9XG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzOyB9XG4gIGdldCB2YWxpZCgpIHsgcmV0dXJuIHRoaXMuZm9ybS52YWxpZDsgfVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTsgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnN0IGNvbmZpZ0NvbnRyb2xzID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSk7XG5cbiAgICAgIGNvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb25maWdDb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKGNvbnRyb2wpID0+IHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKGNvbnRyb2wpKTtcblxuICAgICAgY29uZmlnQ29udHJvbHNcbiAgICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnLmZpbmQoKGNvbnRyb2wpID0+IGNvbnRyb2wubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wobmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbmZpZykpO1xuICAgICAgICB9KTtcblxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUdyb3VwKCkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5mYi5ncm91cCh7fSk7XG4gICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4gZ3JvdXAuYWRkQ29udHJvbChjb250cm9sLm5hbWUsIHRoaXMuY3JlYXRlQ29udHJvbChjb250cm9sKSkpO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRyb2woY29uZmlnOiBGaWVsZENvbmZpZyk6IEZvcm1Db250cm9sIHtcbiAgICBjb25zdCB7IGRpc2FibGVkLCB2YWxpZGF0aW9uLCB2YWx1ZSB9ID0gY29uZmlnO1xuICAgIHJldHVybiB0aGlzLmZiLmNvbnRyb2woeyBkaXNhYmxlZCwgdmFsdWUgfSwgdmFsaWRhdGlvbik7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWQobmFtZTogc3RyaW5nLCBkaXNhYmxlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXSkge1xuICAgICAgY29uc3QgbWV0aG9kID0gZGlzYWJsZSA/ICdkaXNhYmxlJzogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb25maWcubWFwKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGl0ZW0uZGlzYWJsZWQgPSBkaXNhYmxlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV0uc2V0VmFsdWUodmFsdWUsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7TXlCdXR0b25Db21wb25lbnQsIE15SW5wdXRDb21wb25lbnQsIE15U2VsZWN0Q29tcG9uZW50LCBGaWVsZCwgRmllbGRDb25maWd9IGZyb20gJ015U3VibW9kdWxlTGliMSc7XG5cbmNvbnN0IGNvbXBvbmVudHM6IHtbdHlwZTogc3RyaW5nXTogVHlwZTxGaWVsZD59ID0ge1xuICBidXR0b246ICBNeUJ1dHRvbkNvbXBvbmVudCxcbiAgaW5wdXQ6IE15SW5wdXRDb21wb25lbnQsXG4gIHNlbGVjdDogTXlTZWxlY3RDb21wb25lbnRcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkeW5hbWljRmllbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBGaWVsZCwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIGdyb3VwOiBGb3JtR3JvdXA7XG5cbiAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8RmllbGQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZlxuICApIHt9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIWNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pIHtcbiAgICAgIGNvbnN0IHN1cHBvcnRlZFR5cGVzID0gT2JqZWN0LmtleXMoY29tcG9uZW50cykuam9pbignLCAnKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRyeWluZyB0byB1c2UgYW4gdW5zdXBwb3J0ZWQgdHlwZSAoJHt0aGlzLmNvbmZpZy50eXBlfSkuXG4gICAgICAgIFN1cHBvcnRlZCB0eXBlczogJHtzdXBwb3J0ZWRUeXBlc31gXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PEZpZWxkPihjb21wb25lbnRzW3RoaXMuY29uZmlnLnR5cGVdKTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQpO1xuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVWlDb21wb25lbnRzTW9kdWxlLCBNeUJ1dHRvbkNvbXBvbmVudCwgTXlJbnB1dENvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQgfSBmcm9tICdNeVN1Ym1vZHVsZUxpYjEnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLWZpZWxkL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFVpQ29tcG9uZW50c01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0R5bmFtaWNGb3JtQ29tcG9uZW50LCBEeW5hbWljRmllbGREaXJlY3RpdmVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNeUJ1dHRvbkNvbXBvbmVudCwgTXlJbnB1dENvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1HZW5lcmF0b3JNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiRm9ybUJ1aWxkZXIiLCJJbnB1dCIsIk91dHB1dCIsIk15QnV0dG9uQ29tcG9uZW50IiwiTXlJbnB1dENvbXBvbmVudCIsIk15U2VsZWN0Q29tcG9uZW50IiwiRGlyZWN0aXZlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiVmlld0NvbnRhaW5lclJlZiIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiVWlDb21wb25lbnRzTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUE0QkUsOEJBQW9CLEVBQWU7WUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhOzBCQVpYLEVBQUU7MEJBR0UsSUFBSUEsaUJBQVksRUFBTztTQVNaO1FBTHZDLHNCQUFJLDBDQUFROzs7Z0JBQVo7Z0JBQWlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxFQUFNO3dCQUFMLGNBQUk7b0JBQU0sT0FBQSxJQUFJLEtBQUssUUFBUTtpQkFBQSxDQUFDLENBQUM7YUFBRTs7O1dBQUE7UUFDNUUsc0JBQUkseUNBQU87OztnQkFBWCxjQUFpQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7OztXQUFBO1FBQ2pFLHNCQUFJLHVDQUFLOzs7Z0JBQVQsY0FBYyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7OztXQUFBO1FBQ3ZDLHNCQUFJLHVDQUFLOzs7Z0JBQVQsY0FBbUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzs7V0FBQTs7OztRQUk1Qyx1Q0FBUTs7O1lBQVI7Z0JBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDaEM7Ozs7UUFFRCwwQ0FBVzs7O1lBQVg7Z0JBQUEsaUJBaUJDO2dCQWhCQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7O29CQUNiLElBQU0sVUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7b0JBQ2pELElBQU0sZ0JBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcs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
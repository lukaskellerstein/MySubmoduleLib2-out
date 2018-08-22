import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ComponentFactoryResolver, Directive, ViewContainerRef, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DynamicFormComponent {
    /**
     * @param {?} fb
     */
    constructor(fb) {
        this.fb = fb;
        this.config = {};
        this.submit = new EventEmitter();
        this.objectGetKeys = Object.keys;
    }
    /**
     * @return {?}
     */
    get controls() {
        /** @type {?} */
        const controls = [];
        Object.keys(this.config).forEach(key => {
            /** @type {?} */
            const value = this.config[key];
            if (!value.hasOwnProperty("name")) {
                value.name = key;
            }
            controls.push(value);
        });
        return controls;
    }
    /**
     * @return {?}
     */
    get changes() { return this.form.valueChanges; }
    /**
     * @return {?}
     */
    get valid() { return this.form.valid; }
    /**
     * @return {?}
     */
    get value() { return this.form.value; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.form = this.createGroup();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.form) {
            this.form = this.createGroup();
        }
        /** @type {?} */
        const controls = Object.keys(this.form.controls);
        /** @type {?} */
        const configControls = this.controls.map((item) => item.name);
        controls
            .filter((control) => !configControls.includes(control))
            .forEach((control) => this.form.removeControl(control));
        configControls
            .filter((control) => !controls.includes(control))
            .forEach((name) => {
            /** @type {?} */
            const config = this.controls.find((control) => control.name === name);
            this.form.addControl(name, this.createControl(config));
        });
    }
    /**
     * @return {?}
     */
    createGroup() {
        /** @type {?} */
        const group = this.fb.group({});
        this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
        return group;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    createControl(config) {
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.submit.emit(this.value);
    }
    /**
     * @param {?} name
     * @param {?} disable
     * @return {?}
     */
    setDisabled(name, disable) {
        if (this.form.controls[name]) {
            /** @type {?} */
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }
        this.config = this.controls.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setValue(name, value) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }
}
DynamicFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-dynamic-form',
                exportAs: 'dynamicForm',
                template: `<form class="dynamic-form" [formGroup]="form" (submit)="handleSubmit($event)">
  <ng-container *ngFor="let fieldKey of objectGetKeys(config);">
    key: {{ fieldKey }}
    <ng-container dynamicField [config]="config[fieldKey]" [name]="fieldKey" [group]="form">
    </ng-container>
  </ng-container>
  <input *ngIf="true" type="submit" name="submit" value="Submit"> 
</form>My `,
                styles: [``],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DynamicFormComponent.ctorParameters = () => [
    { type: FormBuilder }
];
DynamicFormComponent.propDecorators = {
    config: [{ type: Input }],
    submit: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ObjectLinkComponent {
    /**
     * @param {?} ev
     * @return {?}
     */
    onLinkClick(ev) {
        // TODO: trigger event to add new form to forms container
        ev.stopPropagation();
        ev.preventDefault();
    }
}
ObjectLinkComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-object-link',
                template: `<a href="#" (click)="onLinkClick($event)">{{ config | json }}</a>`
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MyButtonComponent {
}
MyButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-my-button',
                template: `<div class="dynamic-field form-button" [formGroup]="group">
  <button [disabled]="config.disabled" type="submit">
    {{ config.label }}
  </button>
</div>`,
                styles: [``]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MyInputComponent {
}
MyInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-my-input',
                template: `<div class="dynamic-field form-input" [formGroup]="group">
  <label>{{ config.label }}</label>
  <input type="text" [attr.placeholder]="config.placeholder" [formControlName]="config.name">
</div>`,
                styles: [``]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MySelectComponent {
}
MySelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-my-select',
                template: `<div class="dynamic-field form-select" [formGroup]="group">
  <label>{{ config.label }}</label>
  <select [formControlName]="config.name">
    <option value="">{{ config.placeholder }}</option>
    <option *ngFor="let option of config.options">
      {{ option }}
    </option>
  </select>
</div>`,
                styles: [``]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const components = {
    button: MyButtonComponent,
    input: MyInputComponent,
    select: MySelectComponent,
    object: ObjectLinkComponent
};
class DynamicFieldDirective {
    /**
     * @param {?} resolver
     * @param {?} container
     */
    constructor(resolver, container) {
        this.resolver = resolver;
        this.container = container;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!components[this.config.type]) {
            /** @type {?} */
            const supportedTypes = Object.keys(components).join(', ');
            throw new Error(`Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`);
        }
        /** @type {?} */
        const component = this.resolver.resolveComponentFactory(components[this.config.type]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.buildFieldConfig(this.config);
        this.component.instance.group = this.group;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    buildFieldConfig(config) {
        if (!config.name) {
            config.name = this.name;
            if (!config.label) {
                config.label = this.name;
            }
            // TODO further field config prerender changes
            return config;
        }
    }
}
DynamicFieldDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dynamicField]'
            },] },
];
/** @nocollapse */
DynamicFieldDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef }
];
DynamicFieldDirective.propDecorators = {
    config: [{ type: Input }],
    name: [{ type: Input }],
    group: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WidgetsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FormGeneratorModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DynamicFormComponent, DynamicFieldDirective, MyButtonComponent, MyInputComponent, MySelectComponent, ObjectLinkComponent, FormGeneratorModule, WidgetsModule as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktYnV0dG9uL215LWJ1dHRvbi5jb21wb25lbnQudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZpZWxkL3dpZGdldHMvbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC93aWRnZXRzL215LXNlbGVjdC9teS1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9mb3JtLWdlbmVyYXRvci9saWIvZHluYW1pYy1maWVsZC9keW5hbWljLWZpZWxkLmRpcmVjdGl2ZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZS50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2Zvcm0tZ2VuZXJhdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9keW5hbWljLWZpZWxkL3dpZGdldHMvYmFzZS9maWVsZC5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgZXhwb3J0QXM6ICdkeW5hbWljRm9ybScsXG4gIHRlbXBsYXRlOiBgPGZvcm0gY2xhc3M9XCJkeW5hbWljLWZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIiAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkS2V5IG9mIG9iamVjdEdldEtleXMoY29uZmlnKTtcIj5cbiAgICBrZXk6IHt7IGZpZWxkS2V5IH19XG4gICAgPG5nLWNvbnRhaW5lciBkeW5hbWljRmllbGQgW2NvbmZpZ109XCJjb25maWdbZmllbGRLZXldXCIgW25hbWVdPVwiZmllbGRLZXlcIiBbZ3JvdXBdPVwiZm9ybVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGlucHV0ICpuZ0lmPVwidHJ1ZVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXRcIj4gXG48L2Zvcm0+TXkgYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY29uZmlnID0ge31cblxuICBAT3V0cHV0KClcbiAgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBnZXQgY29udHJvbHMoKSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBbXVxuICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29uZmlnW2tleV07XG4gICAgICBpZiAoIXZhbHVlLmhhc093blByb3BlcnR5KFwibmFtZVwiKSkge1xuICAgICAgICB2YWx1ZS5uYW1lID0ga2V5O1xuICAgICAgfVxuICAgICAgY29udHJvbHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnRyb2xzO1xuICB9XG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzOyB9XG4gIGdldCB2YWxpZCgpIHsgcmV0dXJuIHRoaXMuZm9ybS52YWxpZDsgfVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTsgfVxuXG4gIG9iamVjdEdldEtleXMgPSBPYmplY3Qua2V5cztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVHcm91cCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybS5jb250cm9scyk7XG4gICAgY29uc3QgY29uZmlnQ29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLm1hcCgoaXRlbSkgPT4gaXRlbS5uYW1lKTtcblxuICAgIGNvbnRyb2xzXG4gICAgICAuZmlsdGVyKChjb250cm9sKSA9PiAhY29uZmlnQ29udHJvbHMuaW5jbHVkZXMoY29udHJvbCkpXG4gICAgICAuZm9yRWFjaCgoY29udHJvbCkgPT4gdGhpcy5mb3JtLnJlbW92ZUNvbnRyb2woY29udHJvbCkpO1xuXG4gICAgY29uZmlnQ29udHJvbHNcbiAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29udHJvbHMuZmluZCgoY29udHJvbCkgPT4gY29udHJvbC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wobmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbmZpZykpO1xuICAgICAgfSk7XG5cblxuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBncm91cC5hZGRDb250cm9sKGNvbnRyb2wubmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbnRyb2wpKSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbChjb25maWc6IEZpZWxkQ29uZmlnKTogRm9ybUNvbnRyb2wge1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIHZhbGlkYXRpb24sIHZhbHVlIH0gPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXMuZmIuY29udHJvbCh7IGRpc2FibGVkLCB2YWx1ZSB9LCB2YWxpZGF0aW9uKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZChuYW1lOiBzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdKSB7XG4gICAgICBjb25zdCBtZXRob2QgPSBkaXNhYmxlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1vYmplY3QtbGluaycsXG4gIHRlbXBsYXRlOiBgPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib25MaW5rQ2xpY2soJGV2ZW50KVwiPnt7IGNvbmZpZyB8IGpzb24gfX08L2E+YFxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RMaW5rQ29tcG9uZW50IGltcGxlbWVudHMgRmllbGQgIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIG9uTGlua0NsaWNrKGV2KXtcbiAgICAvLyBUT0RPOiB0cmlnZ2VyIGV2ZW50IHRvIGFkZCBuZXcgZm9ybSB0byBmb3JtcyBjb250YWluZXIgXG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktYnV0dG9uJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZHluYW1pYy1maWVsZCBmb3JtLWJ1dHRvblwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGJ1dHRvbiBbZGlzYWJsZWRdPVwiY29uZmlnLmRpc2FibGVkXCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgIHt7IGNvbmZpZy5sYWJlbCB9fVxuICA8L2J1dHRvbj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeUJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkIHtcbiAgY29uZmlnOiBGaWVsZENvbmZpZztcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2Jhc2UvZmllbGQuY29uZmlnJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vYmFzZS9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1teS1pbnB1dCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImR5bmFtaWMtZmllbGQgZm9ybS1pbnB1dFwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGxhYmVsPnt7IGNvbmZpZy5sYWJlbCB9fTwvbGFiZWw+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImNvbmZpZy5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29uZmlnLm5hbWVcIj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRmllbGQgIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIFxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9iYXNlL2ZpZWxkJztcbmltcG9ydCB7IEZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vYmFzZS9maWVsZC5jb25maWcnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbXktc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZHluYW1pYy1maWVsZCBmb3JtLXNlbGVjdFwiIFtmb3JtR3JvdXBdPVwiZ3JvdXBcIj5cbiAgPGxhYmVsPnt7IGNvbmZpZy5sYWJlbCB9fTwvbGFiZWw+XG4gIDxzZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJjb25maWcubmFtZVwiPlxuICAgIDxvcHRpb24gdmFsdWU9XCJcIj57eyBjb25maWcucGxhY2Vob2xkZXIgfX08L29wdGlvbj5cbiAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29uZmlnLm9wdGlvbnNcIj5cbiAgICAgIHt7IG9wdGlvbiB9fVxuICAgIDwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNeVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIEZpZWxkIHtcblxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuICBncm91cDogRm9ybUdyb3VwO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL3dpZGdldHMvYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBNeUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL215LWlucHV0L215LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1zZWxlY3QvbXktc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4vd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbmNvbnN0IGNvbXBvbmVudHM6IHsgW3R5cGU6IHN0cmluZ106IFR5cGU8RmllbGQ+IH0gPSB7XG4gIGJ1dHRvbjogTXlCdXR0b25Db21wb25lbnQsXG4gIGlucHV0OiBNeUlucHV0Q29tcG9uZW50LFxuICBzZWxlY3Q6IE15U2VsZWN0Q29tcG9uZW50LFxuICBvYmplY3Q6IE9iamVjdExpbmtDb21wb25lbnRcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkeW5hbWljRmllbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBGaWVsZCwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPEZpZWxkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSkge1xuICAgICAgY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5qb2luKCcsICcpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVHJ5aW5nIHRvIHVzZSBhbiB1bnN1cHBvcnRlZCB0eXBlICgke3RoaXMuY29uZmlnLnR5cGV9KS5cbiAgICAgICAgU3VwcG9ydGVkIHR5cGVzOiAke3N1cHBvcnRlZFR5cGVzfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8RmllbGQ+KGNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5idWlsZEZpZWxkQ29uZmlnKHRoaXMuY29uZmlnKVxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgfVxuXG4gIGJ1aWxkRmllbGRDb25maWcoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcubmFtZSkge1xuICAgICAgY29uZmlnLm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgIGlmICghY29uZmlnLmxhYmVsKSB7XG4gICAgICAgIGNvbmZpZy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE8gZnVydGhlciBmaWVsZCBjb25maWcgcHJlcmVuZGVyIGNoYW5nZXNcbiAgICAgIHJldHVybiBjb25maWc7XG5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTXlJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vbXktaW5wdXQvbXktaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE15QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbXktc2VsZWN0L215LXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vb2JqZWN0LWxpbmsvb2JqZWN0LWxpbmsuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW015SW5wdXRDb21wb25lbnQsIE15QnV0dG9uQ29tcG9uZW50LCBNeVNlbGVjdENvbXBvbmVudCwgT2JqZWN0TGlua0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNeUlucHV0Q29tcG9uZW50LCBNeUJ1dHRvbkNvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtNeUJ1dHRvbkNvbXBvbmVudCwgTXlJbnB1dENvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIE9iamVjdExpbmtDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFdpZGdldHNNb2R1bGUgeyB9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljRmllbGREaXJlY3RpdmUgfSBmcm9tICcuL2R5bmFtaWMtZmllbGQvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgV2lkZ2V0c01vZHVsZSB9IGZyb20gJy4vZHluYW1pYy1maWVsZC93aWRnZXRzL3dpZGdldHMubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFdpZGdldHNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRHluYW1pY0Zvcm1Db21wb25lbnQsIER5bmFtaWNGaWVsZERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtR2VuZXJhdG9yTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7SUE4Q0UsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7c0JBeEIxQixFQUFFO3NCQUdpQixJQUFJLFlBQVksRUFBTzs2QkFtQm5DLE1BQU0sQ0FBQyxJQUFJO0tBRWE7Ozs7SUFqQnhDLElBQUksUUFBUTs7UUFDVixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUc7O1lBQ2xDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2pDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ2xCO1lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQztLQUNqQjs7OztJQUNELElBQUksT0FBTyxLQUFzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Ozs7SUFDakUsSUFBSSxLQUFLLEtBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzs7O0lBQ3ZDLElBQUksS0FBSyxLQUFVLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7OztJQU01QyxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJ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
import { Component, EventEmitter, Input, Output, ComponentFactoryResolver, Directive, ViewContainerRef, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyButtonComponent, MyInputComponent, MySelectComponent, UiComponentsModule } from 'MySubmoduleLib1';
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
        this.config = [];
        this.submit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get controls() { return this.config.filter(({ type }) => type !== 'button'); }
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
        if (this.form) {
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
                const config = this.config.find((control) => control.name === name);
                this.form.addControl(name, this.createControl(config));
            });
        }
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
        this.config = this.config.map((item) => {
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
                template: `<form class="dynamic-form" [formGroup]="form" (submit)="handleSubmit($event)">
  <ng-container *ngFor="let field of config;" dynamicField [config]="field" [group]="form">
  </ng-container>
</form>`,
                styles: [``]
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
/** @type {?} */
const components = {
    button: MyButtonComponent,
    input: MyInputComponent,
    select: MySelectComponent
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
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
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
    group: [{ type: Input }]
};

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
                    UiComponentsModule
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

export { FormGeneratorModule, DynamicFieldDirective as ɵb, DynamicFormComponent as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW5lcmF0b3IuanMubWFwIiwic291cmNlcyI6WyJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vZm9ybS1nZW5lcmF0b3IvbGliL2R5bmFtaWMtZmllbGQvZHluYW1pYy1maWVsZC5kaXJlY3RpdmUudHMiLCJuZzovL2Zvcm0tZ2VuZXJhdG9yL2xpYi9mb3JtLWdlbmVyYXRvci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRmllbGRDb25maWd9IGZyb20gJ015U3VibW9kdWxlTGliMSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWZvcm0nLFxuICB0ZW1wbGF0ZTogYDxmb3JtIGNsYXNzPVwiZHluYW1pYy1mb3JtXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCIgKHN1Ym1pdCk9XCJoYW5kbGVTdWJtaXQoJGV2ZW50KVwiPlxuICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBjb25maWc7XCIgZHluYW1pY0ZpZWxkIFtjb25maWddPVwiZmllbGRcIiBbZ3JvdXBdPVwiZm9ybVwiPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZm9ybT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogRmllbGRDb25maWdbXSA9IFtdO1xuXG4gIEBPdXRwdXQoKVxuICBzdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZm9ybTogRm9ybUdyb3VwO1xuXG4gIGdldCBjb250cm9scygpIHsgcmV0dXJuIHRoaXMuY29uZmlnLmZpbHRlcigoe3R5cGV9KSA9PiB0eXBlICE9PSAnYnV0dG9uJyk7IH1cbiAgZ2V0IGNoYW5nZXMoKTogT2JzZXJ2YWJsZTxhbnk+IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZUNoYW5nZXM7IH1cbiAgZ2V0IHZhbGlkKCkgeyByZXR1cm4gdGhpcy5mb3JtLnZhbGlkOyB9XG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5mb3JtLnZhbHVlOyB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVHcm91cCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMuZm9ybSkge1xuICAgICAgY29uc3QgY29udHJvbHMgPSBPYmplY3Qua2V5cyh0aGlzLmZvcm0uY29udHJvbHMpO1xuICAgICAgY29uc3QgY29uZmlnQ29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLm1hcCgoaXRlbSkgPT4gaXRlbS5uYW1lKTtcblxuICAgICAgY29udHJvbHNcbiAgICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbmZpZ0NvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgICAuZm9yRWFjaCgoY29udHJvbCkgPT4gdGhpcy5mb3JtLnJlbW92ZUNvbnRyb2woY29udHJvbCkpO1xuXG4gICAgICBjb25maWdDb250cm9sc1xuICAgICAgICAuZmlsdGVyKChjb250cm9sKSA9PiAhY29udHJvbHMuaW5jbHVkZXMoY29udHJvbCkpXG4gICAgICAgIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWcuZmluZCgoY29udHJvbCkgPT4gY29udHJvbC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgICB0aGlzLmZvcm0uYWRkQ29udHJvbChuYW1lLCB0aGlzLmNyZWF0ZUNvbnRyb2woY29uZmlnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBncm91cC5hZGRDb250cm9sKGNvbnRyb2wubmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbnRyb2wpKSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbChjb25maWc6IEZpZWxkQ29uZmlnKTogRm9ybUNvbnRyb2wge1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIHZhbGlkYXRpb24sIHZhbHVlIH0gPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXMuZmIuY29udHJvbCh7IGRpc2FibGVkLCB2YWx1ZSB9LCB2YWxpZGF0aW9uKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZChuYW1lOiBzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdKSB7XG4gICAgICBjb25zdCBtZXRob2QgPSBkaXNhYmxlID8gJ2Rpc2FibGUnOiAnZW5hYmxlJztcbiAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXVttZXRob2RdKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmZpZy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtNeUJ1dHRvbkNvbXBvbmVudCwgTXlJbnB1dENvbXBvbmVudCwgTXlTZWxlY3RDb21wb25lbnQsIEZpZWxkLCBGaWVsZENvbmZpZ30gZnJvbSAnTXlTdWJtb2R1bGVMaWIxJztcblxuY29uc3QgY29tcG9uZW50czoge1t0eXBlOiBzdHJpbmddOiBUeXBlPEZpZWxkPn0gPSB7XG4gIGJ1dHRvbjogIE15QnV0dG9uQ29tcG9uZW50LFxuICBpbnB1dDogTXlJbnB1dENvbXBvbmVudCxcbiAgc2VsZWN0OiBNeVNlbGVjdENvbXBvbmVudFxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2R5bmFtaWNGaWVsZF0nXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGaWVsZERpcmVjdGl2ZSBpbXBsZW1lbnRzIEZpZWxkLCBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZzogRmllbGRDb25maWc7XG5cbiAgQElucHV0KClcbiAgZ3JvdXA6IEZvcm1Hcm91cDtcblxuICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxGaWVsZD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSkge1xuICAgICAgY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5qb2luKCcsICcpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVHJ5aW5nIHRvIHVzZSBhbiB1bnN1cHBvcnRlZCB0eXBlICgke3RoaXMuY29uZmlnLnR5cGV9KS5cbiAgICAgICAgU3VwcG9ydGVkIHR5cGVzOiAke3N1cHBvcnRlZFR5cGVzfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8RmllbGQ+KGNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVaUNvbXBvbmVudHNNb2R1bGUgfSBmcm9tICdNeVN1Ym1vZHVsZUxpYjEnO1xuaW1wb3J0IHsgRHluYW1pY0ZpZWxkRGlyZWN0aXZlIH0gZnJvbSAnLi9keW5hbWljLWZpZWxkL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFVpQ29tcG9uZW50c01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEeW5hbWljRm9ybUNvbXBvbmVudCwgRHluYW1pY0ZpZWxkRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0R5bmFtaWNGb3JtQ29tcG9uZW50LCBEeW5hbWljRmllbGREaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1HZW5lcmF0b3JNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7SUE0QkUsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7c0JBWlgsRUFBRTtzQkFHRSxJQUFJLFlBQVksRUFBTztLQVNaOzs7O0lBTHZDLElBQUksUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxLQUFLLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxFQUFFOzs7O0lBQzVFLElBQUksT0FBTyxLQUFzQixPQUFPLElB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
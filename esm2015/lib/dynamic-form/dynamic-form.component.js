/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
export class DynamicFormComponent {
    /**
     * @param {?} fb
     */
    constructor(fb) {
        this.fb = fb;
        this.config = [];
        this.submit = new EventEmitter();
        this.objectGetKeys = Object.keys;
    }
    /**
     * @return {?}
     */
    get controls() { return this.config; }
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
                exportAs: 'dynamicForm',
                template: `<form class="dynamic-form" [formGroup]="form" (submit)="handleSubmit($event)">
  <ng-container *ngFor="let fieldKey of objectGetKeys(config);">
    key: {{ fieldKey }}
    <ng-container dynamicField [config]="config[fieldKey]" [name]="fieldKey" [group]="form">
    </ng-container>
  </ng-container>
  <input *ngIf="true" type="submit" name="submit" value="Submit"> 
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
if (false) {
    /** @type {?} */
    DynamicFormComponent.prototype.config;
    /** @type {?} */
    DynamicFormComponent.prototype.submit;
    /** @type {?} */
    DynamicFormComponent.prototype.form;
    /** @type {?} */
    DynamicFormComponent.prototype.objectGetKeys;
    /** @type {?} */
    DynamicFormComponent.prototype.fb;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zvcm0tZ2VuZXJhdG9yLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQWEsV0FBVyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFrQnJFLE1BQU07Ozs7SUFnQkosWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7c0JBZFgsRUFBRTtzQkFHRSxJQUFJLFlBQVksRUFBTzs2QkFTbkMsTUFBTSxDQUFDLElBQUk7S0FFWTs7OztJQVB2QyxJQUFJLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQSxFQUFFOzs7O0lBQ3JDLElBQUksT0FBTyxLQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTs7OztJQUNqRSxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7OztJQUN2QyxJQUFJLEtBQUssS0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7OztJQU01QyxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDaEM7Ozs7SUFFRCxXQUFXO1FBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBQ2QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUNqRCxNQUFNLGNBQWMsR0FBRyxJQUFJ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QUssRUFBRSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQzdEOzs7WUF4RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7UUFPSjtnQkFDTixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7OztZQWpCbUIsV0FBVzs7O3FCQW1CNUIsS0FBSztxQkFHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9keW5hbWljLWZpZWxkL3dpZGdldHMvYmFzZS9maWVsZC5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgZXhwb3J0QXM6ICdkeW5hbWljRm9ybScsXG4gIHRlbXBsYXRlOiBgPGZvcm0gY2xhc3M9XCJkeW5hbWljLWZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIiAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkS2V5IG9mIG9iamVjdEdldEtleXMoY29uZmlnKTtcIj5cbiAgICBrZXk6IHt7IGZpZWxkS2V5IH19XG4gICAgPG5nLWNvbnRhaW5lciBkeW5hbWljRmllbGQgW2NvbmZpZ109XCJjb25maWdbZmllbGRLZXldXCIgW25hbWVdPVwiZmllbGRLZXlcIiBbZ3JvdXBdPVwiZm9ybVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGlucHV0ICpuZ0lmPVwidHJ1ZVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXRcIj4gXG48L2Zvcm0+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnW10gPSBbXTtcblxuICBAT3V0cHV0KClcbiAgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBnZXQgY29udHJvbHMoKSB7IHJldHVybiB0aGlzLmNvbmZpZyB9XG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzOyB9XG4gIGdldCB2YWxpZCgpIHsgcmV0dXJuIHRoaXMuZm9ybS52YWxpZDsgfVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTsgfVxuXG4gIG9iamVjdEdldEtleXMgPSBPYmplY3Qua2V5cztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmNyZWF0ZUdyb3VwKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5mb3JtKSB7XG4gICAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybS5jb250cm9scyk7XG4gICAgICBjb25zdCBjb25maWdDb250cm9scyA9IHRoaXMuY29udHJvbHMubWFwKChpdGVtKSA9PiBpdGVtLm5hbWUpO1xuXG4gICAgICBjb250cm9sc1xuICAgICAgICAuZmlsdGVyKChjb250cm9sKSA9PiAhY29uZmlnQ29udHJvbHMuaW5jbHVkZXMoY29udHJvbCkpXG4gICAgICAgIC5mb3JFYWNoKChjb250cm9sKSA9PiB0aGlzLmZvcm0ucmVtb3ZlQ29udHJvbChjb250cm9sKSk7XG5cbiAgICAgIGNvbmZpZ0NvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZy5maW5kKChjb250cm9sKSA9PiBjb250cm9sLm5hbWUgPT09IG5hbWUpO1xuICAgICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKG5hbWUsIHRoaXMuY3JlYXRlQ29udHJvbChjb25maWcpKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG4gIH1cblxuICBjcmVhdGVHcm91cCgpIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZmIuZ3JvdXAoe30pO1xuICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaChjb250cm9sID0+IGdyb3VwLmFkZENvbnRyb2woY29udHJvbC5uYW1lLCB0aGlzLmNyZWF0ZUNvbnRyb2woY29udHJvbCkpKTtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICBjcmVhdGVDb250cm9sKGNvbmZpZzogRmllbGRDb25maWcpOiBGb3JtQ29udHJvbCB7XG4gICAgY29uc3QgeyBkaXNhYmxlZCwgdmFsaWRhdGlvbiwgdmFsdWUgfSA9IGNvbmZpZztcbiAgICByZXR1cm4gdGhpcy5mYi5jb250cm9sKHsgZGlzYWJsZWQsIHZhbHVlIH0sIHZhbGlkYXRpb24pO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5zdWJtaXQuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHNldERpc2FibGVkKG5hbWU6IHN0cmluZywgZGlzYWJsZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHNbbmFtZV0pIHtcbiAgICAgIGNvbnN0IG1ldGhvZCA9IGRpc2FibGUgPyAnZGlzYWJsZSc6ICdlbmFibGUnO1xuICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdW21ldGhvZF0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuY29uZmlnLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBpdGVtLmRpc2FibGVkID0gZGlzYWJsZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdLnNldFZhbHVlKHZhbHVlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gIH1cbn1cbiJdfQ==
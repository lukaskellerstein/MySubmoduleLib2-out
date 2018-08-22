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
                const config = this.controls.find((control) => control.name === name);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zvcm0tZ2VuZXJhdG9yLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQWEsV0FBVyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFrQnJFLE1BQU07Ozs7SUEwQkosWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7c0JBeEIxQixFQUFFO3NCQUdpQixJQUFJLFlBQVksRUFBTzs2QkFtQm5DLE1BQU0sQ0FBQyxJQUFJO0tBRWE7Ozs7SUFqQnhDLElBQUksUUFBUTs7UUFDVixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUNyQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ2xCO1lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCOzs7O0lBQ0QsSUFBSSxPQUFPLEtBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFOzs7O0lBQ2pFLElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMs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QztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDekI7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQyxDQUFDO0tBQ0o7Ozs7OztJQUVELFFBQVEsQ0FBQyxJQUFZLEVBQUUsS0FBVTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDL0Q7OztZQWxHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7OztXQU9EO2dCQUNULE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBakJtQixXQUFXOzs7cUJBbUI1QixLQUFLO3FCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWZvcm0nLFxuICBleHBvcnRBczogJ2R5bmFtaWNGb3JtJyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBjbGFzcz1cImR5bmFtaWMtZm9ybVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGRLZXkgb2Ygb2JqZWN0R2V0S2V5cyhjb25maWcpO1wiPlxuICAgIGtleToge3sgZmllbGRLZXkgfX1cbiAgICA8bmctY29udGFpbmVyIGR5bmFtaWNGaWVsZCBbY29uZmlnXT1cImNvbmZpZ1tmaWVsZEtleV1cIiBbbmFtZV09XCJmaWVsZEtleVwiIFtncm91cF09XCJmb3JtXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8aW5wdXQgKm5nSWY9XCJ0cnVlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiPiBcbjwvZm9ybT5NeSBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZyA9IHt9XG5cbiAgQE91dHB1dCgpXG4gIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgZ2V0IGNvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gW11cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgaWYgKCF2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcIm5hbWVcIikpIHtcbiAgICAgICAgdmFsdWUubmFtZSA9IGtleTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xzLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250cm9scztcbiAgfVxuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlczsgfVxuICBnZXQgdmFsaWQoKSB7IHJldHVybiB0aGlzLmZvcm0udmFsaWQ7IH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLmZvcm0udmFsdWU7IH1cblxuICBvYmplY3RHZXRLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnN0IGNvbmZpZ0NvbnRyb2xzID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSk7XG5cbiAgICAgIGNvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb25maWdDb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKGNvbnRyb2wpID0+IHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKGNvbnRyb2wpKTtcblxuICAgICAgY29uZmlnQ29udHJvbHNcbiAgICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29udHJvbHMuZmluZCgoY29udHJvbCkgPT4gY29udHJvbC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgICB0aGlzLmZvcm0uYWRkQ29udHJvbChuYW1lLCB0aGlzLmNyZWF0ZUNvbnRyb2woY29uZmlnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBncm91cC5hZGRDb250cm9sKGNvbnRyb2wubmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbnRyb2wpKSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbChjb25maWc6IEZpZWxkQ29uZmlnKTogRm9ybUNvbnRyb2wge1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIHZhbGlkYXRpb24sIHZhbHVlIH0gPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXMuZmIuY29udHJvbCh7IGRpc2FibGVkLCB2YWx1ZSB9LCB2YWxpZGF0aW9uKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZChuYW1lOiBzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdKSB7XG4gICAgICBjb25zdCBtZXRob2QgPSBkaXNhYmxlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gIH1cbn1cbiJdfQ==
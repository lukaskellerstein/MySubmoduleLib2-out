/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
                var config = _this.controls.find(function (control) { return control.name === name; });
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
export { DynamicFormComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zvcm0tZ2VuZXJhdG9yLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQWEsV0FBVyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7O0lBNENuRSw4QkFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7c0JBeEIxQixFQUFFO3NCQUdpQixJQUFJLFlBQVksRUFBTzs2QkFtQm5DLE1BQU0sQ0FBQyxJQUFJO0tBRWE7SUFqQnhDLHNCQUFJLDBDQUFROzs7O1FBQVo7WUFBQSxpQkFVQzs7WUFUQyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRzs7Z0JBQ2xDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2lCQUNsQjtnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDakI7OztPQUFBO0lBQ0Qsc0JBQUkseUNBQU87Ozs7UUFBWCxjQUFpQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTs7O09BQUE7SUFDakUsc0JBQUksdUNBQUs7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QUFDOztZQUM3QixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDbkMsTUFBTSxDQUFDO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtZQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2FBQ3pCO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUMsQ0FBQztLQUNKOzs7Ozs7SUFFRCx1Q0FBUTs7Ozs7SUFBUixVQUFTLElBQVksRUFBRSxLQUFVO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMvRDs7Z0JBbEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLHVaQU9EO29CQUNULE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7OztnQkFqQm1CLFdBQVc7Ozt5QkFtQjVCLEtBQUs7eUJBR0wsTUFBTTs7K0JBdkJUOztTQW1CYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4uL2R5bmFtaWMtZmllbGQvd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWZvcm0nLFxuICBleHBvcnRBczogJ2R5bmFtaWNGb3JtJyxcbiAgdGVtcGxhdGU6IGA8Zm9ybSBjbGFzcz1cImR5bmFtaWMtZm9ybVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIChzdWJtaXQpPVwiaGFuZGxlU3VibWl0KCRldmVudClcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGRLZXkgb2Ygb2JqZWN0R2V0S2V5cyhjb25maWcpO1wiPlxuICAgIGtleToge3sgZmllbGRLZXkgfX1cbiAgICA8bmctY29udGFpbmVyIGR5bmFtaWNGaWVsZCBbY29uZmlnXT1cImNvbmZpZ1tmaWVsZEtleV1cIiBbbmFtZV09XCJmaWVsZEtleVwiIFtncm91cF09XCJmb3JtXCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuICA8aW5wdXQgKm5nSWY9XCJ0cnVlXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiPiBcbjwvZm9ybT5NeSBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNvbmZpZyA9IHt9XG5cbiAgQE91dHB1dCgpXG4gIHN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgZ2V0IGNvbnRyb2xzKCkge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gW11cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbmZpZ1trZXldO1xuICAgICAgaWYgKCF2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcIm5hbWVcIikpIHtcbiAgICAgICAgdmFsdWUubmFtZSA9IGtleTtcbiAgICAgIH1cbiAgICAgIGNvbnRyb2xzLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250cm9scztcbiAgfVxuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlczsgfVxuICBnZXQgdmFsaWQoKSB7IHJldHVybiB0aGlzLmZvcm0udmFsaWQ7IH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLmZvcm0udmFsdWU7IH1cblxuICBvYmplY3RHZXRLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIGNvbnN0IGNvbnRyb2xzID0gT2JqZWN0LmtleXModGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnN0IGNvbmZpZ0NvbnRyb2xzID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSk7XG5cbiAgICAgIGNvbnRyb2xzXG4gICAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb25maWdDb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgICAgLmZvckVhY2goKGNvbnRyb2wpID0+IHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKGNvbnRyb2wpKTtcblxuICAgICAgY29uZmlnQ29udHJvbHNcbiAgICAgICAgLmZpbHRlcigoY29udHJvbCkgPT4gIWNvbnRyb2xzLmluY2x1ZGVzKGNvbnRyb2wpKVxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29udHJvbHMuZmluZCgoY29udHJvbCkgPT4gY29udHJvbC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgICB0aGlzLmZvcm0uYWRkQ29udHJvbChuYW1lLCB0aGlzLmNyZWF0ZUNvbnRyb2woY29uZmlnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBncm91cC5hZGRDb250cm9sKGNvbnRyb2wubmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbnRyb2wpKSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbChjb25maWc6IEZpZWxkQ29uZmlnKTogRm9ybUNvbnRyb2wge1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIHZhbGlkYXRpb24sIHZhbHVlIH0gPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXMuZmIuY29udHJvbCh7IGRpc2FibGVkLCB2YWx1ZSB9LCB2YWxpZGF0aW9uKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZChuYW1lOiBzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdKSB7XG4gICAgICBjb25zdCBtZXRob2QgPSBkaXNhYmxlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zvcm0tZ2VuZXJhdG9yLyIsInNvdXJjZXMiOlsibGliL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuSCxPQUFPLEVBQWEsV0FBVyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7O0lBNkNuRSw4QkFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7c0JBeEIxQixFQUFFO3NCQUdpQixJQUFJLFlBQVksRUFBTzs2QkFtQm5DLE1BQU0sQ0FBQyxJQUFJO0tBRWE7SUFqQnhDLHNCQUFJLDBDQUFROzs7O1FBQVo7WUFBQSxpQkFVQzs7WUFUQyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUE7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRzs7Z0JBQ2xDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2lCQUNsQjtnQkFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDakI7OztPQUFBO0lBQ0Qsc0JBQUkseUNBQU87Ozs7UUFBWCxjQUFpQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTs7O09BQUE7SUFDakUs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QUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQzdCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUM7U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDekI7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQyxDQUFDO0tBQ0o7Ozs7OztJQUVELHVDQUFROzs7OztJQUFSLFVBQVMsSUFBWSxFQUFFLEtBQVU7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQy9EOztnQkF0R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsdVpBT0Q7b0JBQ1QsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFsQm1CLFdBQVc7Ozt5QkFvQjVCLEtBQUs7eUJBR0wsTUFBTTs7K0JBeEJUOztTQW9CYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGRDb25maWcgfSBmcm9tICcuLi9keW5hbWljLWZpZWxkL3dpZGdldHMvYmFzZS9maWVsZC5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZHluYW1pYy1mb3JtJyxcbiAgZXhwb3J0QXM6ICdkeW5hbWljRm9ybScsXG4gIHRlbXBsYXRlOiBgPGZvcm0gY2xhc3M9XCJkeW5hbWljLWZvcm1cIiBbZm9ybUdyb3VwXT1cImZvcm1cIiAoc3VibWl0KT1cImhhbmRsZVN1Ym1pdCgkZXZlbnQpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkS2V5IG9mIG9iamVjdEdldEtleXMoY29uZmlnKTtcIj5cbiAgICBrZXk6IHt7IGZpZWxkS2V5IH19XG4gICAgPG5nLWNvbnRhaW5lciBkeW5hbWljRmllbGQgW2NvbmZpZ109XCJjb25maWdbZmllbGRLZXldXCIgW25hbWVdPVwiZmllbGRLZXlcIiBbZ3JvdXBdPVwiZm9ybVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGlucHV0ICpuZ0lmPVwidHJ1ZVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXRcIj4gXG48L2Zvcm0+TXkgYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY29uZmlnID0ge31cblxuICBAT3V0cHV0KClcbiAgc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGZvcm06IEZvcm1Hcm91cDtcblxuICBnZXQgY29udHJvbHMoKSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBbXVxuICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29uZmlnW2tleV07XG4gICAgICBpZiAoIXZhbHVlLmhhc093blByb3BlcnR5KFwibmFtZVwiKSkge1xuICAgICAgICB2YWx1ZS5uYW1lID0ga2V5O1xuICAgICAgfVxuICAgICAgY29udHJvbHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnRyb2xzO1xuICB9XG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzOyB9XG4gIGdldCB2YWxpZCgpIHsgcmV0dXJuIHRoaXMuZm9ybS52YWxpZDsgfVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuZm9ybS52YWx1ZTsgfVxuXG4gIG9iamVjdEdldEtleXMgPSBPYmplY3Qua2V5cztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5jcmVhdGVHcm91cCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMuY3JlYXRlR3JvdXAoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250cm9scyA9IE9iamVjdC5rZXlzKHRoaXMuZm9ybS5jb250cm9scyk7XG4gICAgY29uc3QgY29uZmlnQ29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLm1hcCgoaXRlbSkgPT4gaXRlbS5uYW1lKTtcblxuICAgIGNvbnRyb2xzXG4gICAgICAuZmlsdGVyKChjb250cm9sKSA9PiAhY29uZmlnQ29udHJvbHMuaW5jbHVkZXMoY29udHJvbCkpXG4gICAgICAuZm9yRWFjaCgoY29udHJvbCkgPT4gdGhpcy5mb3JtLnJlbW92ZUNvbnRyb2woY29udHJvbCkpO1xuXG4gICAgY29uZmlnQ29udHJvbHNcbiAgICAgIC5maWx0ZXIoKGNvbnRyb2wpID0+ICFjb250cm9scy5pbmNsdWRlcyhjb250cm9sKSlcbiAgICAgIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29udHJvbHMuZmluZCgoY29udHJvbCkgPT4gY29udHJvbC5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2wobmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbmZpZykpO1xuICAgICAgfSk7XG5cblxuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goY29udHJvbCA9PiBncm91cC5hZGRDb250cm9sKGNvbnRyb2wubmFtZSwgdGhpcy5jcmVhdGVDb250cm9sKGNvbnRyb2wpKSk7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbChjb25maWc6IEZpZWxkQ29uZmlnKTogRm9ybUNvbnRyb2wge1xuICAgIGNvbnN0IHsgZGlzYWJsZWQsIHZhbGlkYXRpb24sIHZhbHVlIH0gPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXMuZmIuY29udHJvbCh7IGRpc2FibGVkLCB2YWx1ZSB9LCB2YWxpZGF0aW9uKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy52YWx1ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZChuYW1lOiBzdHJpbmcsIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzW25hbWVdKSB7XG4gICAgICBjb25zdCBtZXRob2QgPSBkaXNhYmxlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICB0aGlzLmZvcm0uY29udHJvbHNbbmFtZV1bbWV0aG9kXSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5jb250cm9scy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuZm9ybS5jb250cm9sc1tuYW1lXS5zZXRWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObjectLinkComponent } from './widgets/object-link/object-link.component';
import { MyButtonComponent } from './widgets/my-button/my-button.component';
import { MyInputComponent } from './widgets/my-input/my-input.component';
import { MySelectComponent } from './widgets/my-select/my-select.component';
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
export { DynamicFieldDirective };
if (false) {
    /** @type {?} */
    DynamicFieldDirective.prototype.config;
    /** @type {?} */
    DynamicFieldDirective.prototype.name;
    /** @type {?} */
    DynamicFieldDirective.prototype.group;
    /** @type {?} */
    DynamicFieldDirective.prototype.component;
    /** @type {?} */
    DynamicFieldDirective.prototype.resolver;
    /** @type {?} */
    DynamicFieldDirective.prototype.container;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1maWVsZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mb3JtLWdlbmVyYXRvci8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWZpZWxkL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQWdCLFNBQVMsRUFBRSxLQUFLLEVBQTJCLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFHNUUsSUFBTSxVQUFVLEdBQW9DO0lBQ2xELE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixNQUFNLEVBQUUsaUJBQWlCO0lBQ3pCLE1BQU0sRUFBRSxtQkFBbUI7Q0FDNUIsQ0FBQzs7SUFpQkEsK0JBQ1UsVUFDQTtRQURBLGFBQVEsR0FBUixRQUFRO1FBQ1IsY0FBUyxHQUFULFNBQVM7S0FDZDs7OztJQUVMLDJDQUFXOzs7SUFBWDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzVDO0tBQ0Y7Ozs7SUFFRCx3Q0FBUTs7O0lBQVI7UUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDbEMsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDYix3Q0FBc0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFDQUNuQyxjQUFnQixDQUNwQyxDQUFDO1NBQ0g7O1FBQ0QsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBUSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUM7Ozs7O0lBRUQsZ0RBQWdCOzs7O0lBQWhCLFVBQWlCLE1BQU07UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDekI7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMxQjs7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBRWY7O2dCQXBERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBbkJRLHdCQUF3QjtnQkFBMkQsZ0JBQWdCOzs7eUJBcUJ6RyxLQUFLO3VCQUdMLEtBQUs7d0JBR0wsS0FBSzs7Z0NBM0JSOztTQW9CYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL3dpZGdldHMvYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBNeUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL215LWlucHV0L215LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1zZWxlY3QvbXktc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4vd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbmNvbnN0IGNvbXBvbmVudHM6IHsgW3R5cGU6IHN0cmluZ106IFR5cGU8RmllbGQ+IH0gPSB7XG4gIGJ1dHRvbjogTXlCdXR0b25Db21wb25lbnQsXG4gIGlucHV0OiBNeUlucHV0Q29tcG9uZW50LFxuICBzZWxlY3Q6IE15U2VsZWN0Q29tcG9uZW50LFxuICBvYmplY3Q6IE9iamVjdExpbmtDb21wb25lbnRcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkeW5hbWljRmllbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBGaWVsZCwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPEZpZWxkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSkge1xuICAgICAgY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5qb2luKCcsICcpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVHJ5aW5nIHRvIHVzZSBhbiB1bnN1cHBvcnRlZCB0eXBlICgke3RoaXMuY29uZmlnLnR5cGV9KS5cbiAgICAgICAgU3VwcG9ydGVkIHR5cGVzOiAke3N1cHBvcnRlZFR5cGVzfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8RmllbGQ+KGNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5idWlsZEZpZWxkQ29uZmlnKHRoaXMuY29uZmlnKVxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgfVxuXG4gIGJ1aWxkRmllbGRDb25maWcoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcubmFtZSkge1xuICAgICAgY29uZmlnLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcubGFiZWwpIHtcbiAgICAgIGNvbmZpZy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICB9XG4gICAgLy8gVE9ETyBmdXJ0aGVyIGZpZWxkIGNvbmZpZyBwcmVyZW5kZXIgY2hhbmdlc1xuICAgIHJldHVybiBjb25maWc7XG5cbiAgfVxufVxuIl19
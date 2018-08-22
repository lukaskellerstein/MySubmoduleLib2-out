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
const components = {
    button: MyButtonComponent,
    input: MyInputComponent,
    select: MySelectComponent,
    object: ObjectLinkComponent
};
export class DynamicFieldDirective {
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
        }
        if (!config.label) {
            config.label = this.name;
        }
        // TODO further field config prerender changes
        return config;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1maWVsZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mb3JtLWdlbmVyYXRvci8iLCJzb3VyY2VzIjpbImxpYi9keW5hbWljLWZpZWxkL2R5bmFtaWMtZmllbGQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQWdCLFNBQVMsRUFBRSxLQUFLLEVBQTJCLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUVsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFHNUUsTUFBTSxVQUFVLEdBQW9DO0lBQ2xELE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsS0FBSyxFQUFFLGdCQUFnQjtJQUN2QixNQUFNLEVBQUUsaUJBQWlCO0lBQ3pCLE1BQU0sRUFBRSxtQkFBbUI7Q0FDNUIsQ0FBQztBQUtGLE1BQU07Ozs7O0lBWUosWUFDVSxVQUNBO1FBREEsYUFBUSxHQUFSLFFBQVE7UUFDUixjQUFTLEdBQVQsU0FBUztLQUNkOzs7O0lBRUwsV0FBVztRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzVDO0tBQ0Y7Ozs7SUFFRCxRQUFRO1FBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ2xDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQ2Isc0NBQXNDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTsyQkFDbkMsY0FBYyxFQUFFLENBQ3BDLENBQUM7U0FDSDs7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFRLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1Qzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFNO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDMUI7O1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUVmOzs7WUFwREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7Ozs7WUFuQlEsd0JBQXdCO1lBQTJELGdCQUFnQjs7O3FCQXFCekcsS0FBSzttQkFHTCxLQUFLO29CQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT2JqZWN0TGlua0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9vYmplY3QtbGluay9vYmplY3QtbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL3dpZGdldHMvYmFzZS9maWVsZCc7XG5pbXBvcnQgeyBNeUJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1idXR0b24vbXktYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL215LWlucHV0L215LWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNeVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9teS1zZWxlY3QvbXktc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZENvbmZpZyB9IGZyb20gJy4vd2lkZ2V0cy9iYXNlL2ZpZWxkLmNvbmZpZyc7XG5cbmNvbnN0IGNvbXBvbmVudHM6IHsgW3R5cGU6IHN0cmluZ106IFR5cGU8RmllbGQ+IH0gPSB7XG4gIGJ1dHRvbjogTXlCdXR0b25Db21wb25lbnQsXG4gIGlucHV0OiBNeUlucHV0Q29tcG9uZW50LFxuICBzZWxlY3Q6IE15U2VsZWN0Q29tcG9uZW50LFxuICBvYmplY3Q6IE9iamVjdExpbmtDb21wb25lbnRcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkeW5hbWljRmllbGRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRmllbGREaXJlY3RpdmUgaW1wbGVtZW50cyBGaWVsZCwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKVxuICBjb25maWc6IEZpZWxkQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBncm91cDogRm9ybUdyb3VwO1xuXG4gIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPEZpZWxkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuZ3JvdXAgPSB0aGlzLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghY29tcG9uZW50c1t0aGlzLmNvbmZpZy50eXBlXSkge1xuICAgICAgY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5qb2luKCcsICcpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVHJ5aW5nIHRvIHVzZSBhbiB1bnN1cHBvcnRlZCB0eXBlICgke3RoaXMuY29uZmlnLnR5cGV9KS5cbiAgICAgICAgU3VwcG9ydGVkIHR5cGVzOiAke3N1cHBvcnRlZFR5cGVzfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8RmllbGQ+KGNvbXBvbmVudHNbdGhpcy5jb25maWcudHlwZV0pO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgdGhpcy5jb21wb25lbnQuaW5zdGFuY2UuY29uZmlnID0gdGhpcy5idWlsZEZpZWxkQ29uZmlnKHRoaXMuY29uZmlnKVxuICAgIHRoaXMuY29tcG9uZW50Lmluc3RhbmNlLmdyb3VwID0gdGhpcy5ncm91cDtcbiAgfVxuXG4gIGJ1aWxkRmllbGRDb25maWcoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcubmFtZSkge1xuICAgICAgY29uZmlnLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcubGFiZWwpIHtcbiAgICAgIGNvbmZpZy5sYWJlbCA9IHRoaXMubmFtZTtcbiAgICB9XG4gICAgLy8gVE9ETyBmdXJ0aGVyIGZpZWxkIGNvbmZpZyBwcmVyZW5kZXIgY2hhbmdlc1xuICAgIHJldHVybiBjb25maWc7XG5cbiAgfVxufVxuIl19
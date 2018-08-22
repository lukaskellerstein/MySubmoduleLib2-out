import { ComponentFactoryResolver, ComponentRef, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from './widgets/base/field';
import { FieldConfig } from './widgets/base/field.config';
export declare class DynamicFieldDirective implements Field, OnChanges, OnInit {
    private resolver;
    private container;
    config: FieldConfig;
    group: FormGroup;
    component: ComponentRef<Field>;
    constructor(resolver: ComponentFactoryResolver, container: ViewContainerRef);
    ngOnChanges(): void;
    ngOnInit(): void;
}

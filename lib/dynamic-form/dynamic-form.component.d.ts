import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldConfig } from '../dynamic-field/widgets/base/field.config';
export declare class DynamicFormComponent implements OnChanges, OnInit {
    private fb;
    config: {};
    submit: EventEmitter<any>;
    form: FormGroup;
    readonly controls: any[];
    readonly changes: Observable<any>;
    readonly valid: boolean;
    readonly value: any;
    objectGetKeys: (o: {}) => string[];
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    ngOnChanges(): void;
    createGroup(): FormGroup;
    createControl(config: FieldConfig): FormControl;
    handleSubmit(event: Event): void;
    setDisabled(name: string, disable: boolean): void;
    setValue(name: string, value: any): void;
}

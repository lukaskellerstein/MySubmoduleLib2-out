import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FieldConfig } from 'MySubmoduleLib1';
import { Observable } from 'rxjs';
export declare class DynamicFormComponent implements OnChanges, OnInit {
    private fb;
    config: FieldConfig[];
    submit: EventEmitter<any>;
    form: FormGroup;
    readonly controls: FieldConfig[];
    readonly changes: Observable<any>;
    readonly valid: boolean;
    readonly value: any;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    ngOnChanges(): void;
    createGroup(): FormGroup;
    createControl(config: FieldConfig): FormControl;
    handleSubmit(event: Event): void;
    setDisabled(name: string, disable: boolean): void;
    setValue(name: string, value: any): void;
}

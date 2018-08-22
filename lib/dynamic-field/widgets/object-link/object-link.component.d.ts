import { FieldConfig } from '../base/field.config';
import { FormGroup } from '@angular/forms';
import { Field } from '../base/field';
export declare class ObjectLinkComponent implements Field {
    config: FieldConfig;
    group: FormGroup;
    onLinkClick(ev: any): void;
}

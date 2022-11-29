import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'field'
})
export class FieldPipe implements PipeTransform {

    transform(value: any, field: string): any {
        return value[field];
    }
}

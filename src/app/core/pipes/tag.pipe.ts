import { Pipe, PipeTransform } from '@angular/core';
import { Tags } from '../models/tags';

@Pipe({
    name: 'tag'
})
export class TagPipe implements PipeTransform {

    transform(value: keyof typeof Tags.tagStructure | undefined, args?: any): string {
        return value ?
            (args ? Tags.tagStructure[value].color :
            (Tags.tagStructure[value].description || Tags.tagStructure[value].label))
            : Tags.tagArray[0].color;
    }

}

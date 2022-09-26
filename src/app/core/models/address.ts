import { AddressBlock } from './address-block';

export class Address{
    oneLine: string;
    separatedFields: AddressBlock;
    coordinates: any[];

    constructor(){
        this.oneLine = '';
        this.separatedFields = new AddressBlock();
        this.coordinates = [];
    }
}

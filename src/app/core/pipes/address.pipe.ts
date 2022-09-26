import { Pipe, PipeTransform } from '@angular/core';
import { AddressBlock } from '../models/address-block';

@Pipe({
    name: 'address'
})
export class AddressPipe implements PipeTransform {

    transform(value: AddressBlock, args?: any): any {
        let address = '';
        if (!value) return address;
        if (value.region){
            address += value.region + ', ';
        }
        if (value.district){
            address += value.district + ', ';
        }
        if (value.city){
            address += value.city + ', ';
        }
        if (value.settlement){
            address += value.settlement + ', ';
        }
        if (value.admArea){
            address += value.admArea + ', ';
        }
        if (value.area){
            address += value.area + ', ';
        }
        if (value.street){
            address += value.street + ', ';
        }
        if (value.building){
            address += value.building;
        }
        if (value.apartment){
                  address += ', кв. ' + value.apartment;
        }

        if (value.stations && value.stations.length > 0){
            address += value.stations.map(station => ', ост. ' + station.data).reduce((res, st) => res + st);
        }

        address += value.time ? `, время в пути: ${value.time} мин` : '';


        return address;
    }

}

import { Confirmation } from '../../models/entity/contact';

export class AddressBlock /*implements ObjectBlock*/{
    region: string;
    district?: string;
    city?: string;
    settlement?: string;
    admArea?: string;
    area?: string;
    street?: string;
    building?: string;
    apartment?: string;
    time?: number;
    stations?: Confirmation[];


    constructor(...params: any[]){
        // super();
        this.region = params[0] || '';
        this.city = params.length > 1 ? params[1] : '';
        this.street = params.length > 2 ? params[2] : '';
        this.building = params.length > 3 ?  params[3] : '';
        this.area = params.length > 4 ?  params[4] : '';
        this.admArea = params.length > 5 ? params[5] : '';
        this.apartment = params.length > 6 ?  params[6] : '';
        this.stations = params.length > 7 ?  params[7] : [];
        this.time = params.length > 8 ?  params[8] : null;
    }

    /*public static check(block: AddressBlock){
        if(AddressBlock.getAsString(block).replace("\s", "").length == 0){
            return false;
        } else
            return true;
    }


    public static getAsString(block: AddressBlock){
        let address = "";
        if(block.region){
            address += block.region + ", ";
        }
        if(block.city){
            address += block.city + ", ";
        }
        if(block.admArea){
            address += block.admArea + ", ";
        }
        if(block.area){
            address += block.area + ", ";
        }
        if(block.street){
            address += block.street + ", ";
        }
        if(block.building){
            address += block.building;
        }

        if(block.busStops && block.busStops.length > 0){
            address += ", ост. " + block.busStops.join(', ');
        }

        if(block.stations && block.stations.length > 0){
            address += ", ст. " + block.stations.join(', ');
        }
        // if(block.apartment){
        //   address += ", " + block.apartment;
        // }

        return address;
    }*/
}

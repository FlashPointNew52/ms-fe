import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YaGeocoderService } from 'angular8-yandex-maps';
import { AsyncSubject, Observable } from 'rxjs';
import { flatMap } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { AddressBlock } from '../core/models/address-block';
import { ImplService } from './impl.service';

@Injectable({
    providedIn: 'root'
})
export class SuggestionService extends ImplService{

    constructor(
        private http: HttpClient,
        private yaGeocoderService: YaGeocoderService
    ) {
        super('/api/v1.0/');

    }

    kladrList(query: string, contentType: string, parent: string, oneString: boolean): AsyncSubject<string[]>{
        const retSubj = new AsyncSubject() as AsyncSubject<string[]>;

        const withParent = contentType === 'city' ? 1 : 1;
        const resourceUrl = this.RS + `geo/fias?oneString=${oneString}&query=${query}&withParent=${withParent}&parent=${parent || ''}`;

        this.http.get(encodeURI(resourceUrl), {withCredentials: true, headers: this.getHeaders()}).pipe(
            map((res: any) => res)).subscribe(
            raw => {
                const data = JSON.parse(JSON.stringify(raw));
                retSubj.next(data);
                retSubj.complete();
            }, err => {
                // this.sessionService.handle_errors(err);
            });
        return retSubj;
    }

    latLonWithArea(addressBlock: AddressBlock): AsyncSubject<AddressBlock>{
        const retSubj = new AsyncSubject() as AsyncSubject<AddressBlock>;

        const resourceUrl = this.RS + 'geo/latLonWithArea';

        this.http.post(resourceUrl, JSON.stringify(addressBlock), { withCredentials: true, headers: this.getHeaders()}).pipe(
            map((res: any) => res)).subscribe(
            raw => {
                const data = JSON.parse(JSON.stringify(raw));
                retSubj.next(data);
                retSubj.complete();
            }, err => {
                // this._sessionService.handle_errors(err);
            });
        return retSubj;
    }

    addressList(query: string): AsyncSubject<any>{
        const retSubj = new AsyncSubject<any>();
        this.yaGeocoderService.geocode(query, {kind: 'house'}).pipe(
            map( (res: any) => res.geoObjects.toArray().map( (data: any) =>
                {
                    let addressBlock = data.properties.get('metaDataProperty').GeocoderMetaData.Address.Components as any[];
                    let addressStr = '';
                    let addressFull = '';
                    let more: any = {};
                    switch (addressBlock.length) {
                        case 1:
                        case 2:
                            addressFull = data.properties.get('metaDataProperty').GeocoderMetaData.text;
                            addressStr = addressFull;
                            break;
                        default: addressBlock.forEach((prop, i) => {
                            switch (prop.kind) {
                                case "country":
                                    addressFull += prop.name + ", "; break;
                                case "province":
                                    if(i == 2 && prop.name != 'Москва'){
                                        addressFull += prop.name + ", ";
                                        addressStr += prop.name + ", ";
                                    }
                                    break;
                                case 'locality':
                                    addressFull += prop.name;
                                    addressStr += prop.name;
                                    break;
                                case 'street':
                                    addressFull += ", " + prop.name;
                                    addressStr += ", " + prop.name;
                                    break;
                                case 'house':
                                    addressFull += ', д. ' + prop.name;
                                    addressStr += ', д. ' + prop.name;
                                    break;
                                case 'entrance':
                                    addressFull += ', ' + prop.name;
                                    more.entrance = prop.name.substr(prop.name.indexOf('подъезд') + 8);
                                    break;
                                case 'other':
                                    let ind = prop.name.indexOf('кв.');
                                    addressFull += ', ' + prop.name;
                                    if(ind > -1){
                                        more.apartment = prop.name.substr(ind + 4);
                                    } else{
                                        more.floor = prop.name.substr(prop.name.indexOf('этаж') + 4)
                                    }
                                    break;
                            }
                        });
                    }

                    return {
                        name: addressStr,
                        fullname: addressFull,
                        extra: more,
                        address: data.properties.get('metaDataProperty').GeocoderMetaData.Address.Components,
                        coordinates: data.geometry.getCoordinates()
                    }
                }
            ))).subscribe(
            obj => {
                retSubj.next(obj);
                retSubj.complete();
            }
        );
        return retSubj;
    }

    geoInfo(coordinates: []){
        const retSubj = new AsyncSubject<any>();
        this.yaGeocoderService.geocode(coordinates).pipe(
            map( (res: any) => res.geoObjects.toArray()
                .filter((obj: any) => obj.properties._data.metaDataProperty.GeocoderMetaData.kind == 'district')
                .map((obj: any) => obj.properties._data.name)))
            .subscribe(
            obj => {
                retSubj.next(obj);
                retSubj.complete();
            }
        );
        return retSubj;
    }
}

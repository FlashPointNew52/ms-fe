import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type
} from '@angular/core';
import { YaMapInjector } from '../component/viewElements/ya-map-view/ya-map-injector';
import { YaMapRef } from '../component/viewElements/ya-map-view/ya-map-ref';
import { YaMapViewComponent } from '../component/viewElements/ya-map-view/ya-map-view.component';

export class MapConfig {
    data?: any;
    width?: string;
    height?: string;
    style?: any;
    contentStyle?: any;
    styleClass?: string;
}

@Injectable({
    providedIn: 'root'
})
export class MapService {

    yaMapRefMap: Map<YaMapRef, ComponentRef<YaMapViewComponent>> = new Map();

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
    }

    public open(/*componentType: Type<any>, */config: MapConfig) {
        const dialogRef = this.appendDialogComponentToBody(config);

        // this.yaMapRefMap.get(dialogRef)!.instance.childComponentType = componentType;

        return dialogRef;
    }

    private appendDialogComponentToBody(config: MapConfig) {
        const map = new WeakMap();
        map.set(MapConfig, config);

        const dialogRef = new YaMapRef();
        map.set(YaMapRef, dialogRef);

        const sub = dialogRef.onClose.subscribe(() => {
            // this.yaMapRefMap.get(dialogRef)!.instance.exitMap();
        });

        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(YaMapViewComponent);
        const componentRef = componentFactory.create(new YaMapInjector(this.injector, map));

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.yaMapRefMap.set(dialogRef, componentRef);

        return dialogRef;
    }

    private removeDialogComponentFromBody(dialogRef: YaMapRef) {
        if (!dialogRef || !this.yaMapRefMap.has(dialogRef)) {
            return;
        }

        const yaComponentRef = this.yaMapRefMap.get(dialogRef);
        this.appRef.detachView(yaComponentRef!.hostView);
        yaComponentRef!.destroy();
        this.yaMapRefMap.delete(dialogRef);
    }
}

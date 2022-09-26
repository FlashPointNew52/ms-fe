import { NgZone } from '@angular/core';
import { YaEvent } from 'angular8-yandex-maps';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';


type EventManagerTarget = {
    events: ymaps.IEventManager;
};


export class EventManager {
    private _pending: {
        observable: Observable<any>;
        observer: Subscriber<any>;
    }[] = [];

    private _listeners: {
        name: string;
        callback: (e: ymaps.Event) => void;
        manager: ymaps.IEventManager;
    }[] = [];

    private readonly _targetStream = new BehaviorSubject<EventManagerTarget | undefined>(undefined);

    constructor(private readonly _ngZone: NgZone) {}


    getLazyEmitter(name: string): Observable<YaEvent> {
        return this._targetStream.pipe(
            switchMap((target) => {
                const observable = new Observable<YaEvent>((observer) => {
                    // If the target hasn't been initialized yet, cache the observer so it can be added later.
                    if (!target) {
                        this._pending.push({ observable, observer });
                        return undefined;
                    }

                    const callback = (event: ymaps.Event) => {
                        const e = {
                            event,
                            target,
                            ymaps,
                        };

                        this._ngZone.run(() => observer.next(e));
                    };

                    const listener = target.events.add(name, callback);
                    this._listeners.push({ name, callback, manager: listener });

                    // Unsubscribe function
                    return () => listener.remove(name, callback as any);
                });

                return observable;
            }),
        );
    }

    /**
     * Sets the current target that the manager should bind events to.
     * @param target
     */
    setTarget(target: EventManagerTarget): void {
        const currentTarget = this._targetStream.value;

        if (target === currentTarget) {
            return;
        }

        // Clear the listeners from the pre-existing target.
        if (currentTarget) {
            this._clearListeners();
            this._pending = [];
        }

        this._targetStream.next(target);

        // Add the listeners that were bound before the map was initialized.
        this._pending.forEach((subscriber) => subscriber.observable.subscribe(subscriber.observer));

        this._pending = [];
    }

    /**
     * Destroys the manager and clears the event listeners.
     */
    destroy(): void {
        this._clearListeners();
        this._pending = [];
        this._targetStream.complete();
    }

    /**
     * Clears all currently-registered event listeners.
     */
    private _clearListeners() {
        this._listeners.forEach((listener) => {
            const { name, callback, manager } = listener;
            manager.remove(name, callback as any);
        });

        this._listeners = [];
    }
}

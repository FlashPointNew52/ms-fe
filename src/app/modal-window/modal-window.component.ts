import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Message, MessageType } from '../models/message';
import { closeMessage } from '../store/actions/message.actions';
import { AppState,  selectMessageState } from '../store/states/app.states';

@Component({
    selector: 'app-modal-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.scss'],
    providers: [DynamicDialogRef, DynamicDialogConfig]
})
export class ModalWindowComponent implements OnInit {
    message: Message = new Message('', MessageType.INFO);
    constructor(private store: Store<AppState>,
                private changeDetectorRef: ChangeDetectorRef,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {
    }

    ngOnInit(): void {
        this.store.select(selectMessageState).subscribe((state) => {
            this.message = state.message;
            this.changeDetectorRef.detectChanges();
        });
    }

    close(): void{
        this.store.dispatch(closeMessage());
    }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() isOpen = false;
  @Input() message: string = '';
  @Output() close = new EventEmitter<boolean>();

  onConfirm() {
    this.close.emit(true);
    this.isOpen = false;
  }

  onCancel() {
    this.close.emit(false);
    this.isOpen = false;
  }



  

}

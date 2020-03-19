import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'notes-header',
  templateUrl: './notes-header.component.html',
  styleUrls: ['./notes-header.component.scss']
})
export class NotesHeaderComponent implements OnInit {
  constructor(private smartModal: NgxSmartModalService) {}

  ngOnInit() {}

  openNoteModal() {
    const modal = this.smartModal.getModal('noteModal');
    if (!modal) return;
    modal.removeData();
    modal.open();
  }
}

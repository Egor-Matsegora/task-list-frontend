import { NgxSmartModalService } from 'ngx-smart-modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  constructor(private smartModal: NgxSmartModalService) {}

  ngOnInit() {}

  closeTaskModal() {
    const taskModal = this.smartModal.getModal('taskModal');
    taskModal && taskModal.close();
  }
}

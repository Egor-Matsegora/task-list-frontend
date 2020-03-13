import { NgxSmartModalService } from 'ngx-smart-modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tasks-header',
  templateUrl: './tasks-header.component.html',
  styleUrls: ['./tasks-header.component.scss']
})
export class TasksHeaderComponent implements OnInit {
  constructor(private smartModal: NgxSmartModalService) {}

  ngOnInit() {}

  openTaskModal() {
    const taskModal = this.smartModal.getModal('taskModal');
    taskModal && taskModal.open();
  }
}

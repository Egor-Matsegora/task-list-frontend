import { enterAnimation, leaveAnimation } from '@app/animations/item-dropdown.animations';
import { trigger, transition, useAnimation } from '@angular/animations';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tasks-header',
  templateUrl: './tasks-header.component.html',
  styleUrls: ['./tasks-header.component.scss'],
  animations: [
    trigger('actionsAnimation', [
      transition(':enter', useAnimation(enterAnimation)),
      transition(':leave', useAnimation(leaveAnimation))
    ])
  ]
})
export class TasksHeaderComponent implements OnInit {
  constructor(private smartModal: NgxSmartModalService) {}
  isActionsOpen: boolean = false;

  ngOnInit() {}

  openTaskModal() {
    const taskModal = this.smartModal.getModal('taskModal');
    if (!taskModal) return;
    taskModal.removeData();
    taskModal.open();
  }

  openActions() {
    this.isActionsOpen = !this.isActionsOpen;
  }
}

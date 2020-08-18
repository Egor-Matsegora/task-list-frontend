import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Store } from '@ngrx/store';
import { LoginActions } from '../../store/actions';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private store: Store, private smartModal: NgxSmartModalService, private toastr: ToastrService) {}

  logout() {
    this.store.dispatch(LoginActions.logoutAction());
    this.close();
    this.toastr.info('Жаль что вы уже уходите :(');
  }

  close() {
    const authModal = this.smartModal.getModal('authModal');
    authModal && authModal.close();
  }
}

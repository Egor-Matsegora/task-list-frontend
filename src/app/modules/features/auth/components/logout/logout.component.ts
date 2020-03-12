import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/core/services/auth/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private smartModal: NgxSmartModalService,
    private toastr: ToastrService
  ) {}

  logout() {
    this.authService.logout();
    this.close();
    this.toastr.info('Жаль что вы уже уходите :(');
  }

  close() {
    const authModal = this.smartModal.getModal('authModal');
    authModal && authModal.close();
  }
}

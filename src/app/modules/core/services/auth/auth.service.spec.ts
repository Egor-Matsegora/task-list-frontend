// import { RouterTestingModule } from '@angular/router/testing';
// import { AsideStateService } from './../aside-state/aside-state.service';
// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// import { AuthService } from './auth.service';

// import { LayoutComponent } from '@features/layout/layouts/layout/layout.component';

// let authService: AuthService;
// let asideState: AsideStateService;

// const routes = [
//   {
//     path: '',
//     component: LayoutComponent,
//     loadChildren: () => import('@features/layout/layout.module').then(m => m.LayoutModule)
//   }
// ];

// describe('AuthService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
//       providers: [AuthService]
//     });

//     asideState = jasmine.createSpyObj('asideState', ['setDefaultState', 'removeAsideStorageState']);

//     authService = TestBed.get(AuthService);
//   });

//   it('should be created', () => {
//     expect(authService).toBeTruthy();
//     expect(asideState).toBeTruthy();
//   });
// });

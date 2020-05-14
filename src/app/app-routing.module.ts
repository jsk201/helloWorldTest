import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { IndexComponent } from './pages/index/index.component';
import { RootComponent } from './pages/root/root.component';


const routes: Routes = [
  {
    path: "",
    component: RootComponent,
    children: [
      {
        path: "signin",
        component: SignupComponent,
        data: {
          breadcrumb: "SIGNIN"
        }
      },
      {
        path: "signup",
        component: SignupComponent,
        data: {
          breadcrumb: "SIGNUP"
        }
      },
      {
        path: "",
        component: IndexComponent
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDashboardComponent } from './shared/component/post-dashboard/post-dashboard.component';
import { PostComponent } from './shared/component/post/post.component';
import { PostFormComponent } from './shared/component/post-form/post-form.component';

const routes: Routes = [
  {path : 'home', component : PostDashboardComponent},//localhost:4200/home
  {path:'', redirectTo:'home',pathMatch:'full'}, //localhost:4200
  {path:'post/:postId', component : PostComponent},
  {path:'post/:postId/edit',component : PostFormComponent},
  {path:'addPost',component : PostFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

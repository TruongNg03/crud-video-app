import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'videos', pathMatch: 'full' },
  {
    path: 'videos',
    loadChildren: () =>
      import('./videos/videos.module').then((m) => m.VideosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

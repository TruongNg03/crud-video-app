import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { VideosComponent } from './videos.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoWatchComponent } from './video-watch/video-watch.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoCreateComponent } from './video-create/video-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoEditComponent } from './video-edit/video-edit.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    children: [
      { path: '', component: VideoListComponent },
      { path: 'watch/:id', component: VideoWatchComponent },
      { path: 'create', component: VideoCreateComponent },
      { path: 'edit/:id', component: VideoEditComponent },
    ],
  },
];

@NgModule({
  declarations: [
    VideosComponent,
    VideoListComponent,
    VideoCardComponent,
    VideoWatchComponent,
    VideoCreateComponent,
    VideoEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class VideosModule {}

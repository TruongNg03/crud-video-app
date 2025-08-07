import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-video-watch',
  templateUrl: './video-watch.component.html',
  styleUrls: ['./video-watch.component.scss'],
})
export class VideoWatchComponent implements OnInit {
  video!: Video;
  idVideo = '';
  videoUrl!: SafeResourceUrl;
  hasVideo = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private apiService: ApiService
  ) {
    // get id from param
    this.idVideo = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    // get data video
    this.apiService.getVideos({ idVideo: this.idVideo }).subscribe({
      next: (data) => {
        console.log('get video info from api:', data.videos[0]);
        // not found video: return json: { msg: '.....' }

        if (data.msg) {
          this.hasVideo = false;
          return;
        } else if (data.videos && data.videos.length) {
          this.video = data.videos[0];

          const url = `https://www.youtube.com/embed/${this.video.idVideo}`;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        } else {
          console.log('No video data');
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.hasVideo = false;
      },
    });
  }
}

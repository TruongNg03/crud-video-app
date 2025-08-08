import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Video } from 'src/app/models/video';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-video-watch',
  templateUrl: './video-watch.component.html',
  styleUrls: ['./video-watch.component.scss'],
})
export class VideoWatchComponent implements OnInit {
  video!: Video;
  randomListVideos: Video[] = [];
  idVideo = '';
  videoUrl!: SafeResourceUrl;
  hasVideo = true;
  hasListVideo = true;

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
    this.getVideosFromApi(this.idVideo).subscribe((videos) => {
      // api return [[...]]
      this.video = videos[0];
      this.updateUrl(this.video.idVideo);
      this.putVideoToFront();
    });

    this.getVideosFromApi().subscribe((videos) => {
      // get random video
      this.randomListVideos =
        videos.length > 7 ? this.getRandomItems(videos, 7) : videos;

      // put current video to top
      this.putVideoToFront();
    });

    console.log(this.randomListVideos);
  }

  getVideosFromApi(searchIdVideo?: string): Observable<any[]> {
    const filter = searchIdVideo ? { idVideo: searchIdVideo } : {};

    return this.apiService.getVideos(filter).pipe(
      map((data) => {
        console.log(
          `get data from getVideo...(${searchIdVideo || ''}):`,
          data.videos
        );

        if (data.msg) {
          return [];
        }
        return data.videos && data.videos.length ? data.videos : [];
      }),
      catchError(() => of([]))
    );
  }

  getRandomItems(arr: Video[], numberVideo: number): Video[] {
    const arrayCopy = [...arr];

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    return arrayCopy.slice(0, numberVideo);
  }

  updateUrl(idVideo: string) {
    const url = `https://www.youtube.com/embed/${idVideo}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onClickVideoItem(idVideo: string) {
    console.log(idVideo);
    this.updateUrl(idVideo);
  }

  putVideoToFront() {
    const index = this.randomListVideos.findIndex(
      (v) => v.idVideo === this.video.idVideo
    );

    if (index > -1) {
      this.randomListVideos.splice(index, 1);
    }

    if (this.video !== undefined) {
      this.randomListVideos.unshift(this.video);
    }

    //
    this.hasListVideo = this.randomListVideos.length > 0;
    console.log('boolean', this.hasListVideo, this.randomListVideos);
  }
}

import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
  videos: Video[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos() {
    this.apiService.getVideos().subscribe({
      next: (data) => {
        this.videos = data.videos;
        this.errorMessage = ''; // ← xoá lỗi nếu thành công

        console.log('get data from api:', data.videos);
      },
      error: (error) => {
        console.log(error);

        this.errorMessage =
          error?.error?.message ||
          error?.error?.message ||
          'Đã xảy ra lỗi khi lấy video';
      },
    });
  }

  onVideoDeleted(id: string) {
    this.loadVideos();
  }
}

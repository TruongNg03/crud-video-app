import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/models/video';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {
  @Input() video!: Video;
  @Input() showButton!: boolean;
  @Output() deleted = new EventEmitter<string>();
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  handleEdit() {
    console.log('edit:', this.video._id);
  }

  handleDelete() {
    console.log('confirm delete:', this.video._id);

    const confirmed = confirm('Do you want to delete video: ' + this.video._id);
    if (!confirmed) return;

    //  [DELETE] to api
    this.apiService.deleteVideo(this.video._id).subscribe({
      next: (data) => {
        if (this.video._id) {
          this.deleted.emit(this.video._id);
        }

        alert(data.msg);
        console.log(data.msg);
      },
      error: (error) => {
        console.log(error);

        this.errorMessage =
          error?.error?.message || error?.error?.message || 'Đã xảy ra lỗi';

        alert(this.errorMessage);
      },
    });
  }
}

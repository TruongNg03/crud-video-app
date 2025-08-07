import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss'],
})
export class VideoEditComponent implements OnInit {
  editForm!: FormGroup;
  idVideo = '';
  currVideo = {
    _id: '',
    title: '',
    idVideo: '',
    img: '',
  };
  videoUrl!: SafeResourceUrl;
  showPreview = false;
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // get id from param
    this.idVideo = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    // get data video from api
    if (this.idVideo) {
      this.apiService.getVideos({ idVideo: this.idVideo }).subscribe({
        next: (data) => {
          console.log('get video info from api:', data);
          // not found video: return json: { msg: '.....' }

          if (data.msg) {
            alert(data.msg);
            return;
          }
          if (data.videos && data.videos.length) {
            this.currVideo = data.videos[0];

            this.updateVideoUrl(this.currVideo.idVideo);

            // tạo form với giá trị ban đầu từ API
            this.editForm = this.fb.group({
              title: [this.currVideo.title, Validators.required],
              idVideo: [this.currVideo.idVideo, Validators.required],
              img: [this.currVideo.img, Validators.required],
            });
          } else {
            alert('No video data');
          }
        },
        error: (err) => {
          console.error('API error:', err);
        },
      });
    }
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    // log edit info
    console.log(this.editForm.value);

    const { _id, ...changeVideo } = this.editForm.value;

    // [PUT] api
    this.apiService.editVideo(this.currVideo._id, changeVideo).subscribe({
      next: (data) => {
        console.log(data);

        alert(data.msg);
        this.editForm.reset();

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);

        this.errorMessage =
          error?.error?.message || error?.error?.message || 'Đã xảy ra lỗi';

        alert(this.errorMessage);
      },
    });
  }

  updateVideoUrl(idVideo: string) {
    const url = `https://www.youtube.com/embed/${idVideo}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onShowPreview() {
    // cập nhật videoUrl
    this.updateVideoUrl(this.editForm.value.idVideo);
    this.currVideo = { ...this.currVideo, ...this.editForm.value };
    console.log(this.currVideo);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.scss'],
})
export class VideoCreateComponent implements OnInit {
  createForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      _id: null,
      title: ['', Validators.required],
      idVideo: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    console.log(this.createForm.value);

    const { _id, ...newVideo } = this.createForm.value;

    // [POST] api
    this.apiService.createVideo(newVideo).subscribe({
      next: (data) => {
        console.log(data);

        alert(data.msg);
        this.createForm.reset();
      },
      error: (error) => {
        if (error.status === 0) {
          this.errorMessage = 'Không thể kết nối tới máy chủ';
        } else {
          this.errorMessage =
            error?.error?.message ||
            error?.error?.msg ||
            error?.message ||
            'Đã xảy ra lỗi không xác định.';
        }

        console.log(error);

        alert(this.errorMessage);
      },
    });
  }
}

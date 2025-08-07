import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8765/api/videos';

  constructor(private http: HttpClient) {}

  getVideos(options?: { id?: string; idVideo?: string }): Observable<any> {
    const searchId = options?.id ? `?id=${options.id}` : `?id=`;
    const searchIdVideo = options?.idVideo
      ? `idVideo=${options.idVideo}`
      : `idVideo=`;
    const url = this.baseUrl + searchId + '&' + searchIdVideo;

    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Lỗi khi gọi getVideos:', error);
        return throwError(error);
      })
    );
  }

  createVideo(video: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, video).pipe(
      catchError((error) => {
        console.error('Lỗi khi gọi createVideo:', error);
        return throwError(error);
      })
    );
  }

  editVideo(id: string | null, video: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/edit?id=${id}`, video).pipe(
      catchError((error) => {
        console.error('Lỗi khi gọi editVideo:', error);
        return throwError(() => error);
      })
    );
  }

  deleteVideo(id: string | null): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-permanent?id=${id}`).pipe(
      catchError((error) => {
        console.error('Lỗi khi gọi deleteVideo:', error);
        return throwError(() => error);
      })
    );
  }
}

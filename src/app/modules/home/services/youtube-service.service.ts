import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeServiceService {

  public inputValue$ = new BehaviorSubject<string>('');

  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  private videoUrl = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(private http: HttpClient) {}


  setInputValue(value) {
    this.inputValue$.next(value);
  }

  getInputValue() {
    return this.inputValue$.asObservable();
  }

  getVideos(
    pageToken: string = '',
    searchTerm: string = '',
    sortBy: string = '',
    channelId:string = 'UCn3r_vCCNRGk1CFgcir-29A'
  ): Observable<any> {
    let params: { [key: string]: any } = {
      part: 'snippet',
      type: 'video',
      channelId: channelId,
      maxResults: '10',
      key: 'AIzaSyCD24yqIc04zv0GEH5tEeXBaApqfUfGI_k',
      pageToken: pageToken,
    };
    if (searchTerm) {
      params['q'] = searchTerm;
    }
    if (sortBy) {
      params['order'] = sortBy;
    }
    return this.http.get(this.apiUrl, { params: params });
  }


  getVideoById(id: string): Observable<any> {
    const params = {
      id: id,
      key: `AIzaSyCD24yqIc04zv0GEH5tEeXBaApqfUfGI_k`,
      part: 'snippet'
    };
    return this.http.get<any>(this.videoUrl, { params: params })
  }

}

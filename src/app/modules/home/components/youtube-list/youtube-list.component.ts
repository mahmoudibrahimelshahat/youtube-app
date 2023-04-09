import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { YoutubeServiceService } from '../../services/youtube-service.service';
import { MessageService, SortEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { IVideos } from '../../models/videos';

@Component({
  selector: 'app-youtube-list',
  templateUrl: './youtube-list.component.html',
  styleUrls: ['./youtube-list.component.scss'],
})
export class YoutubeListComponent implements OnInit {
  videos: IVideos;
  sortBy: String = '';
  searchTerm: String = '';
  currentPageToken: String = '';
  prevPageToken: string = '';
  channelId: string =  'UCn3r_vCCNRGk1CFgcir-29A'
  hasPrevToken: boolean = false;
  searchInputProcess = new FormControl('');

  constructor(
    private youtubeService: YoutubeServiceService,
    private router: Router,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    this.getVideos(this.currentPageToken, this.searchTerm, this.sortBy, this.channelId);
    this.onSeachListenerProcess();
    this.onSetChannelId();
  }

  getVideos(pageToken, searchTerm, sortBy, channelId) {
    this.youtubeService.getVideos(pageToken, searchTerm, sortBy, channelId).subscribe(
      (res) => {
        this.videos = res;
        localStorage.setItem('videos', JSON.stringify(res));
      },
      (err) => {        
        this.messageService.add({ severity: 'error', detail: err.message });

        if (err.status == 0 || err.status == 403) {
          this.videos = JSON.parse(localStorage.getItem('videos')!);
        }
      }
    );
  }

  onSort(event: SortEvent) {
    this.sortBy = String(event.field);
    this.getVideos(this.currentPageToken, this.searchTerm, this.sortBy, this.channelId);
  }

  onPageNext() {
    this.currentPageToken = this.videos.nextPageToken;
    this.youtubeService
      .getVideos(
        `${this.currentPageToken}`,
        `${this.searchTerm}`,
        `${this.sortBy}`,
        `${this.channelId}`
      )
      .subscribe((res) => {
        this.videos = res;
        this.currentPageToken = res?.nextPageToken;
        this.prevPageToken = res?.prevPageToken;
        return res?.prevPageToken
          ? (this.hasPrevToken = true)
          : (this.hasPrevToken = false);
      });
  }

  onPagePrevious() {
    this.youtubeService
      .getVideos(
        `${this.prevPageToken}`,
        `${this.searchTerm}`,
        `${this.sortBy}`,
        `${this.channelId}`
      )
      .subscribe((res) => {
        this.videos = res;
        this.currentPageToken = res?.nextPageToken;
        this.prevPageToken = res?.prevPageToken;
        return res?.prevPageToken
          ? (this.hasPrevToken = true)
          : (this.hasPrevToken = false);
      });
  }

  onSeachListenerProcess() {
    this.searchInputProcess.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((res) => {
        // this.youtubeService.setInputValue(res)
        this.searchTerm = `${res}`;
        this.getVideos(this.currentPageToken, this.searchTerm, this.sortBy, this.channelId);
      });
  }

  onSetChannelId(){
      this.youtubeService.inputValue$.subscribe((res) => {
        if(res){
          localStorage.clear()
          this.channelId = res
          this.getVideos(this.currentPageToken, this.searchTerm, this.sortBy, this.channelId);
        }
      },
      err=>{
        this.messageService.add({ severity: 'error',detail: err.message });
      });
  
  }

  navigateToDetails(videoId) {
    this.router.navigate([`home/video/${videoId}`]);
  }
}

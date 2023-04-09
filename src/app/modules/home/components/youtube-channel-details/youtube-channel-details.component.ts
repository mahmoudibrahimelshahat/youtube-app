import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeServiceService } from '../../services/youtube-service.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Irate_IFavorite } from '../../models/rate-favorite';
import { IVideo } from '../../models/video-details';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-youtube-channel-details',
  templateUrl: './youtube-channel-details.component.html',
  styleUrls: ['./youtube-channel-details.component.scss']
})
export class YoutubeChannelDetailsComponent implements OnInit {

  id;
  videoDetails:IVideo;
  faThumbsUp = faThumbsUp;
  rateValue: number = 0
  isAddedToFavList: boolean = false
  favoriteList:Irate_IFavorite[];
  ratingList:Irate_IFavorite[] = JSON.parse(localStorage.getItem('rating List')!);

  constructor(private router: ActivatedRoute,
    private youtubeService: YoutubeServiceService,
    private messageService:MessageService
    ) {
    this.id = this.router.snapshot.paramMap.get('id')
    this.favoriteList = JSON.parse(localStorage.getItem('Favorite List')!)
  }

  ngOnInit(): void {
    this.getVideoDetailsById()    
  }

  getVideoDetailsById() {
    this.youtubeService.getVideoById(this.id).subscribe(res => {
      this.videoDetails = res
    },err=>{
      this.messageService.add({ severity: 'error',detail: err.message });
    })
  }

  addToFavoriteList(): void {
    const favItem = { item: this.videoDetails.items?.[0] };
    const storedList = JSON.parse(localStorage.getItem('Favorite List') ?? '[]');
    if (storedList.some(element => element.item.id === this.id)) {
      this.messageService.add({ severity: 'info',detail: 'the video is already in their favorites' });
      return;
    }
    storedList.push(favItem);
    this.messageService.add({ severity: 'success',detail: 'the video is added in their favorites' });
    console.log('Added to favorites:', storedList);
    localStorage.setItem('Favorite List', JSON.stringify(storedList));
    this.favoriteList = storedList;
  }

  onSelectRate(): void {
    const favItem = { rate: this.rateValue, item: this.videoDetails.items?.[0] };
    const storedList = JSON.parse(localStorage.getItem('rating List') ?? '[]');
    const index = storedList.findIndex(element => element.item.id === this.id);
    if (index !== -1) {
      storedList[index].rate = this.rateValue;
      this.messageService.add({ severity: 'success',detail: 'the video is updated sucssefully' });
      console.log('Updated rating:', storedList[index]);
    } else {
      storedList.push(favItem);
      this.messageService.add({ severity: 'success',detail: 'the videos rate is added sucssefully' });
      console.log('Added rating:', favItem);
    }
    localStorage.setItem('rating List', JSON.stringify(storedList));
    this.ratingList = storedList;
  }
  


}


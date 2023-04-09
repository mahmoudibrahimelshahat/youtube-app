import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { YoutubeServiceService } from 'src/app/modules/home/services/youtube-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchInputProcess = new FormControl('')
  hasSearch
  constructor(private youtubeService:YoutubeServiceService, private activeRoute: ActivatedRoute,
    private router: Router) { 
      this.router.events.subscribe(res=>{
        activeRoute.snapshot.firstChild?.firstChild?.data['hasSearch'] == undefined ? this.hasSearch = true : this.hasSearch = false
      })
  }

  ngOnInit(): void {
    this.seachListenerProcess()
  }

  seachListenerProcess(){
    this.searchInputProcess.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(res=>{
      this.youtubeService.setInputValue(res)
    })
   }
  
}

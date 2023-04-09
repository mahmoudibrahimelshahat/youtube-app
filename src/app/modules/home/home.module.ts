import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { YoutubeListComponent } from './components/youtube-list/youtube-list.component';
import { YoutubeChannelDetailsComponent } from './components/youtube-channel-details/youtube-channel-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    YoutubeListComponent,
    YoutubeChannelDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    
  ]
})
export class HomeModule { }

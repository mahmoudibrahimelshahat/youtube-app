import { YoutubeListComponent } from './components/youtube-list/youtube-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeChannelDetailsComponent } from './components/youtube-channel-details/youtube-channel-details.component';

const routes: Routes = [
  {
    path:'',
    component:YoutubeListComponent
  },
  {
    path:'video/:id',
    component:YoutubeChannelDetailsComponent,
    data: {
      hasSearch : false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

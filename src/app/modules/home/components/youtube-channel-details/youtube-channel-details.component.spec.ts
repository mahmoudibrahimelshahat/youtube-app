import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeChannelDetailsComponent } from './youtube-channel-details.component';

describe('YoutubeChannelDetailsComponent', () => {
  let component: YoutubeChannelDetailsComponent;
  let fixture: ComponentFixture<YoutubeChannelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeChannelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeChannelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

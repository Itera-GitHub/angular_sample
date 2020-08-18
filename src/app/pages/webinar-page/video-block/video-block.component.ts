import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent implements OnInit {
  @Input() videoId: string;
  @Input() videoPreview: string;
  showVideo: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  playVideo(e) {
    this.showVideo = true;
  }

}

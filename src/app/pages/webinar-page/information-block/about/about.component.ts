import { Component, OnInit, Input } from '@angular/core';
import { Webinar } from '../../../../basics/interfaces/webinar';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @Input() webinarData: Webinar;
  constructor() { }

  ngOnInit(): void {
  }

}

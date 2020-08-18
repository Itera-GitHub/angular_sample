import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  @Input() cityData: any;
  @Input() cityName: string;
  @Input() buttonText: string;
  constructor() { }

  ngOnInit(): void {
  }
}

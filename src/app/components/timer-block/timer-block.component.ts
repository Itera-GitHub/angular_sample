import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer-block',
  templateUrl: './timer-block.component.html',
  styleUrls: ['./timer-block.component.scss']
})
export class TimerBlockComponent implements OnInit {
  _time: any;
  @Input() isLastItem: boolean;
  @Input() set time(time) {
    this._time = time;
  };
  constructor() { }

  ngOnInit(): void {
  }

}

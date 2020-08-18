import { Component, OnInit, Input } from '@angular/core';
import { Webinar } from '../../../../basics/interfaces/webinar';

@Component({
  selector: 'app-what-learn',
  templateUrl: './what-learn.component.html',
  styleUrls: ['./what-learn.component.scss']
})
export class WhatLearnComponent implements OnInit {
  @Input() webinarData: Webinar;
  constructor() { }

  ngOnInit(): void {
  }

}

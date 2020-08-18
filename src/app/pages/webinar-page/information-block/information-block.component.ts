import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthCustomService } from '../../../services/pages/auth.service';
import { User } from '../../../basics/interfaces/user';

@Component({
  selector: 'app-information-block',
  templateUrl: './information-block.component.html',
  styleUrls: ['./information-block.component.scss']
})
export class InformationBlockComponent implements OnInit {
  @Input() webinarData: any;
  @Input() faqs: any;
  user: User;

  constructor(private auth: AuthCustomService) {
  	this.user = this.auth.getUser();
	}

  ngOnInit() {
  }

  scrollToRegistrationBlock() {
    const block = document.getElementById('registrationBlock');
    block.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

}

import { Component, OnInit, Inject} from '@angular/core';

import {Leader} from "../shared/leader";

import {LeaderService} from "../services/leader.service";
import {expand, flyInOut} from "../animations/app.animation";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
     expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errLeadMess: string;

  selectedLeader: Leader;

  constructor(private leadersservice: LeaderService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leadersservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders, errmess => this.errLeadMess = <any>errmess);
  }

}

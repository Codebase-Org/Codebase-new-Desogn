import {Component, OnInit} from '@angular/core';
import {Imails} from "../../interfaces/imails";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  isActive: boolean = false;
  mails: Imails[] = [
    {
      message_id: 1,
      to_account_id: 2,
      from_account_id: 99,
      subject: "Halløj Test",
      content: "dette er en test",
      send_date: "01-09-2023 12:41:35",
      readornot: 1
    },
    {
      message_id: 7,
      to_account_id: 5,
      from_account_id: 1,
      subject: "Testeren",
      content: "dette er en test",
      send_date: "01-09-2023 12:41:35",
      readornot: 1
    },
    {
      message_id: 3,
      to_account_id: 10,
      from_account_id: 15,
      subject: "Super Testen",
      content: "dette er en test",
      send_date: "01-09-2023 12:41:35",
      readornot: 1
    },
    {
      message_id: 5,
      to_account_id: 8,
      from_account_id: 3,
      subject: "Velkomst Testerne",
      content: "dette er en test",
      send_date: "01-09-2023 12:41:35",
      readornot: 1
    }
  ];

  ngOnInit() {
  }

  readMail(event: any) {
    let message_id = event.getAttribute('id');
    //console.log(message_id);
  }

  showDropdown() {
    this.isActive = !this.isActive;
  }

  filterMails() {
    this.mails.sort((a,b) => a.message_id - b.message_id);
  }
}

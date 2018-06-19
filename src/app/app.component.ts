import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  today: Date = new Date(0);

  updateDate(date: any)
  {
    console.info(date);
    this.today = date;
  }
}

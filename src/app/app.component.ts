import { Component, OnDestroy } from '@angular/core';
import { DateService } from './date.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DateService]
})
export class AppComponent implements OnDestroy {
  title = 'app';
  today: Date = new Date(0);
  subscription : Subscription;

  constructor(private dateService: DateService) {
    this.subscription = dateService.dateChanged$.subscribe(
      date => {
        this.today = new Date(date);
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  resetDate()
  {
    this.dateService.resetDate(new Date());
  }
}

import { Component, OnInit } from '@angular/core';
import {Day} from '../day'
import {Label} from '../label'

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit {

  date : Date = new Date();
  days : Day[] = [];
  firstMonday : Date = new Date();

  constructor() { 
    this.updateCalendar();
  }

  updateCalendar()
  {
    this.days = [];
    //dayOfWeek starting with Monday
    var firstOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, -this.date.getTimezoneOffset());
    var dayOfWeek = firstOfMonth.getDay() - 1;
    if (dayOfWeek < 0)
    {
      dayOfWeek = 6;
    }
    this.firstMonday = new Date(firstOfMonth.getTime() - dayOfWeek * 86400000);

    var date = new Date(this.firstMonday.getTime());
    for (var i = 0; i < 6; i++)
    {
      for (var j = 0; j < 7; j++)
      {
        var day = new Day();
        day.day = date.getDate();
        day.date = date;
        day.isCurrentMonth = date.getMonth() == this.date.getMonth();
        day.labels = [];
        var rnd = Math.floor(Math.random() * 4);
        for (var k = 0; k < rnd; k++)
        {
          var label = new Label();
          label.text = k + '';
          day.labels.push(label);
        }
        this.days.push(day);
        date = new Date(date.getTime() + 86400000);
      }
    }
  }

  ngOnInit() {

  }

  createRange(number){
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    return items;
  }

  showToast(day: Day)
  {
    alert(day.day);
  }
  /*
  dragStart(ev)
  {
    ev.dataTransfer.setData("class", ev.target.className);
    //this.isDrag = true;
  }

  drop(ev)
  {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.target.className != ev.dataTransfer.getData('class'))
    {
      console.log("Swap");
    }
    //this.isDrag = false;
    ev.target.classList.remove('drag-hover');
  }

  allowDrop(ev)
  {
    ev.preventDefault();
    ev.stopPropagation();
  }*/
}

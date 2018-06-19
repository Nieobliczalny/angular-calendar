import { Component, OnInit, Inject } from '@angular/core';
import {Day} from '../day'
import {Label} from '../label'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, NativeDateModule} from '@angular/material';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

export const STORAGE_KEY: string = "savedLabels";

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit {

  date : Date = new Date();
  days : Day[] = [];
  firstMonday : Date = new Date();
  addText : string;
  addDate : Date;
  labels : Label[] = [];

  constructor(public dialog: MatDialog, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    var savedData = JSON.parse(this.storage.get(STORAGE_KEY));
    if (savedData != null)
    {
      for (var i = 0; i < savedData.length; i++)
      {
        var save : Label = new Label();
        save.text = savedData[i].text;
        save.time = savedData[i].time;
        this.labels.push(save);
      }
    }
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
        var startTime = (new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)).getTime();
        var endTime = (new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)).getTime();

        for (var k = 0; k < this.labels.length; k++)
        {
          if (this.labels[k].time >= startTime && this.labels[k].time <= endTime)
          {
            day.labels.push(this.labels[k]);
          }
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
    let dialogRef = this.dialog.open(ShowDayDialog, {
      width: '50%',
      data: { dayData: day, removedLabels: [] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        for (var i = 0; i < this.labels.length; i++)
        {
          for (var j = 0; j < result.removedLabels.length; j++)
          {
            if (this.labels[i] === result.removedLabels[j])
            {
              this.labels.splice(i, 1);
            }
          }
        }
        if (result.removedLabels.length > 0)
        {
          this.saveInLocalStorage();
        }
      }
      this.updateCalendar();
    });
  }

  showAdd()
  {
    let dialogRef = this.dialog.open(AddNewItemDialog, {
      width: '250px',
      data: { text: this.addText, data: this.addDate, time: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        var save = new Label();
        save.text = result.text;
        save.time = result.data.getTime();
        var timeData = result.time.split(':');
        save.time += parseInt(timeData[0]) * 3600000;
        save.time += parseInt(timeData[1]) * 60000;
        this.labels.push(save);
        this.saveInLocalStorage();
        this.updateCalendar();
      }
    });
  }

  saveInLocalStorage()
  {
    var data = [];
    for (var i = 0; i < this.labels.length; i++)
    {
      var obj = { text: this.labels[i].text, time: this.labels[i].time };
      data.push(obj);
    }
    this.storage.set(STORAGE_KEY, JSON.stringify(data));
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

@Component({
  selector: 'add-new-item-dialog',
  templateUrl: 'add-new-item-dialog.html',
})
export class AddNewItemDialog {

  constructor(
    public dialogRef: MatDialogRef<AddNewItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'show-day-dialog',
  templateUrl: 'show-day-dialog.html',
})
export class ShowDayDialog {

  tableSettings = {
    columns: {
      time: {
        title: 'Godzina',
        sortDirection: 'asc',
        valuePrepareFunction: function(cell, row) {
          var dateObj = new Date(cell);
          var h : any = dateObj.getHours();
          var m : any = dateObj.getMinutes();
          if (h < 10) h = '0' + h;
          if (m < 10) m = '0' + m;
          return h + ':' + m;
        }
      },
      text: {
        title: 'Notatka'
      }
    },
    mode: 'external',
    noDataMessage: 'Brak notatek',
    actions: {
      columnTitle: 'Akcje',
      add: false,
      edit: false,
      position: 'right'
    },
    delete: {
      deleteButtonContent: "Usuń"
    }
  };

  constructor(
    public dialogRef: MatDialogRef<ShowDayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeLabel(event: any) {
    for (var i = 0; i < this.data.dayData.labels.length; i++)
    {
      if (this.data.dayData.labels[i] === event.data)
      {
        this.data.removedLabels.push(event.data);
        this.data.dayData.labels.splice(i, 1);
        event._dataSet.rows.splice(event.index, 1);
        return;
      }
    }
  }

}
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { CourseService } from './../services/course.service';
import { Course } from './model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {

  courses$ : Course[];
  displayedColumns = ['name','category','actions']

  @Input() course: Course[] = [];
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() select = new EventEmitter();

  constructor(private courseService: CourseService,
   public dialog: MatDialog,
   private router: Router,
   private route: ActivatedRoute,
   private httpClient: HttpClient,
   private snackBar: MatSnackBar,
   private location: Location){

   this.courses$ = [];
   this.loadingData();

  }

  onSuccess(errorMsg: string){
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg
    });
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg
    });
  }

  async loadingData(){
    this.courses$ = await this.courseService.list();
  }

  onAdd(){
    console.log('onAdd')
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  onEdit(course: Course){
    console.log(course);
    this.router.navigate([`update/${course.id}`],{relativeTo: this.route});
  }

  onSelect(course: Course){
    console.log(course);
    this.router.navigate([`${course.id}`],{relativeTo: this.route});
  }

  onDelete(id: any){
    console.log("click")
    fetch('/product/delete/' + id,  {
      method: 'DELETE'
    })
    this.snackBar.open('Successfully deleted!', '', {duration: 1000})
    window.location.reload();

  }

  ngOnInit(): void {

  }
}

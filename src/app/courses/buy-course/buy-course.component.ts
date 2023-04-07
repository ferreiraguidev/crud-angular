import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from './../services/course.service';
import { Course } from '../courses/model/course';


@Component({
  selector: 'app-buy-course',
  templateUrl: './buy-course.component.html',
  styleUrls: ['./buy-course.component.scss']
})
export class BuyCourseComponent {


  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){

    this.form = this.formBuilder.group({
      id: [''],
      name:[''],
      category: ['']
    });
  }

  ngOnInit(): void{
  const course: Course = this.route.snapshot.data[`course`];
  console.log(course);
  this.form.setValue({id: course.id, name: course.name, category: course.category});
  this.courseService.findById(course.id);
  }

  onSelectHere(course: Course){
    this.courseService.selectById(course.id);
  }
}

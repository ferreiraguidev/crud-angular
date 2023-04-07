import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from './../services/course.service';
import { Course } from '../courses/model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})


export class CourseFormComponent {

  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
    private service: CourseService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){

    this.form = this.formBuilder.group({
      id: [''],
      name:[''],
      category: ['']
    });
  }

  ngOnInit():void{
    const course: Course = this.route.snapshot.data['course'];
    console.log(course);
    this.form.setValue({id: course.id, name: course.name, category: course.category});
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(request=> this.onSuccess(),
    error=> this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Successfully saved!', '', {duration: 1000})
    this.location.back();
    this.service.list();

  }

  private onError(){
    this.snackBar.open('Could not save Product!', '', {duration: 2000})
  }


}

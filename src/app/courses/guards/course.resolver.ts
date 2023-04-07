import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../courses/model/course';
import { CourseService } from '../services/course.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {

  constructor(private courseService: CourseService ){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

    if(route.params && route.params['id']){
      return this.courseService.findById(route.params['id']);
    }

    if(route.params && route.params['id']){
      return this.courseService.selectById(route.params['id']);
    }

    return of({id: '',name:'',category:''});
  }

}

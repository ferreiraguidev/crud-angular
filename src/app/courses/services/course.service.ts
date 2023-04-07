import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from './../courses/model/course';
import { BuyCourseComponent } from '../buy-course/buy-course.component';





@Injectable({
  providedIn: 'root'
})
export class CourseService {


  constructor(private httpClient : HttpClient) {

  }

  list():Promise<Course[]>{
    const listAll = '/product/all';
    return new Promise((resolve)=> {
      this.httpClient.get(listAll).subscribe((resp: Course[] | any)=> {
        resolve(resp)})
    })
  }

  save(record: Course){

    if(record.id){
      return this.update(record);
    }
    return this.httpClient.post<Course>('product/save', record);
  }

  findById(id: string){
    return this.httpClient.get<Course>(`product/${id}`)
  }

  selectById(id: string){
    return this.httpClient.get<Course>(`${id}`)
  }

  private update(course: Partial<Course>){
    return this.httpClient.put<Course>(`product/update`, course);
  }

}

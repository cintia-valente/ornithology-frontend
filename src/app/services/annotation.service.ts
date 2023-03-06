import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { BirdService } from './bird.service';

import { Annotation } from '../model/annotation.model';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };

  private readonly API = 'api/annotation';
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private birdService: BirdService
  ) {}

  getAnnotations(): Observable<Annotation[]> {
    return this.http.get<Annotation[]>(this.API);
  }

  getAnnotationById(idAnnotation: string): Observable<Annotation> {
    return this.http.get<Annotation>(`${this.API}/${idAnnotation}`);
  }

  getAnnotationByBirdId(id: string): Observable<Annotation[]> {
    return this.http.get<Annotation[]>(`${this.API}/bird/${id}`);
  }

  postAnnotations(annotation: Annotation): Observable<Annotation> {
    return this.http.post<Annotation>(this.API, annotation);
  }

  putAnnotation(annotation: Annotation): Observable<Annotation> {
    const body = {
      bird: {
        namePtbr: annotation.bird.namePtbr,
        nameEnglish: annotation.bird.nameEnglish,
        nameLatin: annotation.bird.nameLatin,
        size: annotation.bird.size,
        genre: annotation.bird.genre,
        color: annotation.bird.color,
        family: annotation.bird.family,
        habitat: annotation.bird.habitat,
      },
      date: annotation.date,
      place: annotation.place,
    };

    return this.http.put<Annotation>(
      `${this.API}/${annotation.idAnnotation}`,
      body
    );
  }

  deleteAnnotations(idAnnotation: string): Observable<Annotation> {
    return this.http.delete<Annotation>(`${this.API}/${idAnnotation}`);
  }
}

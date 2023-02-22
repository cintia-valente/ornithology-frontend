import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bird } from '../model/bird.model';

@Injectable({ providedIn: 'root' })
export class BirdService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };

  private readonly API = 'api/bird';
  constructor(private http: HttpClient) {}

  getBirds(): Observable<Bird[]> {
    return this.http.get<Bird[]>(this.API);
  }

  postBirds(bird: Bird): Observable<Bird> {
    return this.http.post<Bird>(this.API, bird);
  }
}

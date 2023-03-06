import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class FileService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };
  thumbnail: any;

  private readonly API = 'api/files';
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  download(file: string | undefined): Observable<any> {
    return this.http.get(`${this.API}/${file}`);
  }
}

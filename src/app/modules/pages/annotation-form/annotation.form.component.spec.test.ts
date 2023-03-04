import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  TestComponentRenderer,
} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { AnnotationService } from '../../../services/annotation.service';
import { BirdService } from '../../../services/bird.service';

import { AnnotationFormComponent } from './annotation-form.component';
import { expect } from '@jest/globals';

const mockAnnotations = {
  idAnnotation: '138',
  bird: {
    id: '28',
    image: 'img',
    namePtbr: 'Canário',
    nameEnglish: 'Blue-and-yellow Macaw',
    nameLatin: 'Ara ararauna',
    size: '90 cm',
    genre: 'Can',
    color: 'Amarelo',
    family: 'Psittacidae',
    habitat: 'Floresta',
    picByte: 'teste',
  },
  date: new Date('2022-01-01T12:00:00'),
  place: 'Porto Alegre',
};

class AnnotationServiceMock {
  postAnnotations(data: any): any {
    return of();
  }

  putAnnotation(group: any): any {
    return of();
  }

  getAnnotationById(id: any) {
    return of();
  }
}

class BirdServiceMock {
  getBirds() {
    return of();
  }
}

class ToastrServiceMock {
  success(message?: string) {}

  error(message?: string) {}
}

const routes: Routes = [
  {
    path: 'cadastrar/:birdName',
    component: TestComponentRenderer,
  },
];

describe('AnnotationComponent', () => {
  let injector: TestBed;
  let component: AnnotationFormComponent;
  let fixture: ComponentFixture<AnnotationFormComponent>;
  let annotationService: AnnotationService;
  let birdService: BirdService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [AnnotationFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AnnotationService, useClass: AnnotationServiceMock },
        { provide: BirdService, useClass: BirdServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(AnnotationFormComponent);

    annotationService = injector.inject(AnnotationService);
    birdService = injector.inject(BirdService);
    toastrService = injector.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

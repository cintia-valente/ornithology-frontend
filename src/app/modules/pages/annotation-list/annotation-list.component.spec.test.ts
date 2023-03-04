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
import { of, throwError } from 'rxjs';

import { AnnotationService } from '../../../services/annotation.service';

import { AnnotationListComponent } from './annotation-list.component';
import { expect } from '@jest/globals';

const mockAnnotations = [
  {
    idAnnotation: '138',
    bird: {
      id: '28',
      imageId: 'img',
      namePtbr: 'Canário',
      nameEnglish: 'Blue-and-yellow Macaw',
      nameLatin: 'Ara ararauna',
      size: '90 cm',
      genre: 'Can',
      color: 'Amarelo',
      family: 'Psittacidae',
      habitat: 'Floresta',
      picByte: 'teste',
      showContent: false,
    },
    date: new Date('2022-01-01T12:00:00'),
    place: 'Porto Alegre',
  },
];

const errorMessage = {
  error: 'error',
  status: 400,
  message: 'Server Error',
};

class AnnotationServiceMock {
  getAnnotations(): any {
    return of();
  }

  deleteAnnotations(id: any) {
    return of();
  }
}

class ToastrServiceMock {
  success(message?: string) {}

  error(message?: string) {}
}

const routes: Routes = [
  {
    path: 'editar-anotacoes/:id',
    component: TestComponentRenderer,
  },
];

describe('AnnotationListComponent', () => {
  let injector: TestBed;
  let component: AnnotationListComponent;
  let fixture: ComponentFixture<AnnotationListComponent>;
  let annotationService: AnnotationService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [AnnotationListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AnnotationService, useClass: AnnotationServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(AnnotationListComponent);

    annotationService = injector.inject(AnnotationService);
    toastrService = injector.inject(ToastrService);

    jest
      .spyOn(annotationService, 'getAnnotations')
      .mockReturnValue(of(mockAnnotations));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado: que o componente foi carregado
      Então: deve chamar o serviço annotationService.getAnnotations`, async () => {
    //Arrange
    const spyAnnotationList = jest
      .spyOn(annotationService, 'getAnnotations')
      .mockReturnValue(of(mockAnnotations));

    //Act
    fixture.detectChanges();

    //Assert
    expect(spyAnnotationList).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: ocorrer um erro ao carregar as anotações 
      Então: deve chamar o serviço annotationService.getAnnotations`, async () => {
    //Arrange
    const spyAnnotationListError = jest
      .spyOn(annotationService, 'getAnnotations')
      .mockReturnValue(throwError(() => errorMessage));

    //Act
    fixture.detectChanges();

    //Assert
    expect(spyAnnotationListError).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: clicar no ícone de deletar
      Então: deve chamar o serviço userService.deleteUser`, async () => {
    //Arrange
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
        showContent: false,
      },
      date: new Date('2022-01-01T12:00:00'),
      place: 'Porto Alegre',
    };

    const spyUserDelete = jest
      .spyOn(annotationService, 'deleteAnnotations')
      .mockReturnValue(of(mockAnnotations));

    //Act
    fixture.detectChanges();
    await fixture.whenStable();

    const annotationDelete = fixture.nativeElement.querySelector(
      '.annotations table > tbody > tr:nth-child(1) > td:nth-child(4) > div > span.icon-delete > img'
    );

    annotationDelete.click();

    fixture.detectChanges();
    await fixture.whenStable();

    //Assert
    expect(spyUserDelete).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: atribuir um erro no serviço 
      E: clicar no ícone de deletar
      Então: deve chamar o serviço userService.deleteUser e toastrService.error`, async () => {
    //Arrange
    const spyAnnotationDeleteError = jest
      .spyOn(annotationService, 'deleteAnnotations')
      .mockReturnValue(throwError(() => errorMessage));

    const spyToastDeleteError = jest
      .spyOn(toastrService, 'error')
      .mockReturnValue({} as any);

    //Act
    fixture.detectChanges();
    await fixture.whenStable();

    const annotationDelete = fixture.nativeElement.querySelector(
      '.annotations table > tbody > tr:nth-child(1) > td:nth-child(4) > div > span.icon-delete > img'
    );

    annotationDelete.click();

    fixture.detectChanges();
    await fixture.whenStable();

    //Assert
    expect(spyAnnotationDeleteError).toHaveBeenCalled();
    expect(spyToastDeleteError).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: detectar as alterações
      Então: deve gerar um Snapshot do componente carregado`, async () => {
    //Arrange
    jest
      .spyOn(annotationService, 'getAnnotations')
      .mockReturnValue(of(mockAnnotations));

    //Act
    fixture.detectChanges();

    //Assert
    expect(fixture).toMatchSnapshot();
  });
});

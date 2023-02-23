import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  TestComponentRenderer,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { BirdService } from '../../../services/bird.service';

import { BirdComponent } from './bird.component';

const mockBirds = [
  {
    id: '27',
    image: 'img',
    namePtbr: 'Arara',
    nameEnglish: 'Blue-and-yellow Macaw',
    nameLatin: 'Ara ararauna',
    size: '90 cm',
    genre: 'Can',
    color: 'Amarelo',
    family: 'Psittacidae',
    habitat: 'Floresta',
    picByte: 'teste',
  },
];

class BirdServiceMock {
  getBirds() {
    return of();
  }
}

class ToastrServiceMock {
  error(message?: string) {}
}

const routes: Routes = [
  {
    path: 'cadastrar/:birdName',
    component: TestComponentRenderer,
  },
];

describe('BirdComponent', () => {
  let injector: TestBed;
  let component: BirdComponent;
  let fixture: ComponentFixture<BirdComponent>;
  let birdService: BirdService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [BirdComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BirdService, useClass: BirdServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    injector = getTestBed();
    fixture = TestBed.createComponent(BirdComponent);

    birdService = injector.inject(BirdService);
    toastrService = injector.inject(ToastrService);

    jest.spyOn(birdService, 'getBirds').mockReturnValue(of(mockBirds));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado: que o componente foi carregado
      Então: deve chamar o serviço birdService.getBirds`, async () => {
    //Arrange
    const spyUserList = jest
      .spyOn(birdService, 'getBirds')
      .mockReturnValue(of(mockBirds));

    //Act
    fixture.detectChanges();

    //Assert
    expect(spyUserList).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: atribuir um erro no serviço 
      Então: deve chamar o serviço birdService.getBirds`, async () => {
    //Arrange
    const errorMessage = {
      error: 'error',
      status: 400,
      message: 'Server Error',
    };

    const spyBirdError = jest
      .spyOn(birdService, 'getBirds')
      .mockReturnValue(throwError(() => errorMessage));

    //Act
    fixture.detectChanges();
    await fixture.whenStable();

    //Assert
    expect(spyBirdError).toHaveBeenCalled();
  });

  it(`Dado: que o componente foi carregado
      Quando: detectar as alterações
      Então: deve gerar um Snapshot do componente carregado`, async () => {
    //Arrange
    jest.spyOn(birdService, 'getBirds').mockReturnValue(of(mockBirds));

    //Act
    fixture.detectChanges();

    //Assert
    expect(fixture).toMatchSnapshot();
  });
});

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

import { AnnotationService } from '../../../services/annotation.service';
import { BirdService } from './../../../services/bird.service';

import { Annotation } from 'src/app/model/annotation.model';
import { Bird } from 'src/app/model/bird.model';

@Component({
  selector: 'app-annotation-form',
  templateUrl: './annotation-form.component.html',
  styleUrls: ['./annotation-form.component.scss'],
})
export class AnnotationFormComponent implements OnInit {
  annotationForm: FormGroup;
  birds: Bird[] = [];
  submmited: boolean = false;
  error: boolean = false;
  loading: boolean = false;
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private annotationService: AnnotationService,
    private route: ActivatedRoute,
    private birdService: BirdService,
    public toastr: ToastrService
  ) {
    this.annotationForm = this.formBuilder.group({
      idAnnotation: [''],
      bird: this.formBuilder.group({
        id: [''],
        image: [null],
        namePtbr: ['', Validators.required],
        nameEnglish: [''],
        nameLatin: [''],
        size: [''],
        genre: [''],
        color: [''],
        family: [''],
        habitat: [''],
      }),
      date: [''],
      place: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.listBird();
    this.findAnnotationById();
  }

  findAnnotationById() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id === null) {
        return;
      }
      this.loading = true;
      this.annotationService.getAnnotationById(id).subscribe((data) => {
        this.isEdit = true;
        this.loadForm(data);

        this.loading = false;
      });
    });
  }

  onSubmit() {
    this.submmited = true;

    if (this.annotationForm.value.idAnnotation) {
      this.updateAnnotations();
    } else {
      this.addAnnotations();
    }
  }

  addAnnotations() {
    this.annotationService
      .postAnnotations(this.annotationForm.value)
      .subscribe({
        next: (data) => {
          this.loading = false;

          if (data) {
            this.toastr.success('Cadastrado com sucesso');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(
            'Erro ao cadastrar os dados. Por favor, tente novamente mais tarde.'
          );

          return throwError(() => err);
        },
      });
  }

  updateAnnotations() {
    this.annotationService.putAnnotation(this.annotationForm.value).subscribe({
      next: () => {
        this.loading = false;

        if (this.annotationForm.value.idAnnotation) {
          this.toastr.success('Atualizado com sucesso');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(
          'Erro ao atualizar os dados. Por favor, tente novamente mais tarde.'
        );

        return throwError(() => err);
      },
    });
  }

  public loadForm(annotation: Annotation) {
    this.annotationForm.patchValue({
      idAnnotation: annotation.idAnnotation,
      bird: {
        id: annotation.bird.id,
        image: annotation.bird.imageId,
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
    });
  }

  listBird() {
    this.error = false;
    this.birdService.getBirds().subscribe({
      next: (data) => (this.birds = data),

      error: (err: HttpErrorResponse) => {
        this.toastr.error(
          'Erro ao carregar usuários. Por favor, tente novamente mais tarde.'
        );

        return throwError(() => err);
      },
    });
  }

  onChangeBird(event: Event) {
    this.listBird();

    const selectedBird = this.birds.find(
      (bird) => bird.namePtbr === (event.target as HTMLInputElement).value
    );
    if (selectedBird) {
      this.annotationForm.patchValue({
        bird: {
          id: selectedBird.id,
          namePtbr: selectedBird.namePtbr,
        },
      });
    }
  }
}

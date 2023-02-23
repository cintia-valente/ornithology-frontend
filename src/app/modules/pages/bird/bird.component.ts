import { FileService } from './../../../services/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Bird } from 'src/app/model/bird.model';
import { BirdService } from '../../../services/bird.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent implements OnInit {
  birds: Bird[] = [];
  birdsDisplayed: Bird[] = [];
  error: boolean = false;
  imageUrl: any;

  constructor(
    private birdService: BirdService,
    private fileService: FileService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.listBirds();
  }

  listBirds() {
    this.error = false;

    this.birdService.getBirds().subscribe({
      next: (data: Bird[]) => {
        this.birds = data;
        this.birdsDisplayed = data;

        this.listFiles();
      },

      error: (err: HttpErrorResponse) => {
        this.toastr.error(
          'Erro ao carregar aves. Por favor, tente novamente mais tarde.'
        );

        return throwError(() => err);
      },
    });
  }

  listFiles() {
    this.birds.forEach((bird) => {
      if (bird.imageId) {
        this.fileService
          .getFiles(bird.imageId, { responseType: 'blob' })
          .subscribe((data) => {
            if (data) {
              bird.picByte = URL.createObjectURL(data);
            }
          });
      }
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.birds = this.birdsDisplayed.filter((bird) =>
      bird.namePtbr.toLowerCase().includes(value)
    );
  }
}

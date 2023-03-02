import { FileService } from './../../../services/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
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
    //debugger;
    this.birds.forEach((bird) => {
      console.log("bird.imageId", bird.imageId)
      if (bird.imageId) {
        this.fileService
        .download(bird.imageId)
        .subscribe(blob =>{
          console.log(blob)
          let objectURL = `data:${blob.contentType}/png;base64,` + blob.picByte;

          bird.picByte = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(objectURL)) || undefined;
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

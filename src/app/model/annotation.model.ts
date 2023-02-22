import { Bird } from './bird.model';

export interface Annotation {
  idAnnotation: string;
  bird: Bird;
  date: Date;
  place: string;
}

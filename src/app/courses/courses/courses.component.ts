import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoursesService } from '../services/courses.service';
import { Course } from './../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.findAll().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {}
}

import { QuizService } from './../_services/quiz.service';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { ModalService } from '../_modal';

@Component({
  templateUrl: './take_quiz.component.html',
  styleUrls: [ './ss_onboarder.component.css' ]
})
export class Take_QuizComponent implements OnInit {
  //Store from Database
  quiz: any;
  question: any;

  //Stores users answer and later compares
  model!: string;

  //Keep track of user scores
  score!: number;

  //We store the mark Requirement to pass Quiz here
  myValue = 0;

  id:any;

constructor(
  private alertService: AlertService,
  private quizService: QuizService,

  private modalService: ModalService,

  private _Activatedroute:ActivatedRoute,
  private router: Router,
) {
}

 ngOnInit() { 
  this._Activatedroute.paramMap.subscribe(params => { 
    this.id = params.get('id'); 
  });

  this.loadAll();
 }

  loadAll() {
    //Lets Get All The Quiz under this LessonOutcome
    this.quizService.getQuizByLessonOutcomeID(this.id)
    .pipe(first())
    .subscribe(
      quiz => {
        this.quiz = quiz;
        console.log(this.quiz);
      },
      error => {
        this.alertService.error('Error, Data (Quiz) was unsuccesfully retrieved');
      } 
    );
  }

}

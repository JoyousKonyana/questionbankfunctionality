import { Quiz } from './../_models/quiz';
import { QuizService } from './../_services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({ 
    templateUrl: 'set_quiz.component.html',
    styleUrls: ['./ss_course.component.css'] 
})

export class Set_QuizComponent implements OnInit {

    create: boolean = false;
    update: boolean = false;

    id: any;

    fileToUpload: File | null = null;

    quiz: any;

    date!: string;

    constructor(
        private quizSerivce: QuizService,
        private alertService: AlertService,

      private _Activatedroute:ActivatedRoute,
      private router: Router,
      private form: FormBuilder,
  ) {
  }

    ngOnInit() {
      this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id'); 
      });

      this.loadAll();

      this.date = new Date().toISOString().slice(0, 10);
    }

    loadAll() {
        this.quizSerivce.getQuizByLessonOutcomeID(this.id)
        .pipe(first())
        .subscribe(
          quiz => {
            this.quiz = quiz;
          },
          error => {
            this.alertService.error('Error, Data was unsuccesfully retrieved');
          } 
        );
    }

    newQuizClicked = false;
    updateQuizClicked = false;

    model: Quiz = {
      QuizId: 0,
      LessonOutcomeId: 0,
      QuizDescription: '',
      QuizMarkRequirement: '',
      QuizDueDate: '',
      QuizCompletionDate: '',
      NumberOfQuestions: 5
    }

    addQuiz(){
      this.model.LessonOutcomeId = this.id;

      this.quizSerivce.createQuiz(this.model)
                .pipe(first())
                .subscribe(data => {
                    this.alertService.success('Quiz was Successfully Created');
                    this.loadAll();
                }, error => {
                    this.alertService.success('Unsuccessful Creation');
                    this.loadAll();
            });
    }

    myValue = 0;

    editQuiz(editQuizInfo: number) {
      this.updateQuizClicked = !this.updateQuizClicked;

      this.model.QuizDescription = this.quiz[editQuizInfo].lessonDescription;
      this.model.QuizMarkRequirement = this.quiz[editQuizInfo].lessonName;
      this.model.QuizDueDate = this.quiz[editQuizInfo].quizDueDate;
      this.model.NumberOfQuestions = this.quiz[editQuizInfo].numberOfQuestions;
      
      this.myValue = editQuizInfo;
    }

    updateQuiz(){
      let editQuizInfo = this.myValue;

      this.model.LessonOutcomeId = this.id;

      for(let i = 0; i < this.quiz.length; i++) {
        if(i == editQuizInfo) 
        {
          this.quizSerivce.updateQuiz(this.quiz[editQuizInfo].quizId, this.model)
                .pipe(first())
                .subscribe(data => {
                    this.alertService.success('Quiz was Successfully Updated');
                    this.loadAll();
                }, error => {
                    this.alertService.success('Unsuccessful Update');
                    this.loadAll();
            });
        }
      }
    }

    addNewQuizBtn() {
      this.newQuizClicked = !this.newQuizClicked;
      }

      closeUpdate(){
        this.updateQuizClicked = !this.updateQuizClicked;
      }

 }
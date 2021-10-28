import { QuizService } from './../_services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services';
import { ModalService } from '../_modal';

@Component({
  templateUrl: './quiz.component.html',
  styleUrls: [ './ss_onboarder.component.css' ]
})
export class QuizComponent implements OnInit {
  //Store from Database
  quiz: any;
  question: any;

  //Stores users answer and later compares
  model!: string;

  //Keep track of user scores
  score: any;

  //We store the mark Requirement to pass Quiz here
  myValue: any;

  //Hold Score
  dataHolder: any;

  //Percentage
  percentage: any;

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
    //Lets Get All The Question under this Quiz
    this.quizService.getQuestionByQuizID(this.id)
      .pipe(first())
      .subscribe(
        question => {
          this.question = question;
          console.log(this.question)
        },
        error => {
          this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
        } 
      );

      this.myValue = this.question.length;
  }

  saveAnswer(index: number){
    if(this.model === this.question[index].questionAnswer)
    {
      this.dataHolder.push(this.question[index]);

      //Empty model
      this.model = ''

      //Remove the Question
      this.question.splice(index, 1)
      alert('Answer Saved');
      this.alertService.success("Answer was saved.", true);
    }
    else{
      //Empty Model
      this.model = ''

      //Remove the Question
      this.question.splice(index, 1)
      alert('Answer Saved');
      this.alertService.success("Answer was saved.", true);
    }
  }

  submitQuiz(){
      //Empty Array
      this.question.length = 0;

      //Count the score
      this.score = this.dataHolder.length;

      this.percentage = ( Number(this.score) / Number(this.myValue) )*100

    if(this.score >= this.myValue){
        alert("Congratulation, you met the minimum requirement of 50% from " + this.myValue + " and your mark was " + this.score + ", You have passed.");
        this.alertService.success("Congratulation, you met the minimum requirement of " + this.myValue + " and your mark was " + this.score + ", You have passed.", true);
    }
    else{
        alert("Oh No, you didn't meet the minimum requirement of 50% from " + this.myValue + " and your mark was " + this.score + ", You have failed.");
        this.alertService.error("Oh No, you didn't meet the minimum requirement of " + this.myValue + " and your mark was " + this.score + ", You have failed.");
    }
  }

}

import { Question } from './../_models/question';
import { QuizService } from './../_services/quiz.service';
import { CourseService } from './../_services/course.service';

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService, Learning_OutcomeService, LessonService } from '../_services';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { QuestionBank } from '../_models/QuestionBank';

@Component({ 
    templateUrl: 'question_bank.component.html',
    styleUrls: ['./ss_course.component.css'] 
})

export class Question_BankComponent implements OnInit {
  question: any[] = [];
  course:any[] =[];
  lesson:any[] =[];
  lessonOutcome:any[]=[];
  questionBanks: any[] =[];

  searchText = '';

  constructor(
      private quizService: QuizService,
      private alertService: AlertService,
      private courseService: CourseService,
      private lessonOutcomeService: Learning_OutcomeService,
      private lessonService:LessonService,
      private form: FormBuilder,
  ) {
  }

  ngOnInit() {
      this.loadAll();
  }
  QuestionBankForm = this.form.group({
    course: new FormControl('', Validators.required),
    lesson: new FormControl ('',Validators.required),
    lessonOutcome: new FormControl('', Validators.required),
   questionBankDescription : new FormControl ('', Validators.required)
  })

  private loadAll() {
    this.quizService.getAllQuestion()
    .pipe(first())
    .subscribe(
      question => {
        this.question = question;
      },
      error => {
        this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
      } 
    );

    //getCourse
    this.courseService.getAllCourse()
    .pipe(first())
    .subscribe(
      course => {
        this.course =course
        console.log(this.courseService);
        alert(this.course[1].courseId);
      },
      error => {
        this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
      } 
    );

    //get all lessons
    this.lessonService.getAllLessons2()
    .pipe(first())
    .subscribe(
      lesson => {
        this.lesson = lesson
        console.log(this.lesson);
      },
      error => {
        this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
      } 
    );
    
//get question banks
    this.quizService.getAllQuestionBanks()
    .pipe(first())
    .subscribe(
      QuestionBank => {
        this.questionBanks = QuestionBank
        console.log(this.questionBanks );
      },
      error => {
        this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
      } 
    );

    //get all lesson outcomes
    // this.lessonOutcomeService.getAllLearning_Outcome2()
    // .pipe(first())
    // .subscribe(
    //   lessonOutcome => {
    //     this.lessonOutcome = lessonOutcome
    //     console.log(this.lessonOutcome);
    //   },
    //   error => {
    //     this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
    //   } 
    // );


  }

  onSelect(state:any){
    // alert(state.value);
    // console.log(state.value);
    this.lessonService.getAllLessons2()
    .pipe(first())
    .subscribe(
      lesson => {
        this.lesson = lesson;
        this.lesson = lesson.filter(e => e.courseId == state.value);
        console.log(this.lesson);
      },
      error => {
        this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
      } 
    );
  }

  onSelectlesson(state:any){
    this.lessonOutcomeService.getAllLearning_Outcome2()
    .pipe(first())
    .subscribe(
      lessonOutcome => {
        this.lessonOutcome = lessonOutcome.filter(e => e.lessonId == state.value);
        console.log(this.lessonOutcome);
      },
      error => {
        this.alertService.error('Error, Data (Question) was unsuccesfully retrieved');
      } 
    );
  }
    newQuestionClicked = false;
    updateQuestionClicked = false;

  model: any = {};
  model2: any = {}; 

  model3:Question = {
      QuestionId: 0,
      QuizId: 1,
      QuestionCategoryId: 4,
      QuestionDescription: '',
      QuestionAnswer: '',
      QuestionMarkAllocation: 1
  };

  mquestionBankmodel:QuestionBank ={
    CourseId: 0,
    LessonId: 0,
    LessonOutcomeId: 0,
    QuestionBankDescription: ''
  }

  addQuestion() { 
    alert(this.QuestionBankForm.get('course')?.value);
      // this.model3.QuestionDescription = this.model.QuestionDescription;
      // this.model3.QuestionAnswer = this.model.QuestionAnswer;
      // this.model3.QuestionMarkAllocation = this.model.QuestionMarkAllocation;
      // this.model3.QuizId = this.model.QuizId;
      this.mquestionBankmodel.CourseId = this.QuestionBankForm.get('course')?.value;
      alert(this.QuestionBankForm.get('course')?.value);
      this.mquestionBankmodel.LessonId = this.QuestionBankForm.get('lesson')?.value;
      this.mquestionBankmodel.LessonOutcomeId = this.QuestionBankForm.get('lessonOutcome')?.value;
      this.mquestionBankmodel.QuestionBankDescription = this.QuestionBankForm.get('questionBankDescription')?.value;
    


    
      // this.quizService.createQuestion(this.model3)
      //       .pipe(first())
      //       .subscribe(
      //           data => {
      //               this.alertService.success('Creation (Question) was successful', true);
      //              this.loadAll();
      //               this.newQuestionClicked = !this.newQuestionClicked;
      //               this.model = {};
      //           },
      //           error => {
      //               this.alertService.error('Error, Creation (Question) was unsuccesful');
      //           });

        this.quizService.createQuestionBank(this.mquestionBankmodel)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Creation (Question) was successful', true);
                   this.loadAll();
                    this.newQuestionClicked = !this.newQuestionClicked;
                    this.model = {};
                },
                error => {
                    this.alertService.error('Error, Creation (Question) was unsuccesful');
                })
    
  }
    
  
  deleteQuestion(i: number) {
    this.quizService.deleteQuestion(i)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Deletion (Question) was successful', true);
                    this.loadAll();
                },
                error => {
                    this.alertService.error('Error, Deletion (Question) was unsuccesful');
                });
  }

  myValue = 0;

  editQuestion(editQuestionInfo: number) {
    this.model2.QuestionDescription = this.question[editQuestionInfo].QuestionDescription;
    this.model2.QuestionAnswer = this.question[editQuestionInfo].QuestionAnswer;
    this.model2.QuestionMarkAllocation = this.question[editQuestionInfo].QuestionMarkAllocation;
    this.model2.QuestionMarkAllocation = this.question[editQuestionInfo].quizId
    this.myValue = editQuestionInfo;
  }

  updateQuestion() {
    let editQuestionInfo = this.myValue;

    this.model3.QuestionDescription = this.model2.QuestionDescription;
    this.model3.QuestionAnswer = this.model2.QuestionAnswer;
    this.model3.QuestionMarkAllocation = this.model2.QuestionMarkAllocation;
    this.model3.QuizId = this.model2.QuizId;

    for(let i = 0; i < this.question.length; i++) {
      if(i == editQuestionInfo) 
      {
        this.quizService.updateQuiz(this.question[editQuestionInfo].questionId, this.model3)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update was successful', true);
                    this.loadAll();
                },
                error => {
                    this.alertService.error('Error, Update was unsuccesful');
                });
      }
    }
    
    }

    addNewQuestionBtn() {
        this.newQuestionClicked = !this.newQuestionClicked;
      }

      

}
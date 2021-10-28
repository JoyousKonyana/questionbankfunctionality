using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BMW_ONBOARDING_SYSTEM.Models
{
    public partial class QuestionBank
    {
        public QuestionBank()
        {
            Question = new HashSet<Question>();
            Quiz = new HashSet<Quiz>();
        }

        [Key]
        [Column("QuestionBankID")]
        public int QuestionBankId { get; set; }
        [Column("CourseID")]
        public int? CourseId { get; set; }
        [Column("LessonID")]
        public int? LessonId { get; set; }
        [Column("LessonOutcomeID")]
        public int? LessonOutcomeId { get; set; }
        [StringLength(250)]
        public string QuestionBankDescription { get; set; }

        [ForeignKey(nameof(CourseId))]
        [InverseProperty("QuestionBank")]
        public virtual Course Course { get; set; }

        //add lesson 
        [ForeignKey(nameof(LessonId))]
        [InverseProperty("QuestionBank")]
        public virtual Lesson Lesson { get; set; }
        //

        //add for lesson outcome
        [ForeignKey(nameof(LessonOutcomeId))]
        [InverseProperty("QuestionBank")]
        public virtual LessonOutcome LessonOutcome { get; set; }
        [InverseProperty("QuestionBank")]
        public virtual ICollection<Question> Question { get; set; }
        [InverseProperty("QuestionBank")]
        public virtual ICollection<Quiz> Quiz { get; set; }
    }
}

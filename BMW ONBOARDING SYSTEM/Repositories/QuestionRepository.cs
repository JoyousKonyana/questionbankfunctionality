using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly INF370DBContext _inf370ContextDB;

        public QuestionRepository(INF370DBContext inf370ContextDB)
        {
            _inf370ContextDB = inf370ContextDB;
        }
        public void Add<T>(T entity) where T : class
        {
            _inf370ContextDB.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _inf370ContextDB.Remove(entity);
        }

        public async Task<Question[]> GetQuestionAllquestionAsync()
        {

            IQueryable<Question> questions = _inf370ContextDB.Question;

            return await questions.ToArrayAsync();
        }

        public Task<Question> GetQuestionByquestionIDAsync(int questionID)
        {
            IQueryable<Question> result = _inf370ContextDB.Question.Where(q => q.QuestionId == questionID);
            return result.FirstOrDefaultAsync();
        }

        public Task<QuestionBank> GetQuestionByQuestionBankIDAsync(int questionbankID)
        {
            IQueryable<QuestionBank> result = _inf370ContextDB.QuestionBank.
                Include(x => x.Question).
                ThenInclude(x => x.Option).
                Where(x => x.QuestionBankId == questionbankID);
            return result.FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _inf370ContextDB.SaveChangesAsync() > 0;
        }
    }
}

using AutoMapper;
using BMW_ONBOARDING_SYSTEM.Interfaces;
using BMW_ONBOARDING_SYSTEM.Models;
using BMW_ONBOARDING_SYSTEM.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ONBOARDING_SYSTEM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionBankController : ControllerBase
    {
        private readonly IQuestionBankRepository _questionBankRepository;
        private readonly IMapper _mapper;
        // functionality not implemented yet
        // create a quiz together with a question
        public QuestionBankController(IQuestionBankRepository questionBankRepository, IMapper mapper)
        {
            _questionBankRepository = questionBankRepository;
            _mapper = mapper;
        }

        //[Authorize(Roles = Role.Admin)]
        [HttpPost]
        [Route("[action]/{userid}")]
        public async Task<ActionResult<QuestionBankViewModel>> CreateQuestionBank(int userid, [FromBody] QuestionBankViewModel model)
        {
            try
            {
                var questionBank = _mapper.Map<QuestionBank>(model);

                _questionBankRepository.Add(questionBank);

                if (await _questionBankRepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Created Question with description" + ' ' ;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;

                    ////removetimefromdatabase
                    //auditLog.AuditLogTimestamp = TimeSpan.
                    _questionBankRepository.Add(auditLog);
                    if (await _questionBankRepository.SaveChangesAsync())
                    {
                        return Ok("Successfully added question bank");
                    }

                }
            }
            catch (Exception)
            {

                BadRequest();
            }
            return BadRequest();
        }

        //[Authorize(Roles = Role.Onboarder)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllQuestionBanks()
        {
            try
            {
                var questionBanks = await _questionBankRepository.GetAllQuestionBanksAsync();
                return Ok(questionBanks);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        // use this for a dropdown of questionbanks linked to that specific question bank
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetQuestionBanks(int lessonid, int courseid, int lessonoutcomeid)
        {
            try
            {
                var questionBanks = await _questionBankRepository.GetQuestionBankbyIDsNameAsync(lessonid,courseid,lessonoutcomeid);
                return Ok(questionBanks);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        //[Authorize(Roles = Role.Admin)]
        [HttpPut("{id}")]
        [Route("[action]/{id}/{userid}")]
        public async Task<ActionResult<QuestionBankViewModel>> UpdateQuestionBank(int id,int userid, QuestionBankViewModel updatedQuestionBankModel)
        {
            try
            {
                var existingQuestionBank = await _questionBankRepository.GetQuestionBankByID(id);

                if (existingQuestionBank == null) return NotFound($"Could Not find Question bank ");

                _mapper.Map(updatedQuestionBankModel, existingQuestionBank);

                if (await _questionBankRepository.SaveChangesAsync())
                {
                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Updated Question bank to " + ' ' + updatedQuestionBankModel.QuestionBankDescription;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = id;
                    return _mapper.Map<QuestionBankViewModel>(existingQuestionBank);
                }
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }

            return BadRequest();

        }

        //[Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        [Route("[action]/{id}/{userid}")]
        public async Task<IActionResult> DeleteQuestionBank(int id, int userid)
        {
            try
            {
                var existingQuestionBank = await _questionBankRepository.GetQuestionBankByID(id);

                if (existingQuestionBank == null) return NotFound();

                _questionBankRepository.Delete(existingQuestionBank);

                if (await _questionBankRepository.SaveChangesAsync())
                {

                    AuditLog auditLog = new AuditLog();
                    auditLog.AuditLogDescription = "Updated Question Bank to " + ' ' + existingQuestionBank.QuestionBankDescription;
                    auditLog.AuditLogDatestamp = DateTime.Now;
                    auditLog.UserId = userid;
                    return Ok();
                }
            }
            catch (Exception)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError, $"We could not delete the course");
            }

            return BadRequest();
        }

    }

}

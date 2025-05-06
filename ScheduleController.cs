using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace CursorBackendTgJournal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly IConfiguration _config;
        public ScheduleController(IConfiguration config) => _config = config;

        [HttpGet("{groupId}")]
        public async Task<ActionResult> GetSchedule(int groupId)
        {
            var connStr = _config.GetConnectionString("DefaultConnection");
            using var conn = new SqlConnection(connStr);
            await conn.OpenAsync();

            // Получаем название группы
            var groupCmd = new SqlCommand(
                "SELECT Name FROM Groups WHERE Id = @GroupId",
                conn);
            groupCmd.Parameters.AddWithValue("@GroupId", groupId);
            var groupName = (string)await groupCmd.ExecuteScalarAsync();

            if (groupName == null)
                return NotFound($"Группа с ID {groupId} не найдена");

            // Получаем расписание
            var scheduleCmd = new SqlCommand(
                @"SELECT DayOfWeek, Time, Subject 
                  FROM Schedule 
                  WHERE GroupId = @GroupId 
                  ORDER BY 
                    CASE DayOfWeek 
                        WHEN 'Понедельник' THEN 1 
                        WHEN 'Вторник' THEN 2 
                        WHEN 'Среда' THEN 3 
                        WHEN 'Четверг' THEN 4 
                        WHEN 'Пятница' THEN 5 
                    END,
                    Time",
                conn);
            scheduleCmd.Parameters.AddWithValue("@GroupId", groupId);

            var lessons = new Dictionary<string, List<object>>();
            using var reader = await scheduleCmd.ExecuteReaderAsync();
            
            while (await reader.ReadAsync())
            {
                var day = reader.GetString(0);
                var time = reader.GetString(1);
                var subject = reader.GetString(2);

                if (!lessons.ContainsKey(day))
                    lessons[day] = new List<object>();

                lessons[day].Add(new
                {
                    time = time,
                    subject = subject
                });
            }

            var week = new List<object>();
            var daysOrder = new[] { "Понедельник", "Вторник", "Среда", "Четверг", "Пятница" };
            
            foreach (var day in daysOrder)
            {
                week.Add(new
                {
                    day = day,
                    lessons = lessons.ContainsKey(day) ? lessons[day] : new List<object>()
                });
            }

            var result = new
            {
                group = groupName,
                week = week
            };

            return Ok(result);
        }
    }
} 
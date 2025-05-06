import React, { useEffect, useState, useContext } from 'react';
import { fetchSchedule } from '../api';
import { Group, Schedule, ScheduleItem } from '../types';
import { ThemeContext } from '../App';

interface Props {
  group: Group;
  onBack: () => void;
}

const SchedulePage: React.FC<Props> = ({ group, onBack }) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#181c23' : '#fff';
  const textColor = isDark ? '#fff' : '#222';
  const cardBg = isDark ? '#23272f' : '#f8f9fa';
  const cardBorder = isDark ? '#222' : '#e9ecef';
  const accent = '#2AABEE';
  const accentDark = isDark ? '#2196f3' : '#2AABEE';

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchSchedule(group.id)
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Некорректные данные расписания');
        }
        setSchedule(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки расписания:', err);
        setError(err.message || 'Ошибка загрузки расписания');
        setLoading(false);
      });
  }, [group]);

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: bgColor,
      color: textColor
    }}>
      Загрузка...
    </div>
  );

  if (error) return (
    <div style={{ padding: '16px', background: bgColor, color: textColor, minHeight: '100vh' }}>
      <button 
        onClick={onBack}
        style={{
          padding: '8px 16px',
          backgroundColor: accentDark,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginBottom: '16px',
          cursor: 'pointer'
        }}
      >
        Назад
      </button>
      <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
    </div>
  );

  if (!schedule || schedule.length === 0) return (
    <div style={{ padding: '16px', background: bgColor, color: textColor, minHeight: '100vh' }}>
      <button 
        onClick={onBack}
        style={{
          padding: '8px 16px',
          backgroundColor: accentDark,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginBottom: '16px',
          cursor: 'pointer'
        }}
      >
        Назад
      </button>
      <div>Нет данных</div>
    </div>
  );

  const scheduleByDay = schedule.reduce((acc, item) => {
    if (!acc[item.dayOfWeek]) {
      acc[item.dayOfWeek] = [];
    }
    acc[item.dayOfWeek].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  const daysOrder = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const sortedDays = Object.keys(scheduleByDay).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  return (
    <div style={{ padding: '16px', background: bgColor, color: textColor, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <button 
        onClick={onBack}
        style={{
          padding: '8px 16px',
          backgroundColor: accentDark,
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginBottom: '16px',
          cursor: 'pointer'
        }}
      >
        Назад
      </button>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        color: accent
      }}>
        Расписание для группы {group.name}
      </h2>
      {sortedDays.map(day => (
        <div key={day} style={{ 
          marginBottom: '24px',
          backgroundColor: cardBg,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${cardBorder}`
        }}>
          <h3 style={{ 
            color: accent,
            marginBottom: '12px',
            borderBottom: `1px solid ${cardBorder}`,
            paddingBottom: '8px'
          }}>
            {day}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {scheduleByDay[day]
              .sort((a, b) => a.time - b.time)
              .map((lesson, idx, array) => (
                <li key={idx} style={{ 
                  padding: '8px 0',
                  borderBottom: idx === array.length - 1 ? 'none' : `1px solid ${cardBorder}`
                }}>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: accent,
                    marginRight: '8px'
                  }}>
                    {lesson.time}.
                  </span>
                  {lesson.subject}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SchedulePage; 
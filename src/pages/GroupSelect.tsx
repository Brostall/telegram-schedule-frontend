import React, { useEffect, useState, useContext } from 'react';
import { fetchGroups } from '../api';
import { Group } from '../types';
import { ThemeContext } from '../App';
import logo from '../assets/LogoSKFET.png';

interface Props {
  onSelect: (group: Group) => void;
}

const GroupSelect: React.FC<Props> = ({ onSelect }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>(() => {
    const fav = localStorage.getItem('favoriteGroups');
    return fav ? JSON.parse(fav) : [];
  });
  const { theme, setTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#181c23' : '#fff';
  const textColor = isDark ? '#fff' : '#222';
  const btnColor = isDark ? '#2196f3' : '#2AABEE';
  const btnHover = isDark ? '#1976d2' : '#229ED9';
  const inputBg = isDark ? '#23272f' : '#fff';
  const inputBorder = isDark ? '#444' : '#2AABEE';
  const headerColor = isDark ? '#fff' : '#2AABEE';

  useEffect(() => {
    fetchGroups().then(data => {
      setGroups(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteGroups', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (groupId: number) => {
    setFavorites(favs =>
      favs.includes(groupId)
        ? favs.filter(id => id !== groupId)
        : [...favs, groupId]
    );
  };

  const filteredGroups = groups
    .filter(group => group.name.toLowerCase().includes(search.toLowerCase()));

  const sortedGroups = [
    ...filteredGroups.filter(g => favorites.includes(g.id)),
    ...filteredGroups.filter(g => !favorites.includes(g.id))
  ];

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

  return (
    <div style={{ background: bgColor, minHeight: '100vh', color: textColor, transition: 'background 0.3s, color 0.3s' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        position: 'relative',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <img
          src={logo}
          alt="Логотип техникума"
          style={{
            height: '96px',
            marginRight: '16px',
            borderRadius: '8px',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            objectFit: 'contain',
          }}
        />
        <h2 style={{ 
          textAlign: 'center', 
          color: headerColor,
          flex: 1,
          margin: 0,
          transition: 'color 0.3s'
        }}>
          Выберите группу
        </h2>
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '16px',
            fontSize: '2rem',
            color: isDark ? '#FFD600' : '#2AABEE',
            padding: 0,
            transition: 'color 0.3s'
          }}
          aria-label="Переключить тему"
        >
          {isDark ? (
            <span role="img" aria-label="Светлая тема">☀️</span>
          ) : (
            <span role="img" aria-label="Тёмная тема">🌙</span>
          )}
        </button>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Поиск по группе..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px',
            borderRadius: '8px',
            border: `1px solid ${inputBorder}`,
            fontSize: '16px',
            outline: 'none',
            background: inputBg,
            color: textColor
          }}
        />
      </div>
      <div style={{
        display: 'grid',
        gap: '10px',
        padding: '0 16px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {sortedGroups.map(group => (
          <div key={group.id} style={{ position: 'relative', width: '100%' }}>
            <button
              onClick={() => onSelect(group)}
              style={{
                padding: '12px 16px',
                backgroundColor: btnColor,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s',
                width: '100%',
                textAlign: 'left',
                paddingRight: '48px',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = btnHover}
              onMouseOut={e => e.currentTarget.style.backgroundColor = btnColor}
            >
              {group.name}
            </button>
            <span
              onClick={e => {
                e.stopPropagation();
                toggleFavorite(group.id);
              }}
              style={{
                position: 'absolute',
                right: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.6rem',
                color: favorites.includes(group.id) ? '#FFD600' : (isDark ? '#888' : '#ccc'),
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s',
              }}
              title={favorites.includes(group.id) ? 'Убрать из избранного' : 'В избранное'}
              role="button"
              aria-label={favorites.includes(group.id) ? 'Убрать из избранного' : 'В избранное'}
            >
              {favorites.includes(group.id) ? '★' : '☆'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSelect; 
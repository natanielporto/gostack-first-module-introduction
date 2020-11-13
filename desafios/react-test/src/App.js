import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: `${Math.random() * 1000 + 1000}`,
      url: 'http://github.com/natanielporto',
      title: `Repo ${Math.random() * 10 + 1}`,
      techs: ['React', 'NodeJS'],
    });

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    const deleted = repos.filter((el) => el.id !== id);
    setRepos([...deleted]);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map((el) => (
          <li key={el.id} id={el.id}>
            <span>{el.url}</span>
            <span>{el.title}</span>
            <span>{el.techs}</span>
            <button onClick={() => handleRemoveRepository(el.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

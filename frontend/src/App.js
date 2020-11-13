import React, { useState, useEffect } from 'react';

import Header from './components/Header';

import api from './services/api';

import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Nataniel Kuhn Porto',
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <Header title='Projects' />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type='button' onClick={handleAddProject}>
        Adicionar project
      </button>
    </>
  );
}

export default App;

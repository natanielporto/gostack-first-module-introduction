const express = require('express');
const cors = require('cors');

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  response.status(200).json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findOne = repositories.findIndex((el) => el.id === id);

  if (findOne < 0) {
    return response
      .status(400)
      .json({ error: 'No repository found with that ID.' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findOne].likes,
  };

  repositories[findOne] = repository;

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const findOne = repositories.findIndex((el) => el.id === id);

  if (findOne < 0) {
    return response
      .status(400)
      .json({ error: 'No repository found with that ID.' });
  }

  repositories.splice(findOne, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const findOne = repositories.findIndex((el) => el.id === id);

  if (findOne < 0) {
    return response
      .status(400)
      .json({ error: 'No repository found with that ID.' });
  }

  const repo = {
    ...repositories[findOne],
    likes: repositories[findOne].likes + 1,
  };

  repositories[findOne] = repo;

  return response.json(repo);
});

module.exports = app;

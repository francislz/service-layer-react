import React, { useEffect, useState } from 'react';
import useService from '../hooks/useService';
import { Joke } from '../models/Joke';
import JokeService from '../services/JokeService';

// import { Container } from './styles';

const JokePage: React.FC = () => {
  const jokeService = useService(JokeService);

  const [jokeType, setJokeType] = useState<string>("programming")
  const [jokes, setJokes] = useState<Joke[]>([]);

  function getJokes(){
    jokeService.get<Joke>(jokeType).subscribe(jokes => setJokes(jokes));
  }

  return (
    <div>
      <select onChange={(event) => setJokeType(event.target.value)} value={jokeType}>
          <option value="programming">Programming</option>
          <option value="general">general</option>
      </select>
      <button onClick={getJokes}>Generate Random Jokes</button>
      {
        jokes.map(joke => (
          <div key={joke.id}>
            <span>{joke.punchline}</span>
            <span>{joke.setup}</span>
          </div>
        ))
      }
    </div>
  );
}

export default JokePage;
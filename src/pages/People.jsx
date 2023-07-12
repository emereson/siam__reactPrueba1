import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardPeople from '../components/CardPeople';
import './pagesStyle/people.css';

const People = () => {
  const [people, setpeople] = useState();

  useEffect(() => {
    const url = 'http://localhost:3000/people';

    axios
      .get(url)
      .then((res) => setpeople(res.data))
      .catch((err) => console.log(err));
  }, [people]);

  return (
    <div className="people__container">
      <h1>Todas Las Personas</h1>
      <div className="cards__container">
        {people?.map((person) => (
          <CardPeople key={person.ide_per} person={person} />
        ))}
      </div>
    </div>
  );
};

export default People;

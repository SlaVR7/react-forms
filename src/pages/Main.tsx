import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Header } from '../components/Header';

export function Main() {
  const cardsData = useSelector((state: RootState) => state.cardsSlice);
  const [border, setBorder] = useState(false);

  useEffect(() => {
    setBorder(true);
    setTimeout(() => {
      setBorder(false);
    }, 3000);
  }, []);

  const cardsLength = cardsData.name.length;
  const cards = [];
  for (let i = 0; i < cardsLength; i++) {
    const card = (
      <ul
        key={i}
        className={
          border && i === cardsLength - 1
            ? 'border card-container'
            : 'card-container'
        }
      >
        <li>
          <img className="picture" src={cardsData.file[i]} alt="photo" />
        </li>
        <li>
          <span className="bold">Name: </span>
          {cardsData.name[i]}
        </li>
        <li>
          <span className="bold">Age: </span>
          {cardsData.age[i]}
        </li>
        <li>
          <span className="bold">E-mail: </span>
          {cardsData.email[i]}
        </li>
        <li>
          <span className="bold">Password: </span>
          {cardsData.password[i]}
        </li>
        <li>
          <span className="bold">Gender: </span>
          {cardsData.gender[i]}
        </li>
        <li>
          <span className="bold">Accept T&C: </span>
          {cardsData.accept[i]}
        </li>
        <li>
          <span className="bold">Country: </span>
          {cardsData.country[i]}
        </li>
      </ul>
    );
    cards.unshift(card);
  }
  return (
    <>
      <Header />
      <main>
        {cards &&
          cards.map((card) => {
            return card;
          })}
      </main>
    </>
  );
}

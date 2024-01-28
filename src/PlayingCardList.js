import React, { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import { useAxios } from "./hooks";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, makeRequest, clearCards] = useAxios({
    url: 'https://deckofcardsapi.com/api/deck/new/draw/',
    onFilter: (d) => ({image: d.cards[0].image, id: uuid()})
  })

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={makeRequest}>Add a playing card!</button>
        <button onClick={clearCards}>Clear</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;

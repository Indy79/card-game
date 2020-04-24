import React, { Component } from 'react';
import './index.css';

class Card extends Component {
  render() {
    const suitMap = {
      'S': 'Pique',
      'H': 'Coeur',
      'C': 'Trêfle',
      'D': 'Carreau'
    };

    const rankMap = {
      '1': 'As',
      '2': 'Deux',
      '3': 'Trois',
      '4': 'Quatre',
      '5': 'Cinq',
      '6': 'Six',
      '7': 'Sept',
      '8': 'Huite',
      '9': 'Neuf',
      '10': 'Dix',
      'J': 'Valet',
      'Q': 'Reine',
      'K': 'Roi'
    };

    const rankFRMap = {
        '1': 'A',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        'J': 'V',
        'Q': 'D',
        'K': 'R'
      };

    return (
      <div className="wrapper">
        <div className="card">
          <div className={`${this.props.suit} mark dark`}>{rankFRMap[this.props.rank]}</div>
          <div className="content ">
            <h1>{rankMap[this.props.rank]}</h1>
            <h2><sup>DE</sup><span className="dark">{suitMap[this.props.suit]}</span></h2>
          </div>
          <div className={`${this.props.suit} mark upside-down`}>{rankFRMap[this.props.rank]}</div>
        </div>
      </div>
    );
  }
}

export default Card;
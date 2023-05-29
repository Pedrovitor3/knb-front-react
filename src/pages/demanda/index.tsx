import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { getCard } from '../../services/axios/cardService';

require('./index.css');

interface CardProps {
  id: string;
  name: string;
}

interface DemandProps {
  id: string;
  name: string;
  cards: DemandProps[];
}

const Demanda: React.FC = () => {
  const [demands, setdemands] = useState<DemandProps[]>([]);

  console.log(demands);

  useEffect(() => {
    loadingdemand();
  }, []);

  async function loadingdemand() {
    try {
      const response = await getCard('demand');

      if (response !== false) {
        setdemands(response.data);
      } else {
        message.error('Ocorreu um erro inesperado ao obter as demandas.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter as demandas.');
    }
  }

  return (
    <div className="trello-page">
      {demands.map(demand => (
        <div className="demand" key={demand.id}>
          <h2 className="demand-title">{demand.name}</h2>
          <div className="demand-list">
            {demand.cards.map(card => (
              <div className="card" key={card.id}>
                <h3 className="card-title">{card.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Demanda;

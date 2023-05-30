import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getStage } from '../../services/axios/stageService';
import DemandCard from '../../components/DemandCard';

require('./index.css');

interface CardProps {
  id: string;
  name: string;
}

interface StageProps {
  id: string;
  name: string;
  demand: string;
  cards: CardProps[];
}

const Stage: React.FC = () => {
  const [stages, setStages] = useState<StageProps[]>([]);

  console.log(stages);

  useEffect(() => {
    loadingStages();
  }, []);

  async function loadingStages() {
    const response = await getStage('stage');

    console.log(response); // Verifique o conteúdo da resposta
    //console.log(id);

    if (response !== false) {
      const filteredStages = response.data.filter((stage: StageProps) => {
        return stage.demand === demand.id;
      });
      setStages(filteredStages);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as etapas.');
    }
  }

  return (
    <div className="body">
      {stages.length > 0 ? (
        stages.map((stage: StageProps) => (
          <div className="stage" key={stage.id}>
            <h2 className="stage-title">{stage.name}</h2>
            <div className="stage-cards">
              {stage.cards.map((card: CardProps) => (
                <div className="card" key={card.id}>
                  <h3 className="card-title">{card.name}</h3>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>Loading stages...</div>
      )}
    </div>
  );
};

export default Stage;

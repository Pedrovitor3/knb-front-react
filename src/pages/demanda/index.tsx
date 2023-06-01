import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { getStage } from '../../services/axios/stageService';

require('./index.css');

interface CardProps {
  id: string;
  name: string;
}

interface StageProps {
  id: string;
  name: string;
  demand: {
    id: string;
  } | null;
  cards: CardProps[];
  demandId: string;
}

const Stage: React.FC = () => {
  const { demandId } = useParams<{ demandId: string }>();
  const [stages, setStages] = useState<StageProps[]>([]);

  useEffect(() => {
    loadingStages();
  }, []);

  async function loadingStages() {
    const response = await getStage('stage');

    if (response !== false) {
      const filteredStages = response.data.filter((stage: StageProps) => {
        return stage.demand && stage.demand.id === demandId;
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

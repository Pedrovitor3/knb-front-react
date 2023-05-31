import React, { useEffect, useState } from 'react';
import { getPhase } from '../../services/axios/phaseService';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import Stage from '../demanda';

require('./index.css');

interface DemandProps {
  id: string;
  name: string;
}

interface PhaseProps {
  id: string;
  name: string;
  demands: DemandProps[];
}

const Board: React.FC = () => {
  const [phases, setPhases] = useState<PhaseProps[]>([]);

  useEffect(() => {
    loadingPhase();
  }, []);
  console.log(phases);

  async function loadingPhase() {
    const response = await getPhase('phase');

    if (response !== false) {
      setPhases(response.data);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as fases.');
    }
  }

  return (
    <div className="body">
      {phases.map(phase => (
        <div className="phase" key={phase.id}>
          <h2 className="phase-title">{phase.name}</h2>
          <div className="demand-list">
            {phase.demands.map(demand => (
              <div className="demand" key={demand.id}>
                <Link to={`/stage/${demand.id}`}>
                  <h3 className="demand-title">{demand.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;

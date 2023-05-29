import React, { useEffect, useState } from 'react';
require('./index.css');
import ListDemand from '../ListDemand';
import { getPhase } from '../../services/axios/phaseService';
import { message } from 'antd';

interface DemandProps {
  id: string;
  name: string;
}

interface PhasesProps {
  id: string;
  name: string;
  demands: DemandProps[];
}

export default function Board() {
  const [phases, setPhases] = useState<PhasesProps[] | null>(null);

  useEffect(() => {
    loadingPhase();
  }, []);

  console.log(phases);

  async function loadingPhase() {
    try {
      const response = await getPhase('phase');

      if (response !== false) {
        setPhases(response.data);
      } else {
        message.error('Ocorreu um erro inesperado ao obter os servidores.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter os servidores.');
    }
  }

  return (
    <div className="container">
      {phases !== null && (
        <>
          <ListDemand data={phases[0]} />
          <ListDemand data={phases[1]} />
          <ListDemand data={phases[2]} />
          <ListDemand data={phases[3]} />
          <ListDemand data={phases[4]} />
        </>
      )}
    </div>
  );
}

import React from 'react';

require('./index.css');

import DemandCard from '../DemandCard';

interface DemandProps {
  id: string;
  name: string;
}

interface ListDemandsProps {
  data: {
    id: string;
    name: string;
    demands: DemandProps[];
  };
}

export default function ListDemand({ data }: ListDemandsProps) {
  return (
    <div className="container">
      <header className="header">
        <h2 className="title">{data.name}</h2>
      </header>

      <ul className="lista">
        {data.demands.map(demand => (
          <DemandCard key={demand.id} data={demand} />
        ))}
      </ul>
    </div>
  );
}

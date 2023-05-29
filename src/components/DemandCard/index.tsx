import React from 'react';
require('./index.css');

interface DemandProps {
  data: {
    id: string;
    name: string;
  };
}

export default function DemandCard({ data }: DemandProps) {
  return (
    <div className="container">
      <h1>{data.name}</h1>
    </div>
  );
}

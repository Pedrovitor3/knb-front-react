import React from 'react';

require('./index.css');

interface CardProps {
  data: {
    id: string;
    name: string;
    tags: {
      name: string;
      cor: string;
    }[];
  };
  index: number;
  listIndex: number;
}

export default function Card({ data }: CardProps) {
  return (
    <div className="container">
      <header>
        {data.tags.map(tag => (
          <div className="label" key={tag.name} color={tag.cor} />
        ))}
      </header>
      <p>{data.id}</p>
    </div>
  );
}

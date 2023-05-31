import React, { useEffect, useState } from 'react';
import { getPhase, updatePhase } from '../../services/axios/phaseService';
import { message, Dropdown, Menu, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';

import './index.css';
import { APIPhase } from '../../services/axios/baseService';

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

  async function loadingPhase() {
    const response = await getPhase('phase');

    if (response !== false) {
      setPhases(response.data);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as fases.');
    }
  }

  const renderMenu = (phase: PhaseProps) => {
    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="1">Editar</Menu.Item>
        <Menu.Item key="2">Excluir</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Tooltip title="Opções">
          <span className="icon-wrapper">
            <MoreOutlined />
          </span>
        </Tooltip>
      </Dropdown>
    );
  };

  const onMenuClick = (e: any) => {
    console.log('click', e);
  };

  return (
    <div className="body">
      {phases.map(phase => (
        <div className="phase" key={phase.id}>
          <div className="title">
            <h2 className="phase-title">{phase.name}</h2>
          </div>

          <div className="demand-list">
            {phase.demands.map(demand => (
              <div className="demand" key={demand.id}>
                <Link to={`/stage/${demand.id}`}>
                  <Space>
                    <h3 className="demand-title">{demand.name}</h3>
                    <span className="icon-wrapper">{renderMenu(phase)}</span>
                  </Space>
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

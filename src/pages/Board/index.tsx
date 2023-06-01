import React, { useEffect, useState } from 'react';
import { getPhase } from '../../services/axios/phaseService';
import { message, Dropdown, Space, MenuProps, Button, Row } from 'antd';
import { Link } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import ModalBoard from '../../components/ModalBoard';

import './index.css';
import Popconfirm from 'antd/lib/popconfirm';
import { deleteDemand } from '../../services/axios/demandService';

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
  const [demands, setDemands] = useState<DemandProps[]>([]);
  const [recordDemand, setRecordDemand] = useState<DemandProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadingPhase();
  }, []);

  useEffect(() => {
    loadingPhase();
  }, [phases]);

  async function loadingPhase() {
    const response = await getPhase('phase');

    if (response !== false) {
      setPhases(response.data);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as demandas.');
    }
  }

  const hideModal = (refresh: boolean) => {
    setShowModal(false);
    setRecordDemand(null);
    if (refresh) setDemands([]);
  };

  const ClickDeleteDemand = async (record: DemandProps) => {
    await deleteDemand(record.id);
    const newDemands = demands.filter(demand => demand.id !== record.id);
    setDemands(newDemands);
    loadingPhase();
  };

  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === '1') {
      setShowModal(true);
    }
  };

  const renderMenu = (record: DemandProps) => {
    return (
      <Space size="middle">
        <Dropdown
          menu={{
            items: [
              {
                label: 'Alterar',
                key: '1',
                onClick: () => {
                  setRecordDemand(record);
                },
              },
              {
                label: (
                  <Popconfirm
                    title="Tem certeza de que deseja desabilitar este registro de demanda?"
                    onConfirm={() => ClickDeleteDemand(record)}
                  >
                    Excluir
                  </Popconfirm>
                ),
                key: '2',
                danger: true,
              },
            ],
            onClick: handleMenuClick,
          }}
        >
          <a onClick={e => e.preventDefault()} className="option">
            <Space>
              <MoreOutlined />
            </Space>
          </a>
        </Dropdown>
      </Space>
    );
  };

  console.log(recordDemand);

  return (
    <>
      <div>
        <Button
          className="botao"
          type="primary"
          htmlType="submit"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Criar nova demanda
        </Button>
        <div className="body">
          {phases.map(phase => (
            <div className="phase" key={phase.id}>
              <div className="title">
                <h2 className="phase-title">{phase.name}</h2>
              </div>

              <div className="demand-list">
                {phase.demands.map(demand => (
                  <div className="demand" key={demand.id}>
                    <Space>
                      <Link to={`/stage/${demand.id}`}>
                        <h3 className="demand-title">{demand.name}</h3>
                      </Link>
                      <span className="icon-wrapper">{renderMenu(demand)}</span>
                    </Space>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Modal */}
          {recordDemand && (
            <ModalBoard
              id={recordDemand.id}
              openModal={showModal}
              closeModal={hideModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Board;

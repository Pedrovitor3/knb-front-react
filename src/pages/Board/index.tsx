import React, { useEffect, useState } from 'react';
import { message, Dropdown, Space, Button, Popconfirm } from 'antd';
import ModalBoard from '../../components/ModalBoard';
import { deleteDemand, getDemand } from '../../services/axios/demandService';
import './index.css';
import { MoreOutlined } from '@ant-design/icons';

interface DemandProps {
  id: string;
  name: string;
  status: string;
}

type Props = {
  setChave: (id: string) => void;
  onDemandIdChange: (id: string) => void;
};

const Board = ({ setChave, onDemandIdChange }: Props) => {
  const [demands, setDemands] = useState<DemandProps[]>([]);
  const [recordDemand, setRecordDemand] = useState<DemandProps | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [columns, setColumns] = useState<
    { status: string; demands: DemandProps[] }[]
  >([
    { status: 'aguardando', demands: [] },
    { status: 'executando', demands: [] },
    { status: 'concluido', demands: [] },
    { status: 'pendente', demands: [] },
    { status: 'recusado', demands: [] },
  ]);

  useEffect(() => {
    setShowModal(false);
    loadingDemands();
  }, []);

  useEffect(() => {
    loadingDemands();
  }, [demands]);

  async function loadingDemands() {
    const response = await getDemand('demand');
    if (response !== false) {
      setDemands(response.data);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as demandas.');
    }
  }

  const hideModal = (refresh: boolean) => {
    setShowModal(false);
    setRecordDemand(null);
    if (refresh) setDemands([]);
  };

  const clickDeleteDemand = async (record: DemandProps) => {
    await deleteDemand(record.id);
    const newDemands = demands.filter(demand => demand.id !== record.id);
    setDemands(newDemands);
  };

  const handleMenuClick = (e: any) => {
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
                    onConfirm={() => clickDeleteDemand(record)}
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

  const handleDemandClick = (demandId: string) => {
    setChave('5');
    onDemandIdChange(demandId);
  };

  // Update columns and position the demands within the respective column
  useEffect(() => {
    const updatedColumns = columns.map(column => ({
      ...column,
      demands: demands.filter(demand => demand.status === column.status),
    }));
    setColumns(updatedColumns);
  }, [demands]);

  return (
    <div>
      <Button
        className="botao"
        type="primary"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Criar nova demanda
      </Button>
      <div className="body">
        <div className="demand-list">
          {columns.map(column => (
            <div className="column" key={column.status}>
              <h2>{column.status}</h2>
              {column.demands.map(demand => (
                <div className="demand" key={demand.id}>
                  <Space>
                    <Button
                      className="botao-card"
                      onClick={() => {
                        setChave('5');
                        handleDemandClick(demand.id);
                      }}
                    >
                      <h3 className="demand-title">{demand.name}</h3>
                    </Button>
                    <span className="icon-wrapper">{renderMenu(demand)}</span>
                  </Space>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ModalBoard
        id={recordDemand?.id}
        closeModal={hideModal}
        openModal={showModal}
      />
    </div>
  );
};

export default Board;

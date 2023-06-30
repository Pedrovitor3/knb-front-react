import React, { useEffect, useState } from 'react';
import { message, Dropdown, Space, Button, Popconfirm } from 'antd';
import ModalBoard from '../../components/ModalBoard';
import { deleteDemand, getDemand } from '../../services/axios/demandService';
import { MoreOutlined } from '@ant-design/icons';

import './index.css';

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  description: string;
  status: string;
}

type DataIndex = keyof DataType;

type Props = {
  setChave: (id: string) => void;
  onDemandIdChange: (id: string) => void;
};

const Board = ({ setChave, onDemandIdChange }: Props) => {
  const [demands, setDemands] = useState<DataType[]>([]); // Adicione a tipagem para o estado
  const [recordDemand, setRecordDemand] = useState<DataType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [columns, setColumns] = useState<
    { status: string; demands: DataType[] }[]
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

  const updateDemandList = (demands: any) => {
    setDemands(prevDemand => [...prevDemand, demands]);
    loadingDemands();
  };

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

  const clickDeleteDemand = async (record: DataType) => {
    await deleteDemand(record.id);
    const newDemands = demands.filter(demand => demand.id !== record.id);
    setDemands(newDemands);
  };

  const handleMenuClick = (e: any) => {
    if (e.key === '1') {
      setShowModal(true);
    }
  };

  const renderMenu = (record: DataType) => {
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
        className="botao-board"
        type="primary"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Criar nova demanda
      </Button>
      <div className="body-board">
        <div className="demand-list">
          {columns.map(column => (
            <div className="column" key={column.status}>
              <h2>{column.status}</h2>
              {column.demands.map(demand => (
                <div className="demand" key={demand.id}>
                  <Space>
                    <Button
                      className="botao-stage"
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
        updateDemandList={updateDemandList}
        id={recordDemand?.id}
        closeModal={hideModal}
        openModal={showModal}
      />
    </div>
  );
};

export default Board;

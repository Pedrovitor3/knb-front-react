'use client';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps, Popconfirm, Space, message } from 'antd';
import { deleteStage, getStage } from '../../services/axios/stageService';
import { MoreOutlined } from '@ant-design/icons';
import { deleteCard } from '../../services/axios/cardService';
import ModalCard from '../../components/ModalCard';
import ModalStage from '../../components/ModalStage';

require('./index.css');

interface CardProps {
  id: string;
  name: string;
  stage: {
    id: string;
  };
}

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  demand: {
    id: string;
  } | null;
  cards: CardProps[];
}
type DataIndex = keyof DataType;

type Props = {
  demandId: string;
};

const Stage = ({ demandId }: Props) => {
  const [stages, setStages] = useState<DataType[]>([]);
  const [cards, setCards] = useState<CardProps[]>([]);

  const [recordCard, setRecordCard] = useState<any>({});
  const [recordStage, setRecordStage] = useState<any>({});

  const [showStageModal, setShowStageModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    setShowStageModal(false);
    setShowCardModal(false);
    loadingStages();
  }, []);

  const updateStagesList = (stages: any) => {
    setStages(prevAxle => [...prevAxle, stages]);
    loadingStages();
  };

  const updateCardList = (cards: any) => {
    setStages(prevCards => [...prevCards, cards]);
  };

  //Listando todos as fases daquela demanda
  async function loadingStages() {
    const response = await getStage('stage');
    if (response !== false) {
      const filteredStages = response.data.filter((stage: DataType) => {
        return stage.demand && stage.demand.id === demandId; //erro
      });
      setStages(filteredStages);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as etapas.');
    }
  }

  const hideModal = (refresh: boolean) => {
    setShowStageModal(false);
    setShowCardModal(false);
    setRecordCard(null);
    setRecordStage(null);
    if (refresh) {
      setCards([]);
    }
  };

  const clickDeleteCard = async (record: any) => {
    await deleteCard(record.id);
    const newCards = cards.filter(card => card.id !== record.id);
    setCards(newCards);
  };

  const clickDeleteStage = async (record: any) => {
    await deleteStage(record.id);
    const newStages = cards.filter(card => card.id !== record.id);
    setCards(newStages);
  };

  const handleCardMenuClick: MenuProps['onClick'] = e => {
    if (e.key === '1') {
      setShowCardModal(true);
    }
  };
  const handleStageMenuClick: MenuProps['onClick'] = e => {
    if (e.key === '1') {
      setShowCardModal(true);
    }
  };

  const renderMenuStage = (record: any) => {
    return (
      <Space size="middle">
        <Dropdown
          menu={{
            items: [
              {
                label: 'Alterar',
                key: '1',
                onClick: () => {
                  setRecordStage(record);
                },
              },
              {
                label: (
                  <Popconfirm
                    title="Tem certeza de que deseja desabilitar este registro de demanda?"
                    onConfirm={() => clickDeleteStage(record)}
                  >
                    Excluir
                  </Popconfirm>
                ),
                key: '2',
                danger: true,
              },
            ],
            onClick: handleStageMenuClick,
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

  const renderMenuCard = (record: any) => {
    return (
      <Space size="middle">
        <Dropdown
          menu={{
            items: [
              {
                label: 'Alterar',
                key: '1',
                onClick: () => {
                  setRecordCard(record);
                },
              },
              {
                label: (
                  <Popconfirm
                    title="Tem certeza de que deseja desabilitar este registro de demanda?"
                    onConfirm={() => clickDeleteCard(record)}
                  >
                    Excluir
                  </Popconfirm>
                ),
                key: '2',
                danger: true,
              },
            ],
            onClick: handleCardMenuClick,
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

  return (
    <>
      <div>
        <Button
          className="botao"
          type="primary"
          onClick={() => {
            setShowStageModal(true);
          }}
        >
          Criar nova etapa
        </Button>
        <Button
          className="botao"
          type="primary"
          onClick={() => {
            setShowCardModal(true);
          }}
        >
          Criar novo card
        </Button>

        <div className="body">
          {stages.length > 0 ? (
            stages.map(stage => (
              <div className="stage" key={stage.id}>
                <div className="stage-header">
                  <h2 className="stage-title">{stage.name}</h2>
                  <span className="icon-wrapper stage-icon">
                    {renderMenuStage({ ...stage })}
                  </span>
                </div>

                <div className="card-list">
                  {stage.cards ? (
                    stage.cards.map(card => (
                      <div className="card" key={card.id}>
                        <Space>
                          <Button className="botao-card">
                            <h3 className="card-title">{card.name}</h3>
                          </Button>
                          <span className="icon-wrapper">
                            {renderMenuCard({ ...card })}
                          </span>
                        </Space>
                      </div>
                    ))
                  ) : (
                    <div>Nenhum card encontrado</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>Você não tem nenhuma lista, comece a criar</div>
          )}

          {recordStage && (
            <ModalStage
              id={recordStage?.id}
              demandId={demandId}
              openModal={showStageModal}
              closeModal={hideModal}
              updateStagesList={updateStagesList}
            />
          )}

          {showCardModal && (
            <ModalCard
              id={recordCard?.id}
              demandId={demandId}
              openModal={showCardModal}
              closeModal={hideModal}
              updateCardsList={updateCardList}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Stage;

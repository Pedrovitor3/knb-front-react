'use client';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps, Popconfirm, Space, message } from 'antd';
import { deleteStage, getStage } from '../../services/axios/stageService';
import { MoreOutlined, TagFilled, TagOutlined } from '@ant-design/icons';
import { deleteCard } from '../../services/axios/cardService';
import ModalCard from '../../components/ModalCard';
import ModalStage from '../../components/ModalStage';
import ModalCardOpen from '../../components/ModalStage copy';

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
  const [idCard, setIdCard] = useState<any>({});

  const [showStageModal, setShowStageModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  useEffect(() => {
    setShowStageModal(false);
    setShowCardModal(false);
    setOpenCardModal(false);
    loadingStages();
  }, []);

  const updateStagesList = (stages: any) => {
    setStages(prevStage => [...prevStage, stages]);
    loadingStages();
  };

  const updateCardList = (cards: any) => {
    setCards(prevCards => [...prevCards, cards]);
  };

  //Listando todos as fases daquela demanda
  async function loadingStages() {
    const response = await getStage('stage');
    if (response !== false) {
      const filteredStages = response.data.filter((stage: DataType) => {
        return stage.demand && stage.demand.id === demandId;
      });
      setStages(filteredStages);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as etapas.');
    }
  }

  const hideModal = (refresh: boolean) => {
    setShowStageModal(false);
    setShowCardModal(false);
    setOpenCardModal(false);
    setRecordCard(null);
    setRecordStage(null);
    setIdCard(null);
    if (refresh) setStages([]);
  };

  const clickDeleteCard = async (record: any) => {
    await deleteCard(record.id);
    const newCards = cards.filter(card => card.id !== record.id);
    setCards(newCards);
  };

  const clickDeleteStage = async (record: any) => {
    await deleteStage(record.id);
    const newStages = stages.filter(stage => stage.id !== record.id);
    setStages(newStages);
    loadingStages();
  };

  const handleCardMenuClick: MenuProps['onClick'] = e => {
    if (e.key === '1') {
      setShowCardModal(true);
    }
  };

  const handleStageMenuClick: MenuProps['onClick'] = e => {
    if (e.key === '1') {
      setShowStageModal(true);
    }
  };

  const handleCardModalClick = (id: any) => {
    setOpenCardModal(true);
    setIdCard(id);
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
                    title="Tem certeza de que deseja desabilitar este registro et?"
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
                    title="Tem certeza de que deseja desabilitar este registro ?"
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

  const renderTag = (record: any) => {
    const card = record;
    if (card.tag !== 'nenhuma') {
      if (card.tag === 'importante') {
        return <TagFilled style={{ color: 'blue', marginRight: '5px' }} />;
      } else {
        return <TagFilled style={{ color: 'red', marginRight: '5px' }} />;
      }
    }
  };

  return (
    <>
      <div>
        <Button
          className="botao-criar"
          type="primary"
          onClick={() => {
            setShowStageModal(true);
          }}
        >
          Criar nova etapa
        </Button>
        <Button
          className="botao-criar"
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
                  <h2 className="stage-title">
                    <span className="icon-wrapper-stage">
                      {renderMenuStage({ ...stage, id: stage.id })}
                    </span>
                    {stage.name}
                  </h2>
                </div>

                <div className="card-list">
                  {stage.cards ? (
                    stage.cards.map(card => (
                      <div className="card" key={card.id}>
                        <div className="tag-wrapper">
                          {renderTag({ ...card })}
                        </div>
                        <Space>
                          <Button
                            onClick={() => {
                              handleCardModalClick(card.id);
                            }}
                            className="botao-card"
                          >
                            <h3 className="card-title">{card.name}</h3>
                          </Button>

                          <span className="icon-wrapper-card">
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

          <ModalStage
            id={recordStage?.id}
            demandId={demandId}
            openModal={showStageModal}
            closeModal={hideModal}
            updateStagesList={updateStagesList}
          />

          {showCardModal && (
            <ModalCard
              id={recordCard?.id}
              demandId={demandId}
              openModal={showCardModal}
              closeModal={hideModal}
              updateCardsList={updateCardList}
            />
          )}
          {openCardModal && (
            <ModalCardOpen
              id={idCard}
              openModal={openCardModal}
              closeModal={hideModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Stage;

'use client';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps, Popconfirm, Space, message } from 'antd';
import { getStage } from '../../services/axios/stageService';
import { MoreOutlined } from '@ant-design/icons';
import { deleteCard } from '../../services/axios/cardService';
import ModalCard from '../../components/ModalDemand';

require('./index.css');

interface CardProps {
  id: string;
  name: string;
  stageId?: string;
}

interface StageProps {
  id: string;
  name: string;
  demand: {
    id: string;
  } | null;
  cards: CardProps[];
}

type Props = {
  demandId: string;
};

const Stage = ({ demandId }: Props) => {
  const [stages, setStages] = useState<StageProps[]>([]);
  const [cards, setCards] = useState<CardProps[]>([]);
  const [recordCard, setRecordCard] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false);
    loadingStages();
  }, []);

  useEffect(() => {
    loadingStages();
  }, [stages]);

  //Listando todos as fases daquela demanda
  async function loadingStages() {
    const response = await getStage('stage');
    if (response !== false) {
      const filteredStages = response.data.filter((stage: StageProps) => {
        return stage.demand && stage.demand.id === demandId; //erro
      });
      setStages(filteredStages);
    } else {
      message.error('Ocorreu um erro inesperado ao obter as etapas.');
    }
  }

  const hideModal = (refresh: boolean) => {
    setShowModal(false);
    setRecordCard(null);
    if (refresh) setCards([]);
  };

  const ClickDeleteCard = async (record: CardProps) => {
    await deleteCard(record.id);
    const newDemands = cards.filter(card => card.id !== record.id);
    setCards(newDemands);
    loadingStages();
  };

  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === '1') {
      setShowModal(true);
    }
  };

  const renderMenu = (record: CardProps) => {
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
                    onConfirm={() => ClickDeleteCard(record)}
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

  return (
    <>
      <div>
        <Button
          className="botao"
          type="primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Criar novo card
        </Button>
        <div className="body">
          {stages.length > 0 ? (
            stages.map(stage => (
              <div className="stage" key={stage.id}>
                <div className="title">
                  <h2 className="stage-title">{stage.name}</h2>
                </div>

                <div className="card-list">
                  {stage.cards.map(card => (
                    <div className="card" key={card.id}>
                      <Space>
                        <Button className="botao-card">
                          <h3 className="card-title">{card.name}</h3>
                        </Button>
                        <span className="icon-wrapper">
                          {renderMenu({ ...card, stageId: stage.id })}
                        </span>
                      </Space>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>Você não tem nenhuma lista, comece a criar</div>
          )}

          {recordCard && (
            <ModalCard
              id={recordCard?.id}
              stageId={recordCard.stageId}
              openModal={showModal}
              closeModal={hideModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Stage;

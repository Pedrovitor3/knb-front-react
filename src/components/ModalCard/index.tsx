import { Modal, Form, Input, Col, message, Select } from 'antd';
import { useEffect, useState } from 'react';

import {
  getCard,
  postCard,
  updateCard,
} from '../../services/axios/cardService';
import { getStage } from '../../services/axios/stageService';

type Props = {
  id: string;
  demandId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
  updateCardsList: any;
};

const ModalCard = ({
  id,
  demandId,
  openModal,
  closeModal,
  updateCardsList,
}: Props) => {
  const [form] = Form.useForm();
  const [stages, setStages] = useState<any[]>([]);
  const [selectStageId, setSelectedStageId] = useState('');

  const { Option } = Select;

  const handleOk = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(() => {
        if (id) {
          submitUpdate();
        } else {
          submitCreate();
        }
        form.resetFields();
        closeModal(true);
      })
      .catch(errorInfo => message.error('Erro no preenchimento dos campos.'));
  };

  useEffect(() => {
    loadingCard();
    loadingStages();
  }, []);

  async function loadingCard() {
    if (id) {
      try {
        const response = await getCard(`card/${id}`);
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            stage: response.data.stage.id,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as demandas.');
        }
      } catch (error) {
        message.error('Ocorreu um erro inesperado ao obter as demandas.');
      }
    }
  }

  async function loadingStages() {
    try {
      const response = await getStage('stage');
      if (response !== false) {
        const filteredStages = response.data.filter(
          (stage: any) => stage.demand && stage.demand.id === demandId,
        );
        setStages(filteredStages);
      } else {
        message.error('Ocorreu um erro inesperado ao obter as etapas.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter as etapas.');
    }
  }

  const submitUpdate = async () => {
    const editingCard = form.getFieldsValue(true);
    await updateCard(editingCard, id);
    updateCardsList(editingCard);
  };

  const submitCreate = async () => {
    const editingCard = form.getFieldsValue(true);
    await postCard(editingCard);
    updateCardsList(editingCard);
  };

  function handleSelectStage(value: any) {
    setSelectedStageId(value); // Atualiza o estado com o ID selecionado
  }

  return (
    <>
      <Modal
        visible={openModal}
        title="Cartão"
        okText="Salvar"
        onCancel={() => {
          form.resetFields();
          closeModal(false);
        }}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
          <Col offset={1} span={16}>
            <Form.Item
              name="name"
              label="Nome"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o nome da demanda',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item
              name="description"
              label="Descrição"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a descrição do cartão',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item name={['stage']} label="Etapa">
              <Select
                showSearch
                placeholder="Selecione o objeto"
                onChange={value => handleSelectStage(value)}
                value={selectStageId} // Define o valor do Select com o estado atual de selectTraining
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={stages.map(stages => ({
                  label: stages.name,
                  value: stages.id, // Define o ID do treinamento como valor da opção
                }))}
              />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCard;

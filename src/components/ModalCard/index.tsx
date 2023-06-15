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
          console.log(response.data);
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
            <Form.Item
              name="stage"
              label="Etapa"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione a fase',
                },
              ]}
              hasFeedback
            >
              <Select>
                {stages
                  .filter(stage => stage.demand && stage.demand.id === demandId)
                  .map(stage => (
                    <Option key={stage.id} value={stage.id}>
                      {stage.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCard;

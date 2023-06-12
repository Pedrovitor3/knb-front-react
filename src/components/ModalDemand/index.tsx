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
  stageId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalCard = ({ id, stageId, openModal, closeModal }: Props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [stages, setStages] = useState<{ id: string; name: string }[]>([]);
  const [selectedStageId, setSelectedStageId] = useState<string>('');

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
  }, [id]);

  useEffect(() => {
    loadingStage();
  }, [stageId]);

  useEffect(() => {
    loadingCard();
    loadingStages();
  }, []);

  async function loadingCard() {
    if (id) {
      await getCard(`card/${id}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as demandas.');
        }
      });
    }
  }

  async function loadingStage() {
    if (id) {
      await getStage(`stage/${stageId}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            stageId: response.data.id,
            stageName: response.data.name,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as demandas.');
        }
      });
    }
  }

  async function loadingStages() {
    await getStage(`stage`).then(response => {
      if (response !== false) {
        setStages(response.data);
      } else {
        message.error('Ocorreu um erro inesperado ao obter as demandas.');
      }
    });
  }

  const handleChangeStage = (id: string) => {
    setSelectedStageId(id);
  };

  const submitUpdate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await updateCard(editingDemand, id);
  };

  const submitCreate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await postCard(editingDemand);
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
              name="stageName"
              label="Etapa"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione a fase',
                },
              ]}
              hasFeedback
            >
              <Select value={selectedStageId} onChange={handleChangeStage}>
                {stages.map(stage => (
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

import { Modal, Form, Input, Col, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import {
  getDemand,
  postDemand,
  updateDemand,
} from '../../services/axios/demandService';

type Props = {
  cardId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalCard = ({ cardId, openModal, closeModal }: Props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [phases, setPhases] = useState<{ id: string; name: string }[]>([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>('');

  console.log(cardId);

  const handleOk = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(() => {
        if (cardId) {
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
    loadingDemand();
  }, [cardId]);

  async function loadingDemand() {
    if (cardId) {
      await getDemand(`card/${cardId}`).then(response => {
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

  const handleChangePhase = (cardId: string) => {
    setSelectedPhaseId(cardId);
  };

  const submitUpdate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await updateDemand(editingDemand, cardId);
  };

  const submitCreate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await postDemand(editingDemand);
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Demanda"
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
                  message: 'Por favor, insira a descrição da demanda',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item
              name="phaseName"
              label="Fase"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione a fase',
                },
              ]}
              hasFeedback
            >
              <Select value={selectedPhaseId} onChange={handleChangePhase}>
                {phases.map(phase => (
                  <Option key={phase.id} value={phase.id}>
                    {phase.name}
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

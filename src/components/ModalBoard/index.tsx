import { Modal, Form, Input, Col, message } from 'antd';
import { useEffect } from 'react';
import {
  getDemand,
  postDemand,
  updateDemand,
} from '../../services/axios/demandService';
import { getPhase } from '../../services/axios/phaseService';

type Props = {
  id: string;
  phaseId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalBoard = ({ id, phaseId, openModal, closeModal }: Props) => {
  const [form] = Form.useForm();

  console.log('a', phaseId);

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

  // Listagem, se tiver id set no formulário
  useEffect(() => {
    loadingDemand();
  }, [id]);

  useEffect(() => {
    loadingPhase();
  }, [phaseId]);

  async function loadingDemand() {
    if (id) {
      await getDemand(`demand/${id}`).then(response => {
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
  async function loadingPhase() {
    if (id) {
      await getPhase(`phase/${phaseId}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            phaseName: response.data.name,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as demandas.');
        }
      });
    }
  }

  // ATUALIZAÇÃO DE DEMANDAS
  const submitUpdate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await updateDemand(editingDemand, id);
  };

  // CRIAÇÃO DE DEMANDAS
  const submitCreate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await postDemand(editingDemand);
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Demandas"
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
                  message: 'Por favor, insira a descrição da demanda',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalBoard;

import { Modal, Form, Input, Col, message, Select } from 'antd';
import { useEffect } from 'react';

import { getCard } from '../../services/axios/cardService';

type Props = {
  id: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalCardOpen = ({ id, openModal, closeModal }: Props) => {
  const [form] = Form.useForm();
  console.log('id', id);

  const handleOk = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(() => {
        form.resetFields();
        closeModal(true);
      })
      .catch(errorInfo => message.error('Erro no preenchimento dos campos.'));
  };

  useEffect(() => {
    loadingCard();
  }, [id]);

  async function loadingCard() {
    if (id) {
      await getCard(`card/${id}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            stage: response.data.stage.name,
            tag: response.data.tag,
            comment: response.data.comment,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as etapas.');
        }
      });
    }
  }

  return (
    <>
      <Modal
        visible={openModal}
        title="etapa"
        okText="Salvar"
        onCancel={() => {
          form.resetFields();
          closeModal(false);
        }}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
          <Col offset={1} span={16}>
            <Form.Item name="name" label="Nome">
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item name="description" label="Descrição">
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item name="stage" label="Etapa">
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={6}>
            <Form.Item name="tag" label="Etiquetas">
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item name="comment" label="Comentario">
              <Input />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCardOpen;

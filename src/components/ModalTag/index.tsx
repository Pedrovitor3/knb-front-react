import { Modal, Form, Input, Col, message, Button, Row, Popover } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import {
  deleteTag,
  getTag,
  postTag,
  updateTag,
} from '../../services/axios/tagService';

import { SketchPicker } from 'react-color';

type Props = {
  updateCardsList: any;
  id: string;
  cardId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalTag = ({ updateCardsList, id, openModal, closeModal }: Props) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState('#000000'); // Estado para armazenar a cor selecionada

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
    loadingTags();
  }, []);

  useEffect(() => {
    loadingTags();
  }, [id]);

  async function loadingTags() {
    if (id) {
      const response = await getTag(`tag/${id}`);
      if (response && response.data) {
        form.setFieldsValue({
          id: response.data.id,
          name: response.data.name,
          cor: response.data.cor,
        });
        setColor(response.data.cor); // Define a cor selecionada do estado
      } else {
        message.error('Ocorreu um erro inesperado ao obter as etiquetas.');
      }
    }
  }

  const submitUpdate = async () => {
    const editingStage = form.getFieldsValue(true);
    if (id) {
      await updateTag(editingStage, id);
      updateCardsList(editingStage);
    }
  };

  const submitCreate = async () => {
    const editingStage = form.getFieldsValue(true);
    await postTag(editingStage);
    updateCardsList(editingStage);
  };

  const clickDeleteTag = async () => {
    const editingStage = form.getFieldsValue(true);

    if (id) {
      await deleteTag(id);
      closeModal(true);
      updateCardsList(editingStage);
    }
  };

  const handleColorChange = (color: { hex: SetStateAction<string> }) => {
    setColor(color.hex);
    form.setFieldsValue({ cor: color.hex });
  };

  const colorPicker = (
    <SketchPicker color={color} onChange={handleColorChange} />
  );

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
            <Form.Item
              name="name"
              label="Nome"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o nome da etiqueta',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item
              name="cor"
              label="Cor"
              hasFeedback
              style={{ marginBottom: 0 }}
            >
              <Popover content={colorPicker} trigger="click">
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                    border: '1px black solid',
                    background: color,
                    marginBottom: '25px',
                  }}
                />
              </Popover>
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Row style={{ display: 'inline-block' }}>
              <Button onClick={() => clickDeleteTag()}>Deletar Etiqueta</Button>
            </Row>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalTag;

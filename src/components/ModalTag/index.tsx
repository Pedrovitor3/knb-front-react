import { Modal, Form, Input, Col, message } from 'antd';
import { useEffect, useState } from 'react';
import { getTag, postTag, updateTag } from '../../services/axios/tagService';

type Props = {
  updateCardsList: any;
  id: string;
  cardId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalTag = ({ updateCardsList, id, openModal, closeModal }: Props) => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState<any[]>([]);
  //const [stages, setStages] = useState<{ id: string; name: string }[]>([]);

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
    try {
      const response = await getTag(`tag`);
      if (response !== false) {
        console.log(response.data);
        form.setFieldsValue({
          id: response.data.id,
          name: response.data.name,
          cor: response.data.cor,
        });
      } else {
        message.error('Ocorreu um erro inesperado ao obter as etiquetas.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter as etiquetas.');
    }
  }

  const submitUpdate = async () => {
    const editingStage = form.getFieldsValue(true);
    await updateTag(editingStage, id);
    updateCardsList(editingStage); // Chama a função updateAxleList com o novo axle
  };

  const submitCreate = async () => {
    const editingStage = form.getFieldsValue(true);
    await postTag(editingStage);
    updateCardsList(editingStage); // Chama a função updateAxleList com o novo axle
  };

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
                  message: 'Por favor, insira o nome da etapa',
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
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o nome da etapa',
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

export default ModalTag;

import { Modal, Form, Input, Col, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  getStage,
  postStage,
  updateStage,
} from '../../services/axios/stageService';

type Props = {
  updateStagesList: any;
  id: string;
  demandId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalStage = ({
  id,
  demandId,
  updateStagesList,
  openModal,
  closeModal,
}: Props) => {
  const [form] = Form.useForm();
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
    loadingStage();
  }, []);

  async function loadingStage() {
    if (id) {
      await getStage(`stage/${id}`).then(response => {
        if (response !== false) {
          console.log('res', response.data);
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            demand: response.data.demand,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as etapas.');
        }
      });
    }
  }

  const submitUpdate = async () => {
    const editingStage = form.getFieldsValue(true);
    await updateStage(editingStage, id);
    updateStagesList(editingStage); // Chama a função updateAxleList com o novo axle
  };

  const submitCreate = async () => {
    const editingStage = form.getFieldsValue(true);
    await postStage(editingStage);
    updateStagesList(editingStage); // Chama a função updateAxleList com o novo axle
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
              name="demand"
              initialValue={demandId} // Define o valor inicial do campo demand
            ></Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalStage;

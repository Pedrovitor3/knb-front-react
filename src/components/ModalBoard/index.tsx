import { Modal, Form, Input, Col, message, Select } from 'antd';
import { useEffect } from 'react';
import {
  getDemand,
  postDemand,
  updateDemand,
} from '../../services/axios/demandService';

const { Option } = Select;

type Props = {
  updateDemandList: any;
  id?: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalBoard = ({ updateDemandList, id, closeModal, openModal }: Props) => {
  const [form] = Form.useForm();

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
    loadingDemand();
  }, [id]);

  useEffect(() => {
    loadingDemand();
  }, []);

  async function loadingDemand() {
    if (id) {
      await getDemand(`demand/${id}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            status: response.data.status,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as demandas.');
        }
      });
    }
  }

  const submitUpdate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await updateDemand(editingDemand, id);
    updateDemandList(editingDemand);
  };

  const submitCreate = async () => {
    const editingDemand = form.getFieldsValue(true);
    await postDemand(editingDemand);
    updateDemandList(editingDemand); // Chama a função updateAxleList com o novo axle
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
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{ height: '70px' }}
              />
            </Form.Item>
          </Col>
          <Col offset={1} span={16}>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione a fase',
                },
              ]}
              hasFeedback
            >
              <Select>
                <Option value="aguardando">Aguardando</Option>
                <Option value="executando">Executando</Option>
                <Option value="concluido">Concluído</Option>
                <Option value="pendente">Pendente</Option>
                <Option value="recusado">Recusado</Option>
              </Select>
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalBoard;

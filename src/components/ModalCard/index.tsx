import { Modal, Form, Input, Col, message, Select, Row } from 'antd';
import { useEffect, useState } from 'react';

import {
  getCard,
  postCard,
  updateCard,
} from '../../services/axios/cardService';
import { getStage } from '../../services/axios/stageService';
import { getTag } from '../../services/axios/tagService';

type Props = {
  updateCardsList: any;
  id: string;
  demandId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalCard = ({
  updateCardsList,
  id,
  demandId,
  openModal,
  closeModal,
}: Props) => {
  const [form] = Form.useForm();
  const [stages, setStages] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectStageId, setSelectedStageId] = useState('');
  const [selectTagId, setSelectTagId] = useState('');

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
    loadingTags();
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
            tag: response.data.tag.id,
            comment: response.data.comment,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter os cartões.');
        }
      } catch (error) {
        message.error('Ocorreu um erro inesperado ao obter os cartões.');
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

  async function loadingTags() {
    try {
      const response = await getTag(`tag`);
      if (response !== false) {
        setTags(response.data);
      } else {
        message.error('Ocorreu um erro inesperado ao obter as etiquetas.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter as etiquetas.');
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
          <Col offset={1} span={17}>
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
          <Col offset={1} span={17}>
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
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }} // Configuração para permitir a quebra de linha
                style={{ height: '70px' }}
              />
            </Form.Item>
          </Col>

          <Row gutter={16}>
            <Col offset={1} span={10}>
              <Form.Item
                name={['stage']}
                label="Etapa"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a descrição do cartão',
                  },
                ]}
                hasFeedback
              >
                <Select
                  showSearch
                  placeholder="Selecione o objeto"
                  onChange={value => handleSelectStage(value)}
                  value={selectStageId}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={stages.map(stage => ({
                    label: stage.name,
                    value: stage.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col offset={4} span={8}>
              <Form.Item name={['tag']} label="Etiqueta" hasFeedback>
                <Select
                  showSearch
                  placeholder="Selecione a etiqueta"
                  value={selectTagId}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={tags.map(tags => ({
                    label: tags.name,
                    value: tags.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Col offset={1} span={17}>
            <Form.Item name="comment" label="Comentario" hasFeedback>
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }} // Configuração para permitir a quebra de linha
                style={{ height: '70px' }}
              />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCard;

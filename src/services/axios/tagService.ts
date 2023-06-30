import { getConfig } from '../../configs/sistemaConfig';
import { APIDemands } from './baseService/baseService';
import { message } from 'antd';

interface Tag {
  inputName: any;
}

export async function getTag(url: any) {
  try {
    const response = await APIDemands.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de etiquetas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the tags list.${error}`,
    );
  }
  return false;
}

export async function postTag(tag: Tag) {
  try {
    await APIDemands.post('/tag', tag, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de etiquetas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the tags list.${error}`,
    );
  }
}

export const updateTag = async (tag: Tag, id: any) => {
  try {
    await APIDemands.put(`tag/${id}`, tag, getConfig('priv'));
    message.success('Editado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de etiquetas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the tags list.${error}`,
    );
  }
};

export async function deleteTag(id: any) {
  try {
    await APIDemands.delete(`tag/${id}`, getConfig('priv'));
    message.warning('etiqueta excluida');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de etiquetas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the tags list.${error}`,
    );
  }
}

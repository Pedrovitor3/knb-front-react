import { APITag } from './baseService/baseService';
import { message } from 'antd';

interface Tag {
  inputName: any;
}

export async function getTag(url: any) {
  try {
    const response = await APITag.get(url);
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de eixos, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the axle list.${error}`,
    );
  }
  return false;
}

export async function postTag(tag: Tag) {
  try {
    await APITag.post('/tag', tag);
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de eixos, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the axle list.${error}`,
    );
  }
}

export const updateTag = async (tag: Tag, id: any) => {
  try {
    await APITag.put(`tag/${id}`, tag);
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de eixos, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the axle list.${error}`,
    );
  }
};

export async function deleteTag(id: any) {
  try {
    await APITag.delete(`tag/${id}`);
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de eixos, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the axle list.${error}`,
    );
  }
}

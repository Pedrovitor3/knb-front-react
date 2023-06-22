import { getConfig } from '../../configs/sistemaConfig';
import { APIStage } from './baseService/baseService';
import { message } from 'antd';

interface Stage {
  inputName: any;
}

export async function getStage(url: any) {
  try {
    const response = await APIStage.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter as etapas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the stages list.${error}`,
    );
  }
  return false;
}

export async function postStage(stage: Stage) {
  try {
    await APIStage.post('/stage', stage, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter as etapas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the stages list.${error}`,
    );
  }
}

export const updateStage = async (stage: Stage, id: any) => {
  try {
    await APIStage.put(`stage/${id}`, stage, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter as etapas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the stages list.${error}`,
    );
  }
};

export async function deleteStage(id: any) {
  try {
    await APIStage.delete(`stage/${id}`, getConfig('priv'));
    message.warning('Etapa excluida');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter as etapas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the stages list.${error}`,
    );
  }
}

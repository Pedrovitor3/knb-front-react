import { APIPhase } from './baseService/baseService';
import { message } from 'antd';

interface Phase {
  inputName: any;
}

export async function getPhase(url: any) {
  try {
    const response = await APIPhase.get(url);
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar as demandas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving demands ${error}`,
    );
  }
  return false;
}
export async function postPhase(phase: Phase) {
  try {
    await APIPhase.post('/phase', phase);
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

export const updatePhase = async (phase: Phase, id: any) => {
  try {
    await APIPhase.put(`phase/${id}`, phase);
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

export async function deletePhase(id: any) {
  try {
    await APIPhase.delete(`phase/${id}`);
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

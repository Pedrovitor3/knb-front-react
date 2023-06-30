import { message } from 'antd';
import { APIDemands } from './baseService/baseService';
import { getConfig } from '../../configs/sistemaConfig';

interface Demand {
  inputName: any;
}

export async function getDemand(url: any) {
  try {
    const response = await APIDemands.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar a demanda, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the demands list.${error}`,
    );
  }
  return false;
}

export async function postDemand(demand: Demand) {
  try {
    await APIDemands.post('/demand', demand, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar a demanda, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the demand lists.${error}`,
    );
  }
}

export const updateDemand = async (demand: Demand, id: any) => {
  try {
    await APIDemands.put(`demand/${id}`, demand, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar a demanda, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the demands list.${error}`,
    );
  }
};

export async function deleteDemand(id: any) {
  try {
    await APIDemands.delete(`demand/${id}`, getConfig('priv'));
    message.warning('cartão excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar a demanda, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the demands list.${error}`,
    );
  }
}

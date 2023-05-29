import { message } from 'antd';
import { APIDemand } from './baseService/baseService';

interface Demand {
  inputName: any;
}

export async function getDemand(url: any) {
  try {
    const response = await APIDemand.get(url);
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
      `An unexpected error occurred while retrieving the demands.${error}`,
    );
  }
  return false;
}

export async function postDemand(demand: Demand) {
  try {
    await APIDemand.post('/demand', demand);
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

export const updateDemand = async (demand: Demand, id: any) => {
  try {
    await APIDemand.put(`demand/${id}`, demand);
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

export async function deleteDemand(id: any) {
  try {
    await APIDemand.delete(`demand/${id}`);
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

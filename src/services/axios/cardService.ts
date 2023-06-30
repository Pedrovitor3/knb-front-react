import { getConfig } from '../../configs/sistemaConfig';
import { APIDemands } from './baseService/baseService';
import { message } from 'antd';

interface Card {
  inputName: any;
}

export async function getCard(url: any) {
  try {
    const response = await APIDemands.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar os cartões, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the cards list.${error}`,
    );
  }
  return false;
}

export async function postCard(card: Card) {
  try {
    await APIDemands.post('/card', card, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar os cartões, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the axle list list.${error}`,
    );
  }
}

export const updateCard = async (card: Card, id: any) => {
  try {
    await APIDemands.put(`card/${id}`, card, getConfig('priv'));
    message.success('Editado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar os cartões, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the axle list list.${error}`,
    );
  }
};

export async function deleteCard(id: any) {
  try {
    await APIDemands.delete(`card/${id}`, getConfig('priv'));
    message.warning('cartão excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar os cartões, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the axle list list.${error}`,
    );
  }
}

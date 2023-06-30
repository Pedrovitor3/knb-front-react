import { getConfig } from '../../configs/sistemaConfig';
import { APIDemands } from './baseService/baseService';
import { message } from 'antd';

interface Profile {
  inputName: any;
}

export async function getProfile(url: any) {
  try {
    const response = await APIDemands.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de perfil, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the profile  list.${error}`,
    );
  }
  return false;
}

export async function postProfile(profile: Profile) {
  try {
    await APIDemands.post('/profile', profile, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de perfil, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the profile  list.${error}`,
    );
  }
}

export const updateProfile = async (profile: Profile, id: any) => {
  try {
    await APIDemands.put(`profile/${id}`, profile, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de perfils, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the profile list.${error}`,
    );
  }
};

export async function deleteProfile(id: any) {
  try {
    await APIDemands.delete(`profile/${id}`, getConfig('priv'));
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista de perfils, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the profile list.${error}`,
    );
  }
}

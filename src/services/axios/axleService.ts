import { message } from 'antd';
import { APIAxle } from './baseService/baseService';

export async function getAxles(url: any) {
  message.success('cadastrado com sucesso');
  try {
    const response = await APIAxle.get(url);
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

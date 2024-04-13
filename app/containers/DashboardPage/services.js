import { logger } from '../../services';
import {doServerRequest} from '../../services/axiosServices';

const getList = async ({limit=10, page=1, populate}) => {
    const url = `/students?limit=${limit}&page=${page}`;
    const populated = populate ? `&populate=${populate}` : undefined;
    const finalUrl = populate ? url + populated : url;
  const {response, error} = await doServerRequest({
    url: finalUrl,
    method: 'GET',
  });
  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
}

  return {response, error};
}

const get = async (id) => {
  const {response, error} = await doServerRequest({
    url: `/students/${id}`,
    method: 'GET',
  });

  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
}

  return {response, error};
}

const post = async (data) => {
  const {response, error} = await doServerRequest({
    url: '/students',
    method: 'POST',
    data,
  });
  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
}
  return {response, error};
}

const update = async (data) => {
  const {id} = data;
  delete data.id;
  const {response, error} = await doServerRequest({
    url: `/students/${id}`,
    method: 'PATCH',
    data,
  });
  if (error) {
    // Handle the error here. For example, you can throw an error:
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
}
  return {response, error};
}   

const remove = async (id) => {
  const {response, error} = await doServerRequest({
    url: `/students/${id}`,
    method: 'DELETE',
  });

  if (error) {
    logger(error.message, 'error');
    logger('Error Stack:' + error.stack, 'error');
}

  return {response, error};
}

export {
  getList,
  get,
  post,
  update,
  remove,
};




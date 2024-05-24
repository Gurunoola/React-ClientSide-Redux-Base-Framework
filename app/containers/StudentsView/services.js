import { 
  logger,
  doServerRequest,
  config 
} from './imports';

const {API_ROUTE} = config;
const getList = async ({limit=10, page=1, populate}) => {
    const url = `/${API_ROUTE}?limit=${limit}&page=${page}`;
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
    url: `/${API_ROUTE}/${id}`,
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
    url: `/${API_ROUTE}`,
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
    url: `/${API_ROUTE}/${id}`,
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
    url: `/${API_ROUTE}/${id}`,
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




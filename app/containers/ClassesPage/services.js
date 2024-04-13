import { 
  logger,
  doServerRequest,
  config 
} from './imports';

const {API_ROUTE, POPULATE, TABLE_LIMIT, TABLE_PAGE} = config;
const getList = async ({limit=TABLE_LIMIT, page=TABLE_PAGE, populate}) => {
    const url = `/${API_ROUTE}?limit=${limit}&page=${page}`;
    const populated = populate ? `&populate=${POPULATE}` : undefined;
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




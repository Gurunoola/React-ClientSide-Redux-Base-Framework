export const sort = ({sortField, sortOrder, data,})=> {
    let result;
    if (sortOrder === 'asc') {
      result = data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return 1;
        } else if (b[sortField] > a[sortField]) {
          return -1;
        }
        return 0;
      });
    } else {
      result = data.sort((a, b) => {
        if (a[sortField] > b[sortField]) {
          return -1;
        } else if (b[sortField] > a[sortField]) {
          return 1;
        }
        return 0;
      });
    }
    return result;
}
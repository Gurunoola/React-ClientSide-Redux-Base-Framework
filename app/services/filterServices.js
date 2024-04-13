import { Comparator } from 'react-bootstrap-table2-filter';

export const filter = ({data, filters, list})=> { 
    let noDataRow = [];
    let result = [...list]
    Object.keys(result[0]).forEach((item) => {
      noDataRow[item] = 'No Result'
    })
    if (!_.isEmpty(filters)) {
      result = data.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];
          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
    }
    if (_.isEmpty(result))
      return [{ ...noDataRow }];
    else
      return [...result];

}
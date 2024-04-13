import * as _ from 'lodash'
export const search = (list, searchValue, filters, options)=>{
    let newList = [...list];
    if (filters !== 'none' && searchValue) {
      const searchParams = filters.map(item => item.value);
      if (_.isEmpty(searchParams))
        searchParams.push(options.defaultFilter)
      newList = list.filter((item) => {
        return searchParams.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) > -1
          );
        });
      });
    }
    if (!newList) newList = [];

    return newList;

}
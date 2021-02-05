export const paginationParams = (pageIndex, pageSize) => ({
  paginationParam: { pageNumber: pageIndex, pageSize: pageSize },
});

export const sortingParams = (sortKey, sortTypeValue) => ({
  sortingParams: { key: sortKey, sortType: sortTypeValue },
});

export const filterParams = (
  filterExpressionSign,
  filterKey,
  filterTextValue
) => ({
  filterExpression: filterExpressionSign,
  key: filterKey,
  textValue: {
    value: filterTextValue,
  },
});

export const filter = (filterParamsArray, filterLogic) => ({
  filter: {
    filterParams: filterParamsArray,
    filterLogic: filterLogic,
  },
});

export const tokenHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const lastItemFromUrl = (path) =>
  path.substring(path.lastIndexOf("/") + 1);

// TODO: Doc this!
export const mergeFilters = (stateFilters: any, filters: any, filterKey: string) => {
    if (!filterKey) return stateFilters;

    let mergedFilters;
    if (stateFilters) {
      const stateTrainingLeaveTypes = stateFilters[filterKey];
      mergedFilters = { ...filters, [filterKey]: { ...stateTrainingLeaveTypes, ...filters[filterKey] } };
    } else {
      mergedFilters = { ...filters[filterKey] };
    }

    return mergedFilters;
};

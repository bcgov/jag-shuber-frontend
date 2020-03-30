// TODO: Doc this!
export const mergeFilters = (stateFilters: any, filters: any, filterKey: string, isExpirable: boolean = true) => {
    if (!filterKey) return stateFilters;

    let mergedFilters;
    let expireFilters = {};

    if (stateFilters) {
        expireFilters = isExpirable
            ? {
                isExpired: filters[filterKey] && filters[filterKey].isExpired !== undefined
                    ? filters[filterKey].isExpired
                    : !!(filters[filterKey] && filters[filterKey].isExpired === undefined && stateFilters[filterKey] && stateFilters[filterKey].isExpired)
            }
            : expireFilters;

        const stateTrainingLeaveTypes = stateFilters[filterKey];

        mergedFilters = {
            ...filters,
            [filterKey]: {
                ...stateTrainingLeaveTypes,
                ...expireFilters,
                ...filters[filterKey]
            }
        };
    } else {
        expireFilters = isExpirable
            ? {
                isExpired: filters[filterKey] && filters[filterKey].isExpired !== undefined
                    ? filters[filterKey].isExpired
                    : false
            }
            : expireFilters;

        mergedFilters = {
            ...expireFilters,
            ...filters[filterKey]
        };
    }

    return mergedFilters;
};

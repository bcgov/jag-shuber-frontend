// TODO: Doc this!
export const mergeFilters = (stateFilters: any, filters: any, filterKey: string, isExpirable: boolean = true) => {
    if (!filterKey) return stateFilters;

    let mergedFilters;
    const expireFilters = isExpirable
            ? {
                isExpired: filters[filterKey] && filters[filterKey].isExpired !== undefined
                    ? filters[filterKey].isExpired
                    : false

            }
            : {};

    if (stateFilters) {
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
        mergedFilters = {
            ...expireFilters,
            ...filters[filterKey]
        };
    }

    return mergedFilters;
};

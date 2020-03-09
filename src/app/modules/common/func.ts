export const filterByKeys = (data: any, filters: any) => {
    Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined) {
            data = data.filter((i: any) => {
                // TODO: Support numeric...
                if (i[key] == null) return (filters[key] == null);
                return (i[key] && i[key] !== '' && filters[key] !== null)
                    ? i[key].toLowerCase().includes(`${filters[key].toLowerCase()}`)
                    : false;
            });
        }
    });

    return data;
};

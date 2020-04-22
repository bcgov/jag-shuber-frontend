export const filterByKeys = (data: any, filters: any) => {
    Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined) {
            data = data.filter((i: any) => {
                // TODO: Support numeric...
                if (i[key] == null) return (filters[key] == null);

                switch (typeof i[key]) {
                    case 'string':
                        return (i[key] && i[key] !== '' && filters[key] !== null)
                            ? i[key].toLowerCase().includes(`${filters[key].toLowerCase()}`)
                            : false;
                    case 'number':
                        return (i[key] && i[key] !== '' && filters[key] !== null)
                            ? i[key] === filters[key]
                            : false;
                    case 'boolean':
                        return (filters[key] !== null)
                            ? i[key] === filters[key]
                            : false;
                    default:
                        break;
                }

            });
        }
    });

    return data;
};

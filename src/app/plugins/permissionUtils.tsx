// TODO: Doc this!
export const buildPluginPermissions = (getPluginPermissions: Function | undefined) => {
    let grantAll = false;
    const permissions = (getPluginPermissions)
        ? getPluginPermissions()
        : [];

    grantAll = permissions === true;

    return { grantAll, permissions };
};

import { RootState } from '../../store';

export const selectedAdminFormSection = (state: RootState) => (stateKey: string) => {
    return (state && state[stateKey] && state[stateKey].selectedSection) ? state[stateKey].selectedSection : null;
};

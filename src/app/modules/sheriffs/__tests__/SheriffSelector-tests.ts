import { RootState } from '../../../store';
import * as selectors from '../selectors';

describe('Sheriff Selector', () => {

    it('getSheriff selector should not fail if no sheriffs present', () => {
        let state: Partial<RootState> = {
            sheriffs: {
                sheriffMap: {
                    isBusy: true,
                    error: undefined
                }
            }
        };

        expect(() => {
            selectors.getSheriff('/some/inexistent/sheriff')(state as RootState);
        }).not.toThrow();
    });
});
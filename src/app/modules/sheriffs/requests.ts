import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    SheriffModuleState
} from './common';
import {
    Sheriff
} from '../../api';
import GetEntityMapRequest from '../../infrastructure/Requests/GetEntityMapRequest';
import CreateEntityRequest from '../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../infrastructure/Requests/UpdateEntityRequest';
import toTitleCase from '../../infrastructure/toTitleCase';
import { SheriffRank } from '../../api/Api';

// Sheriff Map
class SheriffMapRequest extends GetEntityMapRequest<void, Sheriff, SheriffModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'sheriffMap',
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving list of sheriffs: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let sheriffs = await api.getSheriffs();
        return arrayToMap(sheriffs, t => t.id);
    }
}

export const sheriffMapRequest = new SheriffMapRequest();

// Create Sheriff
class CreateSheriffRequest extends CreateEntityRequest<Sheriff, SheriffModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createSheriff',
                toasts: {
                    success: (s) => (
                        `${toTitleCase(s.firstName)} ${toTitleCase(s.lastName)} has been added to your team`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new sheriff: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            sheriffMapRequest
        );
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.createSheriff(sheriff as Sheriff);
        return newSheriff;
    }
}

export const createSheriffRequest = new CreateSheriffRequest();

// Sheriff Edit
class UpdateSheriffRequest extends UpdateEntityRequest<Sheriff, SheriffModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateSheriff',
                toasts: {
                    success: (s) => `${toTitleCase(s.firstName)} ${toTitleCase(s.lastName)}'s profile has been updated`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating sheriff profile: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            sheriffMapRequest
        );
    }
    public async doWork(sheriff: Partial<Sheriff>, { api }: ThunkExtra): Promise<Sheriff> {
        let newSheriff = await api.updateSheriff(sheriff);
        return newSheriff;
    }
}

export const updateSheriffRequest = new UpdateSheriffRequest();

// Sheriff Rank Codes
class SheriffRankCodeMapRequest extends GetEntityMapRequest<void, SheriffRank, SheriffModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'sheriffRankCodeMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let rankCodes = await api.getSheriffRankCodes();
        return arrayToMap(rankCodes, r => r.code);
    }
}

export const sheriffRankCodeMapRequest = new SheriffRankCodeMapRequest();

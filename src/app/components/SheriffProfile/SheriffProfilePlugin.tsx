import * as React from 'react';
import { IdType } from '../../api/Api';
import { RootState } from '../../store';

export interface SheriffProfilePluginProps {
    sheriffId: IdType;
}

export interface SheriffProfilePlugin<T> {
    renderDisplay(props: SheriffProfilePluginProps & T): React.ReactNode;
    renderFormFields(props: SheriffProfilePluginProps & T): React.ReactNode;
    update(sheriffId: IdType, formValues: any): Promise<T | void>;
    create(sheriffId: IdType, formValues: any): Promise<T | void>;
    getData(sheriffId: IdType, state: RootState): T | undefined;
}

export abstract class SheriffProfilePluginBase<T> implements SheriffProfilePlugin<T> {
    DisplayComponent?: React.ReactType<SheriffProfilePluginProps & T>;
    FormComponent?: React.ReactType<SheriffProfilePluginProps & T>;
    renderDisplay(props: SheriffProfilePluginProps & T): React.ReactNode {
        const { DisplayComponent } = this;
        return (
            DisplayComponent
                ? <DisplayComponent {...props} />
                : (
                    <div>
                        Sheriff Profile Plugin: DisplayComponent not set
                    </div>
                )
        );
    }
    renderFormFields(props: SheriffProfilePluginProps & T): React.ReactNode {
        const { FormComponent } = this;
        return (
            FormComponent && <FormComponent {...props} />
        );
    }
    async update(sheriffId: IdType, formValues: any): Promise<T | void> {
        // Does nothing
    }
    async create(sheriffId: IdType, formValues: any): Promise<T | void> {
        // Does nothing
    }
    getData(sheriffId: IdType, state: RootState): T | undefined {
        // Does nothing
        return undefined;
    }
}

export abstract class SheriffProfileSectionPlugin<T> extends SheriffProfilePluginBase<T>{
    abstract get title(): string;
}
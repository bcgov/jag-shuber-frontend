import * as React from 'react';
import { IdType } from '../../api/Api';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';


export interface SheriffProfilePluginProps {
    sheriffId: IdType;
}

export interface SheriffProfilePlugin {
    renderDisplay(props: SheriffProfilePluginProps): React.ReactElement<SheriffProfilePluginProps>;
    renderFormFields(props: SheriffProfilePluginProps): React.ReactElement<SheriffProfilePluginProps>;
    onUpdate(formValues: any): void;
    onCreate(formValues: any): void;
}

export abstract class SheriffProfilePluginBase implements SheriffProfilePlugin {
    DisplayComponent?: React.ReactType<SheriffProfilePluginProps>;
    FormFieldComponent?: React.ReactType<SheriffProfilePluginProps>;
    renderDisplay({ sheriffId }: SheriffProfilePluginProps): React.ReactElement<SheriffProfilePluginProps> {
        const { DisplayComponent } = this;
        return (
            DisplayComponent
                ? <DisplayComponent sheriffId={sheriffId} />
                : (
                    <div>
                        Sheriff Profile Plugin: DisplayComponent not set
                    </div>
                )
        );
    }
    renderFormFields({ sheriffId }: SheriffProfilePluginProps): React.ReactElement<SheriffProfilePluginProps> {
        const { FormFieldComponent } = this;
        return (
            FormFieldComponent
                ? <FormFieldComponent sheriffId={sheriffId} />
                : (
                    <div>
                        Sheriff Profile Plugin: FormFieldComponent not set.
                    </div>
                )
        );
    }
    abstract onUpdate(formValues: any): void;
    abstract onCreate(formValues: any): void;
}

export abstract class SheriffProfileSectionPlugin extends SheriffProfilePluginBase {
    title: string = 'Untitled Profile Section';
    isInitiallyCollapsed: boolean = false;

    renderDisplay(props: SheriffProfilePluginProps): React.ReactElement<SheriffProfilePluginProps> {
        return (
            <CollapsibleSection sectionTitle={this.title} isInitiallyCollapsed={this.isInitiallyCollapsed}>
                {super.renderDisplay(props)}
            </CollapsibleSection>
        );
    }
    renderFormFields(props: SheriffProfilePluginProps): React.ReactElement<SheriffProfilePluginProps> {
        return (
            <CollapsibleSection sectionTitle={this.title} isInitiallyCollapsed={this.isInitiallyCollapsed}>
                {super.renderFormFields(props)}
            </CollapsibleSection>
        );
    }
    abstract onUpdate(formValues: any): void;
    abstract onCreate(formValues: any): void;
}
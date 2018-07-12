import React from 'react';
import { Sheriff } from '../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../components/SheriffProfile/SheriffProfilePlugin';
import SheriffDisplay from './SheriffDisplay';
import { Table } from 'react-bootstrap';
import SheriffRankDisplay from './SheriffRankDisplay';
import { Field } from 'redux-form';
import TextField from '../components/FormElements/TextField';
import * as Validators from '../infrastructure/Validators';
import CourthouseSheriffRankCodeSelector from './CourthouseSheriffRankCodeSelector';
import SelectorField from '../components/FormElements/SelectorField';
import { GenderSelector } from './GenderSelector';

export default class SheriffProfilePluginId extends SheriffProfileSectionPlugin<Sheriff> {
    name = 'identification';
    formFieldNames = {
        firstName: 'sheriff.firstName',
        lastName: 'sheriff.lastName',
        rankCode: 'sheriff.rankCode',
        badgeNo: 'sheriff.badgeNo',
        alias: 'sheriff.alias',
        gender: 'sheriff.gender'
    };
    title: string = 'Identification';
    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                rankCode = '',
                badgeNo = '',
                alias = undefined,
                gender = undefined
            } = {} }) =>
                (
                    <Table responsive={true} >
                        <tbody>
                            <tr>
                                <td><strong>Rank</strong></td>
                                <td><SheriffRankDisplay code={rankCode} /></td>
                            </tr>
                            <tr>
                                <td><strong>Badge No</strong></td>
                                <td>{badgeNo}</td>
                            </tr>
                            <tr>
                                <td><strong>Alias</strong></td>
                                <td>{alias ? alias : '-'}</td>
                            </tr>
                            <tr>
                                <td><strong>Gender</strong></td>
                                <td>{gender ? gender : '-'}</td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }
        />
    )

    FormComponent = (props: SheriffProfilePluginProps) => (
        <div>
            <Field
                name={this.formFieldNames.firstName}
                component={TextField as any}
                label="First Name"
                validate={[Validators.required]}
            />
            <Field
                name={this.formFieldNames.lastName}
                component={TextField as any}
                label="Last Name"
                validate={[Validators.required]}
            />
            <Field
                name={this.formFieldNames.rankCode}
                component={
                    (p) => <SelectorField 
                        {...p} 
                        SelectorComponent={
                            (sp) => <CourthouseSheriffRankCodeSelector {...sp} />}  
                    /> }
                label="Rank"
                validate={[Validators.required]}
            />
            <Field
                name={this.formFieldNames.badgeNo}
                component={TextField as any}
                label="Badge Number"
                validate={[Validators.required]}
            />
            <Field
                name={this.formFieldNames.alias}
                component={TextField as any}
                label="Alias"
            />
            <Field
                name={this.formFieldNames.gender}
                component={
                    (p) => <SelectorField 
                        {...p} 
                        SelectorComponent={
                            (sp) => <GenderSelector {...sp} />}  
                    /> }
                label="Gender"
                validate={[Validators.required]}
            />
        </div>
    )
}
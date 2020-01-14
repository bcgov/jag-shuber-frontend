import React from 'react';
import { Sheriff } from '../api/Api';
import {
    SheriffProfilePluginProps,
    SheriffProfileSectionPlugin
} from '../components/SheriffProfile/SheriffProfilePlugin';
import SheriffDisplay from './SheriffDisplay';
import { Table, Row, Col } from 'react-bootstrap';
import SheriffRankDisplay from './SheriffRankDisplay';
import { Field } from 'redux-form';
import TextField from '../components/FormElements/TextField';
import * as Validators from '../infrastructure/Validators';
import SheriffRankCodeSelector from './SheriffRankCodeSelector';
import SelectorField from '../components/FormElements/SelectorField';
import GenderSelector from './GenderSelector';
import GenderCodeDisplay from './GenderCodeDisplay';
import ToggleField from '../components/FormElements/ToggleField';

export default class SheriffProfilePluginId extends SheriffProfileSectionPlugin<Sheriff> {
    name = 'identification';
    formFieldNames = {
        firstName: 'sheriff.firstName',
        lastName: 'sheriff.lastName',
        rankCode: 'sheriff.rankCode',
        badgeNo: 'sheriff.badgeNo',
        // alias: 'sheriff.alias', // Unused ref, just replace with displayName
        alias: 'sheriff.user.displayName',
        genderCode: 'sheriff.genderCode',
        isSheriff: 'sheriff.isSheriff',
        userAuthId: 'sheriff.user.userAuthId',
        siteminderId: 'sheriff.user.siteminderId'
    };
    title: string = 'Identification';
    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <SheriffDisplay
            sheriffId={sheriffId}
            RenderComponent={({ sheriff: {
                rankCode = '',
                badgeNo = '',
                alias = undefined,
                genderCode = undefined
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
                                <td><GenderCodeDisplay code={genderCode}/></td>
                            </tr>
                        </tbody>
                    </Table>
                )
            }
        />
    )

    FormComponent = (props: SheriffProfilePluginProps) => (
        <div>
            <div className="container-fluid" style={{ margin: '15px 0', paddingLeft: '0', paddingRight: '0' }}>
                <fieldset className="with-border" style={{ background: '#fefefe' }}>
                    <Row>
                        <Col xs={12} lg={6}>
                            <Field
                                name={this.formFieldNames.userAuthId}
                                component={TextField as any}
                                label="IDIR Username"
                                validate={[Validators.required]}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <Field
                                name={this.formFieldNames.siteminderId}
                                component={TextField as any}
                                label="Siteminder ID"
                                validate={[Validators.required]}
                            />
                        </Col>
                    </Row>
                </fieldset>
            </div>
            <div className="container-fluid">
                {/* <Row>
                    <Col xs={12}>
                        <Field
                            name={this.formFieldNames.alias}
                            component={TextField as any}
                            label="Display Name"
                        />
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={12} lg={6}>
                        <Field
                            name={this.formFieldNames.firstName}
                            component={TextField as any}
                            label="First Name"
                            validate={[Validators.required]}
                        />
                    </Col>
                    <Col xs={12} lg={6}>
                        <Field
                            name={this.formFieldNames.lastName}
                            component={TextField as any}
                            label="Last Name"
                            validate={[Validators.required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Field
                            name={this.formFieldNames.genderCode}
                            component={
                                (p) => <SelectorField
                                    {...p}
                                    SelectorComponent={
                                        (sp) => <GenderSelector {...sp} />}
                                /> }
                            label="Gender"
                        />
                    </Col>
                </Row>
                {/* <Row>
                    <Col xs={12} className="vert-center-with-label">
                        <Field
                            name={this.formFieldNames.isSheriff}
                            component={ToggleField as any}
                            label="Is Sheriff"
                        />
                    </Col>
                </Row> */}
            </div>
            <div className="container-fluid" style={{ margin: '15px 0', paddingLeft: '0', paddingRight: '0' }}>
                <fieldset className="with-border" style={{ background: '#fefefe' }}>
                    {/* Double up the rows to equalize the margins */}
                    <Row>
                        <Col xs={12} lg={6}>
                            <Field
                                name={this.formFieldNames.badgeNo}
                                component={TextField as any}
                                label="Badge Number"
                                validate={[Validators.required]}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <Field
                                name={this.formFieldNames.rankCode}
                                component={
                                    (p) => <SelectorField
                                        {...p}
                                        SelectorComponent={
                                            (sp) => <SheriffRankCodeSelector {...sp} />}
                                    /> }
                                label="Rank"
                                validate={[Validators.required]}
                            />
                        </Col>
                    </Row>
                </fieldset>
            </div>
        </div>
    )
}

import React from 'react';
import {Col, Row} from "antd";
import {AppSetting} from "./AppSetting";
import {ProfileSetting} from "./ProfileSetting";
import {RuleSetting} from "./RuleSetting";
export const Setting = () => {
    return (
        <Row gutter={24}>
            <Col lg={12} md={24} style={{marginBottom: "24px"}}>
                <AppSetting/>
            </Col>
            <Col lg={12} md={24} style={{marginBottom: "24px"}}>
                <ProfileSetting/>
            </Col>
            <Col lg={24} md={24} style={{marginBottom: "24px"}}>
                <RuleSetting/>
            </Col>
        </Row>
    );
};
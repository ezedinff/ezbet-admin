import React from 'react';
import './index.less';
import {Card} from 'antd';
import { Icon as LegacyIcon } from '@ant-design/compatible'
import CountUp from 'react-countup';
// @ts-ignore
export const Board = ({key, icon, title, number, color}) => {
    return (
        <Card
            className={"numberCard"}
            bordered={false}
            key={key}
        >
            <LegacyIcon type={icon} className={"iconWarp"} style={{color}}/>
            <div className={"card-content"}>
                <p className={"title"}>{title || 'No Title'}</p>
                <p className={"number"}>
                    <CountUp
                        start={0}
                        end={number}
                        duration={2.75}
                        useEasing
                        separator=","
                        {...( {})}
                    />
                </p>
            </div>
        </Card>
    );
};
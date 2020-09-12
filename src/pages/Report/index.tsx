import React, { useEffect } from 'react';
import { DataTable } from '../../components/DataTable';
import { reportColumns, reportFilterForm } from './data';
import { useLazyQuery } from '@apollo/react-hooks';
import { REPORT } from '../../shared/graphql/report.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { Button } from 'antd';
import {PrinterFilled} from '@ant-design/icons';
export const Report = () => {
    const [getReport, {data, loading, error}] = useLazyQuery(REPORT);
    useEffect(() => {
        getReport();
    }, [])
    const onFilter = (values: any) => {
        console.log(values);
        if(values.range.length === 2){
            getReport(
                {
                    variables: {
                        from: values.range[0].format(),
                        to: values.range[1].format()
                    }
                }
            )
        }
    }
    return loading || !data ? <FullPageLoader/> : (
        <DataTable
            title={"Monthly Report"}
            formElements={reportFilterForm}
            onSubmit={onFilter}
            columns={reportColumns}
            data={data.report}
            extras={
                <Button><PrinterFilled translate/></Button>
            }
            updateFn={() => {}}
        />
    )
};
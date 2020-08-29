import React, { useEffect } from 'react';
import { DataTable } from '../../components/DataTable';
import { reportColumns } from './data';
import { useLazyQuery } from '@apollo/react-hooks';
import { REPORT } from '../../shared/graphql/report.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
export const Report = () => {
    const [getReport, {data, loading, error}] = useLazyQuery(REPORT);
    useEffect(() => {
        getReport();
    }, [])
    return loading || !data ? <FullPageLoader/> : (
        <DataTable
            title={"Monthly Report"}
            columns={reportColumns}
            data={data.report}
            updateFn={() => {}}
        />
    )
};
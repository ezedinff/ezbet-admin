import React from 'react';
import './index.less';
export function Page(props: { loading?: boolean; children?: any; classname: string }) {
    const {loading = false, children, classname} = props;
    const loadingStyle = {
        height: 'calc(100vh - 184px)',
        overflow: 'hidden',
    };
    return (
        <div
            className={classname}
        style={loading ? loadingStyle : undefined}
        >
            {children}
        </div>
    );
}
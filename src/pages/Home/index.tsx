import React, {Suspense} from 'react';
import {FullPageLoader} from "../../components/Loaders/FullPageLoader";
import Login from "../../components/Login";

export default function() {
    return (
        <Suspense fallback={<FullPageLoader />}>
            <Login/>
        </Suspense>
    );
};
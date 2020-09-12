import React from 'react';

import { useParams } from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks'

import { FullPageLoader } from '../../../components/Loaders/FullPageLoader';
import UserForm from '../UserForm'
import { USER} from '../../../shared/graphql/user.gql'



const UserEdit: React.FC = () => {
    const {id} = useParams()
    const mode = id === '0' ? 'CREATE' : 'EDIT'
    
    const {loading, data, error} = useQuery(USER, {variables: {id}, skip: mode === 'CREATE'} )

    if(mode === 'CREATE'){
        return <UserForm mode={mode} />
    }

    if(loading){
        return <FullPageLoader/>
    }
    if(error){
        return <h3>Error</h3>
    }
    return (
        <UserForm mode={mode} data={data.user} />
    );
    
}
export default UserEdit;

import React, { Component, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface Props {
    onLogout: () => void
}

interface IExtraDispatchArguments {

}

interface IStoreState {

}

const logout: React.FC<Props> = props => {
    const { onLogout } = props
    useEffect(() => {
        props.onLogout();
    }, [onLogout])
    return <Redirect to="/" />;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, IExtraDispatchArguments, AnyAction>) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(logout);
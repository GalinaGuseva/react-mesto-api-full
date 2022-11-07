import React from 'react';
import EnterForm from './EnterForm';

export default function Login(props) {

    return (
        <div className="page">
            <EnterForm
                name="login"
                onSubmit={props.onLogin}
                title="Вход"
                buttonTitle="Войти"               
            />
        </div>
    )
}


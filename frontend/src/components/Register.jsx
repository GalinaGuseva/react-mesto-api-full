import React from 'react';
import EnterForm from './EnterForm';

export default function Register(props) {

    return (
        <div className='register'>
            <EnterForm
                name='register'
                onSubmit={props.onRegister}
                title='Регистрация'
                buttonTitle='Зарегистрироваться'
                regText='Уже зарегистрированы? '
                regLink = 'Войти'
            />            
        </div>
    );
} 
import React from 'react';

export default function Home(){
    return(
        <div>
            <a href={process.env.REACT_APP_LOGIN}>
        <button>Login</button>
            </a>
        </div>
    )
}
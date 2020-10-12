import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1>
                        <Link to='/'>Noteful</Link>
                    </h1>
                </header>
            </div>
        )
    }
}

export default Header;
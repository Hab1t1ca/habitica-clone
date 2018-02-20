import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export default function Nav() {
    return (
    <div>
        <Link to='/dashboard'><span>Dashboard</span></Link>
        <Link to='/inventory'><span>Inventory</span></Link>
        <Link to='/shop'><span>Shop</span></Link>
    </div>
    )
}
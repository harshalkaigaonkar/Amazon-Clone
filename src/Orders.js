import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'
import { Link, useHistory } from 'react-router-dom';

function Orders() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }

    }, [user])

    return (
        <div className='orders'>
            <div className='orders_order'>
                {user ?
                    <>
                        <h1>Your Orders</h1>
                        {orders.map(order => (
                            <Order order={order} />
                        ))}
                    </>

                    : (
                        <div className='orders_NotAvailible'>
                            <h2>Currently No Orders Placed</h2>
                            <Link to='/'>
                                <button className='orders_homePageButton'>Back to Home Page</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Orders;
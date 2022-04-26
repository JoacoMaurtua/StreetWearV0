import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';


const OrderListScreen = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
  useEffect(() => { 
    if(userInfo && userInfo.isAdmin){ //esta estructura condicional es para impedir el acceso manual a la lista de usuarios
      dispatch(listOrders())
    }else{
      history.push('/login')
    }
  }, [dispatch, userInfo ,history]);


  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                      order.paidAt.substring(0,10)) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  {order.isDeliveredAt ? (
                      order.deliveredAt.substring(0,10)) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant ='light' className="btn-sm">
                      Details
                    </Button>
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;

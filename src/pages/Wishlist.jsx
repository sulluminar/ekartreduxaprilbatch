import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';

function Wishlist() {
    const wishlistItems = useSelector((state) => state.wishlistReducer);
    console.log("whislist items in wishlist page=====");
    console.log(wishlistItems)
    const dispatch = useDispatch()
    const handleWishlist = (item)=>{
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item.id))
    }
    return (
        <>
            <button className='btn btn-success mt-4 ms-4'>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                    <i class="fa-solid fa-arrow-left me-2"></i>
                    BACK TO HOME
                </Link>
            </button>

            <Row className='m-5'>
                {
                    wishlistItems?.length > 0 ?
                        wishlistItems.map((item) => (
                            <Col sm={12} md={6} lg={4} xl={3} className='mb-3'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.image} height={'200px'} className='p-3' />
                                    <Card.Body>
                                        <Card.Title>{item.title.slice(0, 20)}...</Card.Title>
                                        <Card.Text>
                                            <p>{item.description.slice(0, 50)}...</p>
                                            <p className='fw-bolder'>Price: &#x20B9; {item.price}</p>
                                        </Card.Text>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <Button variant="outline-danger" onClick={() => dispatch(removeFromWishlist(item.id))}>
                                                <i class="fa-solid fa-trash"></i></Button>
                                            <Button variant="outline-success"  onClick={()=>handleWishlist(item)}><i class="fa-solid fa-cart-shopping"></i></Button>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                        :
                        <div style={{height:'100vh'}} className='d-flex align-items-center flex-column'>
                            <img src="https://www.pngitem.com/pimgs/m/480-4803503_your-cart-is-currently-empty-empty-cart-icon.png"
                            height='300px' alt="" />
                            <h3 className='text-danger fw-bolder'>Your Cart Is Empty</h3>
                        </div>
                }

            </Row>
        </>
    )
}

export default Wishlist
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

export default function DetailProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState([]);
  const [product, setProduct] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={15} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width=" 400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"> </i>
          </p>
          <h3 className="display-6 fw-bold my-4"> ${product.price}</h3>
          <p className="lead">{product.description}</p>
          <Link
            to="/"
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addCart(product)}
          >
            Add To Cart
          </Link>
          <Link to="/" className="btn btn-dark ms-2 px-4 py-2">
            Your Cart
          </Link>
        </div>
      </>
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`http://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProducts();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
}

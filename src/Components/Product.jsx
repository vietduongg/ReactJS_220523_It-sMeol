import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Product() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const setProduct = (nameKind) => {
    const updatedList = data.filter((x) => x.category === nameKind);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="button d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setProduct("jewelery")}
          >
            Jewelery Clothing
          </button>
        </div>
        {filter.map((product, index) => {
          return (
            <>
              <div className="col-md-3 mb-4 " key={index}>
                <div className="card h-100 text-center p-4 ">
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{product.title}</h5>
                    <p className="card-text">{product.price}</p>
                    {user.loggedIn === false ? (
                      <>
                        <Link
                          to={`/products/${product.id}`}
                          className="btn btn-outline-dark"
                        >
                          Please login fisrt
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/products/${product.id}`}
                          className="btn btn-outline-dark"
                        >
                          Detail Product
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}

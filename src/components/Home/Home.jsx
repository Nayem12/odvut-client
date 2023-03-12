import { useQuery } from "@tanstack/react-query";
import { Card, Pagination } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
// import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Product from "./Product";

const Home = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const {
    data: file,
    isLoading,
    refetch,
  } = useQuery(
    {
      queryKey: ["fetchedData"],
      queryFn: async () => {
        const res = await fetch(`https://taskey-server-nayem12.vercel.app/products?page=${page}&size=${size}&search=${search}`, {
          headers: {
            // authorization: bearer ${localStorage.getItem("accessToken")},
          },
        });
        const data = await res.json();
        // refetch();
        return data;
      },
    }
  );
  let products = file?.products
  let count = file?.count
  console.log(products)
  const handleDelete = id => {
    fetch(`https://taskey-server-nayem12.vercel.app/products/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // products(data)
        if (data.acknowledged) {
          refetch()
          toast(
            'Opps!',
            'Task Deleted Successfully',
            'success'
          )

        }
      })
      .catch(err => console.error(err))
  }
  if (isLoading) {
    return <Spinner />
  }
  const pages = Math.ceil(count / size);
  const handleSearch = () => {
    setSearch(searchRef.current.value);
  }
  return (
    <>

      <input className='border border-orange-400 py-2 px-4 rounded-md w-[200px]' ref={searchRef} type="text" />
      <button onClick={handleSearch}>Search</button>
      <div className="grid grid-cols-3 gap-4 w-[90%] m-auto mt-10">
        {
          products.map(product => <Product
            key={product._id}
            product={product}
            handleDelete={handleDelete}
            refetch={refetch}></Product>)
        }
      </div>
      {
        [...Array(pages).keys()].map(number => <button
          key={number}
          className={page === number ? 'px-3 py-1 rounded-md bg-white text-orange-600 mr-1' : 'px-3 py-1 rounded-md bg-blue-500 text-white mr-1'}
          onClick={() => setPage(number)}
        >
          {number + 1}
        </button>)
      }
      <select onChange={event => setSize(event.target.value)}>
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select></>
  );
};

export default Home;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Addtask = () => {
  const { register, formState: { errors }, handleSubmit, } = useForm();
  const imgkey = process.env.REACT_APP_imgkey;
  const handleAddProduct = data => {
    // console.log(data)
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imgkey}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          const product = {
            picture: imgData.data.url,
            name: data.productName,
            price: data.Price,

          }
          fetch('https://taskey-server-nayem12.vercel.app/item', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              // authorization: `bearer ${localStorage.getItem('setToken')}`
            },
            body: JSON.stringify(product)
          })
            .then(res => res.json())
            .then(result => {
              console.log(result);

              toast.success('product added successfully');
              // navigate('/')
            })
        }
      })

    // setLoading(true)

  }
  return (
    <section className='bg-whit h-[100vh]'>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="" htmlFor="Name">Name</label>
            <input id="Name" type="text" placeholder='Product Name' className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  dark:text-gray-600 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register("productName", { required: "Product Name is required" })} />
            {errors.productName && (
              <p className="text-red-500 font-semibold flex items-center gap-1 mt-1">
                {/* <FaTimes />	{errors.productName?.message} */}
              </p>
            )}
          </div>


          <div>
            <label className="" htmlFor="originalPrice">Price</label>
            <input id="originalPrice" placeholder='$Price' type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  dark:text-gray-600 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register("Price", { required: "Price is required", })} />
            {errors.originalPrice && (
              <p className="text-red-500 font-semibold flex items-center gap-1 mt-1">
                {/* <FaTimes />	{errors.originalPrice?.message} */}
              </p>
            )}
          </div>





          <div>
            <label className="block text-sm font-medium ">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 " stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="form-control w-full max-w-xs">
                  <label className="label"> <span className="label-text">Photo</span></label>
                  <input type="file" {...register("image", {
                    required: "Photo is Required"
                  })} className="input input-bordered w-full max-w-xs" />
                  {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 leading-5 items-center transition-colors duration-200 transhtmlForm bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
      </form>
    </section>
  );
};

export default Addtask;
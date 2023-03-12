import { Button, Card } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import UpdateTask from '../UpdateTask/UpdateTask';

const Product = ({ product, handleDelete, refetch }) => {
    const { _id, name, img, price } = product
    const [showEditTask, setShowEditTask] = useState(null)
    const editTask = (product) => {
        console.log(product)
        setShowEditTask(product)
    }
    return (
        <div>

            <div className="max-w-sm">
                <Card
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={img}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>{name}</p>
                        <p>Price: ${price}</p>
                    </h5>
                    <Button onClick={() => handleDelete(product._id)} color="failure">Delete Task</Button>
                    <button onClick={() => editTask(product)}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Update Task
                    </button>
                </Card>

            </div>
            {showEditTask && <UpdateTask task={showEditTask} setShowEditTask={setShowEditTask} refetch={refetch} />}
        </div>
    );
};

export default Product;
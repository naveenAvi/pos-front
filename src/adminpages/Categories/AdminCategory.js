import React, { useEffect, useState } from 'react'
import AdminNavBar from '../components/AdminNavBar'
import './../Admin.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import EmptyContent from '../../utils/EmptyContent';
import AddCategories from './AddCategories';
import { DeleteButton, UpdateButton } from '../../utils/Buttons';

export default function AdminCategory() {
    const [addcategories, setaddcategories] = useState({ display: false })
    const [categories, setCategories] = useState(null);
    const CategoryEmpt = EmptyContent(categories)
    const [loadingBTN, setloadingBTN] = useState({ delete: true, loadingID: null })


    const handleEdit = (category) => {
        setaddcategories({ display: true, editing: category });
    };

    const handleDelete = async (categoryId) => {
        setloadingBTN({ delete: true, loadingID: categoryId })

        try {
            await axios.delete(`http://localhost:8080/api/v1/categories?id=${categoryId}`);
            const updatedCategories = categories.filter((category) => category.categoryId !== categoryId);
            setCategories(updatedCategories);
            setloadingBTN({ delete: false, loadingID: categoryId })

        } catch (error) {
            setloadingBTN({ delete: false, loadingID: categoryId })

            if (error.response.status === 401) {
                navigate('/admin/login');
            }
        }
    };

    useEffect(() => {
        getCategories();
    }, [])

    const navigate = useNavigate();


    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/categories");
            setCategories(response.data.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }

    return (
        <div>
            <AdminNavBar />
            <div className='container-md bg-white d-flex flex-column align-items-center'>
                <Card className='border-none' style={{ border: "none", width: "100%" }}>
                    <Row className='d-flex flex-column align-items-center mt-4'>
                        <div className='col-md-8 px-4' style={{ backgroundColor: "black", color: 'white', padding: "10px", borderRadius: "5px" }}>
                            <div className='d-flex flex-row ' style={{ justifyContent: "space-between" }}>
                                <h3>Categories</h3>
                                <div>
                                    <Button onClick={() => setaddcategories({ display: true })}>+ Add category</Button>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Card>
                <div className='col-md-9 mt-4'>
                    {categories && categories.length > 0 && (
                        <Table className="category-table">
                            <colgroup>
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '50%' }} />
                                <col style={{ width: '30%' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>ID</th>
                                    <th style={{ textAlign: 'center' }}>Name</th>
                                    <th style={{ textAlign: 'center' }}>Dscription</th>
                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.categoryId}>
                                        <td>{category.categoryId}</td>
                                        <td>
                                            {category.category}
                                        </td>
                                        <td>
                                            {category.description}
                                        </td>
                                        <td>
                                            <UpdateButton onClick={handleEdit} item={category} />
                                            <DeleteButton
                                                shouldLoad={loadingBTN.loadingID === category.categoryId}
                                                loadingBTN={loadingBTN}
                                                onClick={handleDelete}
                                                item={category.categoryId} />
                                            <button className="delete-btn" onClick={() => handleDelete(category.categoryId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
                {EmptyContent(categories)}
                {/* <div className="admin-category-container">
                    <form onSubmit={createCategory}>
                        <h2>Create a new Category</h2>
                        <label htmlFor="categoryName">Category Name:</label>
                        <input type="text" onChange={(e) => { setNewCategory(e.target.value) }} required />

                        <button type="submit">Create Category</button>
                    </form>
                </div> */}


            </div>
            <AddCategories categories={categories} setCategories={setCategories} addcategories={addcategories} setaddcategories={setaddcategories} />
        </div>
    )
}
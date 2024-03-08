import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { updateState } from '../../utils/OtherUtils';
const categorytypes = ["FRUIT",
    "VEGETABLE",
    "MILK_POWER",
    "FURNITURE",
    "ELECTRONIC",
    "FISH",
    "MEAT"]

export default function AddCategories({ addcategories, setaddcategories, setCategories, categories }) {
    const [categoryDescription, setcategoryDescription] = useState("");
    const [CategoryType, setCategoryType] = useState("");

    const update = async (e) => {
        axios.put(`http://localhost:8080/api/v1/categories?id=${addcategories.editing.categoryId}`, {
            description: categoryDescription,
            category: CategoryType
        }).then(function (response) {
            setaddcategories({ display: false })
            const updatedCategories = categories.map((category) =>
                category.categoryId === addcategories.editing.categoryId ? {
                    ...category,
                    category: CategoryType,
                    description: categoryDescription
                } : category
            );
            setCategories(updatedCategories)

        }).catch(function (error) {
            console.log(error);
        });

    }
    const createCategory = async (e) => {
        axios.post('http://localhost:8080/api/v1/categories', {
            description: categoryDescription,
            category: CategoryType
        }).then(function (response) {
            setaddcategories({ display: false })
            setCategories([...categories, {
                id: response.data.categoryId,
                category: CategoryType,
                description: categoryDescription
            }])

        }).catch(function (error) {
                console.log(error);
            });
    }

    const handleSUbmit = (e) => {
        e.preventDefault();
        if (addcategories.editing) {
            update()
            return
        } else {
            createCategory()
            return
        }
    }
    useEffect(() => {
        if (addcategories.editing) {
            setcategoryDescription(
                addcategories.editing.description
            )
            setCategoryType(
                addcategories.editing.category
            )
        } else {
            setcategoryDescription("")
        }
    }, [addcategories])

    const hidemodal = () => {
        setaddcategories({ display: false })
    }

    return (
        <Modal show={addcategories.display} onHide={hidemodal}>
            <form onSubmit={handleSUbmit} >
                <Modal.Header closeButton>
                    <Modal.Title>Create a new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="categoryName">Category Type:</label>
                    <select className='form-select' value={CategoryType} onChange={(e) => { setCategoryType(e.target.value) }}>
                        {categorytypes.map(item =>
                            <option value={item}>{item}</option>
                        )}
                    </select>

                    <label htmlFor="categoryName">Category Description:</label>
                    <input value={categoryDescription} className='form-control' type="text" onChange={(e) => { setcategoryDescription(e.target.value) }} required />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-secondary" onClick={hidemodal}>Close</button>
                    <button type="submit" class="btn btn-primary"> {addcategories.editing ? "update category" : " Create category"}</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

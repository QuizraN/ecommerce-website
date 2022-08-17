import "../components/CreateProduct.css"
import {useFormik} from "formik"

export const CreateProduct = ()=>{
    const formik = useFormik({
        initialValues:{
            name:"",
            description:"",
            category:"",
            quantity:0,
            price:0,
            image:"",
            variants:{},
        }
    })
    
    return (
        <div className = "create-product">
                  <form className = "create-product" onSubmit = {formik.handleSubmit}>
                    <label htmlFor = "name">Name :</label>
                    <input type = "text" id = "name" name = "name" placeholder = "Enter Name of the product" required onChange= {formik.handleChange} value= {formik.values.name}></input>
                    <label htmlFor = "description">Description :</label>
                    <input type = "text" id = "description" name = "description" placeholder = "Enter description of the product" required onChange= {formik.handleChange} value= {formik.values.description}></input>
                    <label htmlFor = "category">Category :</label>
                    <input type = "text" id="category" name = "category" placeholder = "Enter category" required onChange= {formik.handleChange} value= {formik.values.category}></input>
                    <label htmlFor = "quantity">Quantity :</label>
                    <input type = "text" id="quantity" name = "quantity" placeholder = "Enter quantity" required onChange= {formik.handleChange} value= {formik.values.quantity}></input>
                    <label htmlFor = "price">Price :</label>
                    <input type = "text" id="price" name = "price" placeholder="Enter price" required onChange= {formik.handleChange} value= {formik.values.price}></input>
        
                    <label htmlFor = "image">Image :</label>
                    <input type = "text" id = "image" name = "image" placeholder = "Enter image url" required onChange= {formik.handleChange} value= {formik.values.image}></input>
                    
                    <button id="btn" className="btnsubmit" style={{width:100}} >Add Variant</button>
                   <div></div>
                    <button id="btn" className="btnsubmit" type="submit">Submit</button>
                  </form>
        </div>
    )
}
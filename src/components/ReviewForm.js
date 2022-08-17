import "../components/ReviewForm.css"
import {useFormik} from "formik"
import axios from "axios";
import {useMutation} from "react-query" //to create | update | delete data
import {useQueryClient} from "react-query"

export const ReviewForm = (id)=>{

    const queryClient = useQueryClient()
    const data=useMutation(i=>{
        return axios.post(`https://reactapisforproducts.herokuapp.com/api/products/${id.id}/reviews/create`,i)
    })
    const idd=id.id;

    const formik=useFormik({
        initialValues:{
            name:"",
            rating:"",
            review:""
        },
        onSubmit:values=>{
            const count =+ values.rating;

           data.mutate({"name": values.name,"rating":count,"review": values.review,"product_id": {idd}},{onSuccess:async ()=>{ await queryClient.refetchQueries(['review', 1]);}});
           
           values.name = "";
           values.rating = "";
           values.review = "";
        }
    })
    return (
        <div className = "review-from">
                  <form className = "review-from" onSubmit = {formik.handleSubmit}>
                    <label htmlFor = "name">Name :</label>
                    <input type = "text" id = "name" name = "name" placeholder = "Enter Name" required onChange = {formik.handleChange} value = {formik.values.name}></input>
                    <label htmlFor = "rating">Rating :</label>
                    <input type = "text" id = "rating" name = "rating" placeholder = "Enter (1-5)" required onChange = {formik.handleChange} value = {formik.values.rating}></input>
                    <label htmlFor = "review">Review :</label>
                    <input type = "text" id = "review" name = "review" placeholder = "Enter Review" required onChange = {formik.handleChange} value = {formik.values.review}></input>
                    <button id = "btn" className = "btnsubmit" type = "submit">Submit</button>
                  </form>
        </div>
    )
}
import "../components/ReviewForm.css"
import {useFormik} from "formik"
import axios from "axios";
import {useMutation} from "react-query" //to create | update | delete data

//export const useSubmitReview=(id,values)=>{
//   return useMutation(
//        ()=>axios.post(`https://obscure-refuge-62167.herokuapp.com/products/${id}/reviews`,values)
//    )
//}
export const ReviewForm=(id)=>{
   // console.log("HELLOID",id.id)
    const data=useMutation(newReview=>{
        return axios.post(`https://obscure-refuge-62167.herokuapp.com/products/${id.id}/reviews`,newReview)
    })
//<useSubmitReview id={pid.pid} values={values}/>
    const formik=useFormik({
        initialValues:{
            name:"",
            rating:"",
            review:""
        },
        onSubmit:values=>{
            const count=+values.rating;

           data.mutate({"name": values.name,"rating":count,"review": values.review,"product_id": {id}},{onSuccess:()=>{ alert('Review Added!');}})
         
          //console.log("IDDD",pid.pid)
          
          console.log("values................",values)
        }
    })
    //console.log(formik.values)
    console.log("id............",id)
    //console.log("pid",pid)
    
    return (
        <div className="review-from">
                  <form className="review-from" onSubmit={formik.handleSubmit}>
                    <lable htmlFor="name">Name :</lable>
                    <input type="text" id="name" name="name" placeholder="Enter Name" required onChange={formik.handleChange} value={formik.values.name}></input>
                    <lable htmlFor="rating">Rating :</lable>
                    <input type="text" id="rating" name="rating" placeholder="(1-5)" required onChange={formik.handleChange} value={formik.values.rating}></input>
                    <lable htmlFor="review">Review :</lable>
                    <input type="text" id="review" name="review" placeholder="Enter Review" required onChange={formik.handleChange} value={formik.values.review}></input>
                    <button id="btn" className="btnsubmit" type="submit">Submit</button>
                  </form>
        </div>
    )
}
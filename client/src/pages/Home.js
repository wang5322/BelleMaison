import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import './Home.css';
import axios from "axios";
import Card from "../components/MDBCard";
import {useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Home() {

    let navigate = useNavigate();

    const initValue = {
        Pictures:{ imageUrl:""}
    }

    const [listOfProperties, setListOfProperties] = useState([initValue]);
    const [pageNumber, setPageNumber] = useState(0);
    const articlesPerPage = 5;
    const propertiesVisited = pageNumber * articlesPerPage;

    const displayProperties = listOfProperties
        .slice(propertiesVisited, propertiesVisited + articlesPerPage)
        .map((property, key)=>{
        if (Array.isArray(property.Pictures) && property.Pictures.length > 0) {
       //     // Access the first picture's imageUrl
            const imageUrl = property.Pictures[0].imageUrl;
            return(
               <>
               <Card key={key} img={imageUrl} address={property.address} city={property.city} type={property.type}
                   bedrooms={property.bedrooms} bathrooms={property.bathrooms}
                   year_built={property.year_built} price={property.price} features={property.features} />
               </>
        )}else{
            return(
               <>
               <Card key={key} img={'notFound'} address={property.address} city={property.city} type={property.type}
                   bedrooms={property.bedrooms} bathrooms={property.bathrooms}
                   year_built={property.year_built} price={property.price} features={property.features} />
               </>
           )
           }
       }
    )

    const pageCount = Math.ceil(listOfProperties.length / articlesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(()=>{
        axios.get("http://localhost:3005/api/properties")
        .then((response)=>{
            setListOfProperties(response.data);
        })
        .catch((err)=>{
            if(err.response.data.status!==404){
                alert("no records found!");
                return
            }
        })
    },[]);

    return (
        <>
            <div>
                <div className='p-5 text-center bg-image'
                    style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')",
                    // style={{ backgroundImage: "url('../images/heroImage.jpg')",
                        height: 400 ,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'}}>
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className='text-white mb-5'>
                                <h1 className='mt-5'>{listOfProperties.length} properties in Quebec</h1>
                                <SearchBar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-5 '>
                <h2>Newest list: </h2>
                    <div className="card-container">
                    {/* {listOfProperties.map((property, key)=>{
                         if (Array.isArray(property.Pictures) && property.Pictures.length > 0) {
                        //     // Access the first picture's imageUrl
                             const imageUrl = property.Pictures[0].imageUrl;
                             return(
                                <>
                                {console.log("1====imageurl=========",imageUrl)}
                                <Card img={imageUrl} address={property.address} city={property.city} type={property.type}
                                    bedrooms={property.bedrooms} bathrooms={property.bathrooms}
                                    year_built={property.year_built} price={property.price} features={property.features} />
                                </>
                         )}else{
                             return(
                                <>
                                {console.log("2====imageurl=========",property)}
                                <Card img={'notFound'} address={property.address} city={property.city} type={property.type}
                                    bedrooms={property.bedrooms} bathrooms={property.bathrooms}
                                    year_built={property.year_built} price={property.price} features={property.features} />
                                </>
                            )
                            }
                        }
                    )} */}
                    {displayProperties}
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </>
    )
}
export default Home;
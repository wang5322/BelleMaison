import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import './Home.css';
import axios from "axios";
import Card from "../components/Card";

function Home() {

    const [listOfProperties, setListOfProperties] = useState([]);

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
                <div className='p-5 text-center bg-image img-fluid img-norepeat'
                    style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')",
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
                <h2>Newest list:</h2>
                {
                    listOfProperties.map((property, key)=>{
                        return(
                            <>
                            {/* <div key={key}>
                                <p>address: {property.address}</p>
                                <p>city: {property.city}</p>
                                <p>postal: {property.postal}</p>
                                <p>type: {property.type}</p>
                                <p>bathrooms: {property.bathrooms}</p>
                                <p>bedrooms: {property.bedrooms}</p>
                                <p>year_built: {property.year_built}</p>
                                <p>price: $ {property.price}</p>
                                <p>features: {property.features}</p>
                                <p>description: {property.description}</p>
                            </div><br></br> */}
                            <Card img={"img"} address={property.address} city={property.city} type={property.type}
                                 bedrooms={property.bedrooms} bathrooms={property.bathrooms}
                                  year_built={property.year_built} price={property.price} features={property.features} />
                            </>
                        )
                    }

                    )
                }
            </div>
        </>
    )
}
export default Home;
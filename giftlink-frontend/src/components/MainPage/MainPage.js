import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {urlConfig} from '../../config';
import "./MainPage.css";
function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Task 1: Write async fetch operation
       const fetchGifts = async () =>{
        try{
            const url = `${urlConfig.backendUrl}/api/gifts`;
            const response = await fetch(url);
            
            if(!response.ok){
                throw new Error(`There was an HTTP error: ${response.status}`);
            }
           const data = await response.json(); 
         
           setGifts(data);
        }catch(error){
            console.log("There was an error in the request" + error.message);
        }
       }
       fetchGifts();
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        // Write your code below this line
        navigate(`/app/product/${productId}`);
      };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        // Write your code below this line
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });

      };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container-customized">
        <div className="container pt-5 container-cards-customized">
            <div className="row ">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-lg-4 mb-4 col-md-">
                        <div className="card product-card">

                            {/* // Task 4: Display gift image or placeholder */}
                            {/* // Write your code below this line */}
                            <div className="image-placeholder">
                                 {gift.image ? (
                                     <img src={gift.image} alt={gift.name} className="card-img-top" />
                                         ) : (
                             <div className="no-image-available">No Image Available</div>
                                     )}
                            </div>
                            <div className="card-body">

                                {/* // Task 5: Display gift image or placeholder */}
                                {/* // Write your code below this line */}
                                     <h2 className="card-title">{gift.name}</h2>
                                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                {gift.condition}
                                </p>

                                {/* // Task 6: Display gift image or placeholder */}
                                {/* // Write your code below this line */}
                                <p className="card-text">{formatDate(gift.date_added)}</p>

                                <button onClick={() => goToDetailsPage(gift.id)} className="btn-customized">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default MainPage;

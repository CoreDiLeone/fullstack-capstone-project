import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {urlConfig} from '../../config';

function SearchPage() {

    //Task 1: Define state variables for the search query, age range, and search results.
    const [ searchQQuery, seSearchtQuery ] = useState("");
    const [ ageRange, setAgeRange ] = useState(6);
    const [ searchResults, setSearchResults ] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);


    // Task 2. Fetch search results from the API based on user inputs.
    const handleSearch = async () =>{

        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const queryParams = new URLSearchParams({ 
            name: searchQuery, 
            age_years: ageRange, 
            category: document.getElementById("categorySelect").value,
            condition: document.getElementById("conditionSelect").value }).toString();
        try{
          
            const url = `${baseUrl}${queryParams}`;
            console.log("This is the url for fetch data basend on queries:", url);
            const results = await fetch(url);
            
            if(!results.ok){
                throw new error(`There has been an error in the query: ${response.status}`);
            }

            const data = await results.json();
            setSearchResults(data);
        }catch(e){

            console.log("There was an error in the fetch:", e.message);
        }
    }
    handleSearch();

    
    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
    };




    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options.*/}
                            {/* Task 4: Implement an age range slider and display the selected value. */}
                        </div>
                    </div>
                    {/* Task 7: Add text input field for search criteria*/}
                    {/* Task 8: Implement search button with onClick event to trigger search:*/}
                    {/*Task 5: Display search results and handle empty results with a message. */}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;

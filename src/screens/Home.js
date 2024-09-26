import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
export default function Home() {
    let [search, setSearch] = useState('');
    let [foodItem, SetFoodItem] = useState([]);
    let [foodCat, SetFoodCat] = useState([]);

    const loadData = async () => {
        try {
            // Await the fetch call to ensure you get the resolved response
            let response = await fetch("https://foodquest-back.onrender.com/api/fooditems", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check if the response status is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Await the JSON conversion of the response
            let data = await response.json();

            SetFoodItem(data[0]);
            SetFoodCat(data[1]);
            // Log the first two items if they exist
            // console.log(data[0], data[1]);
        } catch (error) {
            // Handle any errors that occurred during fetch or JSON parsing
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2 text-white bg-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img height={800} width={500} src="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/82e46eb9feeba22bdc6e2641f77cab3b" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img style={{ filter: "brightness(30%)" }} height={800} width={500} src="https://img.etimg.com/thumb/width-300,height-300,imgsize-567550,resizemode-75,msid-108623023/top-trending-products/kitchen-dining/outdoor/best-barbeque-grills-under-1000/best-barbeque-grills.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img style={{ filter: "brightness(30%)" }} height={800} width={500} src="https://assets.winni.in/product/primary/2022/10/76180.jpeg?dpr=1&w=500" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {
                    foodCat.length > 0
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-5 mt-5'>
                                    <div key={data._id} className='fs-3 m3'>
                                        <h2>{data.CategoryName}</h2>
                                    </div>
                                    <hr />
                                    {
                                        foodItem.length > 0
                                            ? foodItem.filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLocaleLowerCase()))).
                                                map(filterItems => {
                                                    {
                                                        return (
                                                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                                {/* {filterItems.CategoryName} */}
                                                                <Card foodItem={filterItems}
                                                                    options={filterItems.options[0]}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })
                                            : <div> No such Data </div>
                                    }
                                </div>
                            );
                        })
                        : <div>No Categories Available</div>
                }

                {/* <Card /> */}
            </div>
            <div><Footer /></div>
        </div>
    )
}

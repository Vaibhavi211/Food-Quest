import React from 'react'

export default function Carousel() {
    return (
        <div><div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" id='carousel'>
                <div className='carousel-caption' style={{ zIndex: '10' }}>
                    <form className="d-flex">
                        <input className="form-control me-2 text-white bg-dark" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                    </form>
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
    )
}

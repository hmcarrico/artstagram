import React, { Component } from 'react';
import ImageFilter from 'react-image-filter';
import './FilterOptions.scss';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


const FilterOption = (props) => {
if(props.image){
    return (
        <div className="filter-container">
            {console.log(props.colors)}
            {console.log("IMAGE",props.image)}
            {/* //! REFACTOR TO MAKE LOOP */}
            <AliceCarousel mouseDragEnabled className="carousel">
                <div className="carousel">
                    <div>
                        <ImageFilter
                        image={props.image}
                        className="filter-picker"
                        onClick={() => props.changeFilter([1,0,0,0,0,0,1,0,0,0,0,.2,0,.2,0,.1,0,.4,0,0,0,0,1,0],)}
                        />
                        <h2>None</h2>
                    </div>
                    <div>
                        <ImageFilter
                        image={props.image}
                        filter={props.colors.oldTimes}
                        className="filter-picker"
                        onClick={() => props.changeFilter(props.colors.oldTimes)}
                        />
                        <h2>Old Times</h2>
                    </div>
                </div>
                <div className="carousel"> 
                    <div>
                        <ImageFilter
                        image={props.image}
                        filter={props.colors.coldLife}
                        className="filter-picker"
                        onClick={() => props.changeFilter(props.colors.coldLife)}
                        />
                        <h2>Cold Life</h2>
                    </div>
                    <div>
                        <ImageFilter
                        image={props.image}
                        filter={props.colors.septiam}
                        className="filter-picker"
                        onClick={() => props.changeFilter(props.colors.septiam)}
                        />
                        <h2>Septiam</h2>
                    </div>
                </div>
                <div className="carousel">
                <div>
                    <ImageFilter
                        image={props.image}
                        filter={props.colors.milk}
                        className="filter-picker"
                        onClick={() => props.changeFilter(props.colors.milk)}
                        />
                    <h2>Milk</h2>
                </div>
                <div>
                    <ImageFilter
                    image={props.image}
                    filter={props.colors.blackAndWhite}
                    className="filter-picker"
                    onClick={() => props.changeFilter(props.colors.blackAndWhite)}
                    />
                    <h2>Black & White</h2>
                </div>
                </div>
            </AliceCarousel>
        </div>
    )
} else {
    return <></>
}
}

export default FilterOption;
import React, { Component } from 'react';
import axios from 'axios';
import ImageFilter from 'react-image-filter';
// import { GithubPicker } from 'react-color';
import colors from './colors.json';
import FilterOptions from './FilterOptions';

class PostWizard extends Component{
    constructor(){
        super();
        this.state = {
            selectedFile: null,
            file: null,
            filter: [1,0,0,0,0,0,1,0,0,0,0,.2,0,.2,0,.1,0,.4,0,0,0,0,1,0],
            image: null
        }
    }

    submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file[0]);
        axios.post(`/api/test-upload`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
        }
        }).then(res => {
            console.log("ADDED!",res)
            const imgUrl = res.data.Location;
            this.setState({
                image: imgUrl
            })

        }).catch(error => {
            alert('fail')
        });
    }
    
    handleFileUpload = (event) => {
        this.setState({file: event.target.files});
    }


    handleFilter = (e) => {
        console.log(e.target.value)
        if(e.target.value === "invert" || e.target.value === "grayscale" || e.target.value === "sepia"){
            this.setState({
                filter: e.target.value
            })
        } else {
            this.setState({
                filter: e.target.value.split(",").map(elem => +elem)
            })
        }
    }

    changeFilter = (newFilter) => {
        this.setState({
            filter: newFilter
        })
    }

    render(){
        const { filter, image } = this.state;
        console.log(this.state)
        const chooseFilter = colors.map(colors => <FilterOptions changeFilter={this.changeFilter} colors={colors} image={image}/>)
        return (
            <div>
                <br /><br /><br /><br />
                <form onSubmit={this.submitFile}>
                    <input label='upload file' type='file' onChange={this.handleFileUpload} />
                    <button type='submit'>Send</button>
                </form>
                {
                    image ?
                    <ImageFilter
                        image={image}
                        filter={filter} 
                    />
                    :
                    <ImageFilter
                        image='https://source.unsplash.com/random/1200x800'
                    />
                }



                {chooseFilter}

                <select onChange={ this.handleFilter }>
                    <option default value="none">None</option>
                    <option value="invert">Invert</option>
                    <option value="grayscale">Grayscale</option>
                    <option value="sepia">Sepia</option>
                    <option value={colors[0].blackAndWhite}>Black & White</option>
                    <option value={colors[0].oldTimes}>Old Times</option>
                    <option value={colors[0].coldLife}>Cold Life</option>
                    <option value={colors[0].septiam}>Septiam</option>
                    <option value={colors[0].milk}>Milk</option>
                </select>
            </div>
        )
    }
}

export default PostWizard;
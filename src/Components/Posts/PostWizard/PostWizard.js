import React, { Component } from 'react'

class PostWizard extends Component{
    constructor(){
        super();
        this.state = {
            selectedFile: null
        }
    }

    fileSelectedHadler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append("image", this.state.selectedFile, this.state.selectedFile.name)
        console.log(fd)
    }

    render(){
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <input type="file" onChange={this.fileSelectedHadler}/>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        )
    }
}

export default PostWizard;
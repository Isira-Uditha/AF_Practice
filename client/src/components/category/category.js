import React, { Component } from "react";
import axios from "axios";

const initialState = {
    categories: [],
}

class Category extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:8085/category/')
            .then(response => {
                this.setState({ categories: response.data.data });
            })
    }

    navigateToVehicles(e, category_id){
        window.location = `/${category_id}`
    }

    render(){
        return (
            <div className="container">
                <h1>Courses</h1><br/>
                {this.state.categories.length > 0 && this.state.categories.map((item, index) => (
                    <div key={index} className="card mb-3" onClick={e => this.navigateToVehicles(e,item._id)}>
                        <div className="p-3">
                            <h5>Category: {item.category}</h5>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Category;
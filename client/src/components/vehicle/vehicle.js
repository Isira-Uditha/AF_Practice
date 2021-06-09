import React, { Component } from "react";
import axios from "axios";

const initialState = {
    vehicles: [],
}

class Vehicle extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:8085/vehicle/')
            .then(response => {
                this.setState({ vehicles: response.data.data });
                console.log(this.state.vehicles);

            })
    }


    render(){
        return (
            <div className="container">
                <h1>Vehicles</h1><br/>
                {this.state.vehicles.length > 0 && this.state.vehicles.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h3>Title: {item.title}</h3>
                            <h5>Model: {item.model}</h5>
                            <h5>Type: {item.type}</h5>
                            <h5>Name: {item.name}</h5>
                            <label style={{color:"red"}}>Categories</label>
                            {item.categories.length > 0 && item.categories.map((items, index) => (
                                <div key={index} className="mb-3 mt-2">
                                    <h6>{items.category}</h6>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}


export default Vehicle;
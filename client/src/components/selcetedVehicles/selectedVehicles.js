import React, { Component } from "react";
import axios from "axios";

const initialState = {
    data: [],
}

class SelectedVehicles extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get(`http://localhost:8085/category/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ data: response.data.data.vehicles });
                console.log(this.state.data);
            })

    }



    render(){
        return (
            <div className="container">
                <h2>Vehicles Related To the {this.state.data.category}</h2><br/>
                {this.state.data.length > 0 && this.state.data.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h3>Title: {item.title}</h3>
                            <h5>Model: {item.model}</h5>
                            <h5>Type: {item.type}</h5>
                            <h5>Name: {item.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default SelectedVehicles;
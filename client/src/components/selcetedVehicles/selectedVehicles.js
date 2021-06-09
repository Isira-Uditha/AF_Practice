import React, { Component } from "react";
import axios from "axios";

const initialState = {
    data: [],
    qty: 0,
    cost: 0,
    tit: '',
    x: 0,
}

class SelectedVehicles extends Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get(`http://localhost:8085/category/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ data: response.data.data.vehicles, tit : response.data.data.category });
                console.log(this.state.tit);
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    calculateTotal(e,title) {
        e.preventDefault();
        let calc = {
            qty: this.state.qty,
            title: this.state.tit,
            vehicle: `${title}`
        };
        console.log('DATA TO SEND', calc)
        axios.post('http://localhost:8085/category/calculate', calc)
            .then(response => {
                this.setState({ cost: response.data.cost });
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }



    render(){
        return (
            <div className="container">
                <h2>Vehicles Related To the {this.state.tit}</h2><br/>
                <form onSubmit={this.onSubmit} className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="qty" className="form-label" style={{color:"green"}}>Quantity</label>
                        <input
                            type="Number"
                            className="form-control"
                            id="qty"
                            name="qty"
                            value={this.state.qty}
                            onChange={this.onChange}
                        />
                    </div>
                </form>
                <div className="mb-3">
                    <label htmlFor="cost" className="form-label" style={{color:"blue"}}>Total Cost</label>
                    <input
                        type="Number"
                        className="form-control"
                        id="cost"
                        name="cost"
                        value={this.state.cost}
                        onChange={this.onChange}
                    />
                </div><br/>
                {this.state.data.length > 0 && this.state.data.map((item, index) => (
                    <div key={index} className="card mb-3">
                        <div className="p-3">
                            <h3>Title: {item.title}</h3>
                            <h5>Model: {item.model}</h5>
                            <h5>Type: {item.type}</h5>
                            <h5>Name: {item.name}</h5><br/>
                            <button type="submit" className="btn btn-primary" onClick={e => this.calculateTotal(e,item.title)}>Calculate</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default SelectedVehicles;
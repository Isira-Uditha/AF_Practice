import React, { Component } from "react";
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    title: '',
    model: '',
    passMark: '',
    type: '',
    name: '',
    options: [],
    categories: [],
}

class CreateVehicle extends Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:8085/category/')
            .then(response => {
                this.setState({ categories: response.data.data }, () => {
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.category
                        }
                        data.push(category)
                    });
                    this.setState({ options: data });
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] });
    }

    onSubmit(e) {
        e.preventDefault();
        let vehicle = {
            title: this.state.title,
            model: this.state.model,
            type: this.state.type,
            name: this.state.name,
            categories: this.state.selectedCategories
        };
        console.log('DATA TO SEND', vehicle)
        axios.post('http://localhost:8085/vehicle/create', vehicle)
            .then(response => {
                alert('Vehicle Data successfully inserted')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render(){
        return (
            <div className="container"><br/>
                <h2>Create Vehicles</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="model" className="form-label">Model</label>
                        <input
                            type="text"
                            className="form-control"
                            id="model"
                            name="model"
                            value={this.state.model}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Categories</label>
                    <Select
                        options={this.state.options}
                        onChange={this.onCategorySelect}
                        className="basic-multi-select"
                        isMulti
                    />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateVehicle;
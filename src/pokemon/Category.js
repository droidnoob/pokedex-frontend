import React, { Component } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import TextInput from "../common/TextInput";
import apiCall from "../common/apiCall";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories.map(c => {
        return {
          label: c.name,
          value: c.name
        };
      }),
      selectedCategory: "",
      newCategory: "",
      new: false
    };
  }

  onSelect = e => {
    this.setState({
      selectedCategory: e ? e.value : "",
      newCategory: ""
    });
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      newCategory: e.target.value,
      new: true
    });
    if (e.target.value.length === 0) {
      this.setState({
        new: false
      });
    }
  };

  onClick = () => {
    let data = {
      pokemons: this.props.pokemons
    };
    if (this.state.new) {
      data.name = this.state.newCategory;
      if (data.name.indexOf(" ") >= 0) {
        toast.error("Please enter category name without whitespaces");
        return;
      }
      apiCall(
        `/category`,
        "POST",
        data,
        () => {
            this.props.onCategorySave();
            toast.success(`Successfully created a new category`);
        },
        () => {
            toast.error(
                `Unable to create category. Possible duplicate category name`
              );
        }
      );
    } else {
      data.name = this.state.selectedCategory;
      if (data.name.length === 0) {
        toast.error("Please select/ enter a category");
        return;
      }
      apiCall(
        `/category`,
        "PUT",
        data,
        () => {
            this.props.onCategorySave();
          toast.success(`Pokemon(s) to the category ${data.name}`);
        },
        () => {
            toast.error(`Error occured while adding pokemon`);
        }
      );
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 select-input">
            <h5>Select an existing category</h5>
            <Select
              isClearable
              isDisabled={this.state.new}
              onChange={this.onSelect}
              options={this.state.categories}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 select-input">
            <h5>Create a new category</h5>
            <TextInput
              className="category-input"
              value={this.state.newCategory}
              onChange={this.onChange}
              placeholder="New Category"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button className="pill primary right" onClick={this.onClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

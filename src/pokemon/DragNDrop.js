import React, { Component } from "react";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PokeItemSmall from "./PokeItemSmall";
import Confirmation from "../common/Confirmation";
import ModalComponent from "../common/ModalComponent";
import apiCall from "../common/apiCall";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  width: "100%",
});

export default class DragNDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      original: [],
      changed: false,
      modalOpen: false,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.category);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.category !== prevProps.category) {
      this.fetchData(this.props.category);
    }
  }

  fetchData(category) {
    apiCall(
      `/category/${category}`,
      "GET",
      {},
      res => {
        this.addPokemon(res.data);
      }
    );
  }

  addPokemon = res => {
    this.setState({
      items: res.pokemons,
      original: res.pokemons,
    });
  };

  onReorder = () => {
    this.setState({
      items: this.state.original,
      changed: false,
    });
  };

  onSave = () => {
    let data = {
      name: this.props.category,
      pokemons: this.state.items.map(pokemon => {
        delete pokemon._id;
        return pokemon;
      })
    };

    apiCall(
      `/category/reorder`,
      "PUT",
      data,
      () => {
        this.setState({
          original: this.state.items,
          changed: false,
        });
        toast.success(`Saved successfully!`);
      },
      () => {
        toast.error(`Unable to save. Please try again!`);
      }
    );
  };

  onDelete = () => {
    this.setState({
      modalOpen: true,
    });
  };

  deleteCategory = () => {
    apiCall(
      `/category/${this.props.category}`,
      "DELETE",
      {},
      () => {
        this.setState({
          modalOpen: false
        });
        toast.success(`Deleted category ${this.props.category}`);
        this.props.onCategoryDelete();
      }
    );
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
      changed: true
    });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 button-group">
            <button
              className="pill primary"
              disabled={!this.state.changed}
              onClick={this.onSave}
            >
              Save Changes
            </button>
            <button
              className="pill secondary"
              disabled={!this.state.changed}
              onClick={this.onReorder}
            >
              Undo Reorder
            </button>
            <button className="pill danger" onClick={this.onDelete}>
              Delete Category
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <PokeItemSmall pokemon={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <ModalComponent
          open={this.state.modalOpen}
          closeModal={this.closeModal}
        >
          <Confirmation
            onClick={this.deleteCategory}
            count={this.state.items.length}
            name={this.props.category}
          />
        </ModalComponent>
      </div>
    );
  }
}

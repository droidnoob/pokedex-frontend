import React, { Component } from "react";
import { toast } from "react-toastify";
import PokeItem from "./PokeItem";
import TextInput from "../common/TextInput";
import FloatingButton from "../common/FloatingButton";
import ModalComponent from "../common/ModalComponent";
import Category from "./Category";
import { debounce } from "lodash";
import Tabs from "../common/Tabs";
import DragNDrop from "./DragNDrop";
import apiCall from "../common/apiCall";

export default class PokeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      isLoading: false,
      error: false,
      hasMore: true,
      pokemons: [],
      categories: [],
      offset: 0,
      pokemonsSelected: [],
      modalOpen: false,
      tab: "All"
    };
    this.search = debounce(this.searchPokemon, 500);
  }

  componentDidMount() {
    this.getPokemon();
    this.getCategories();
    document.addEventListener(
      "scroll",
      debounce(() => {
        const {
          state: { error, isLoading, searchTerm, hasMore, tab }
        } = this;
        if (
          error ||
          isLoading ||
          !hasMore ||
          searchTerm.length > 0 ||
          tab !== "All"
        )
          return;

        // Checks that the page has scrolled to the bottom
        if (
          window.innerHeight + document.documentElement.scrollTop >
          document.documentElement.offsetHeight - 500
        ) {
          this.setState(
            {
              offset: this.state.offset + 10
            },
            () => {
              this.getPokemon(this.state.offset);
            }
          );
        }
      }, 100)
    );
  }

  getPokemon(offset = 0) {
    this.setState(
      {
        isLoading: true
      },
      () => {
        apiCall(
          `/pokemon?offset=${offset}`,
          "GET",
          {},
          res => {
            this.addPokemon(res.data);
          },
          () => {
            this.setState({
              isLoading: false,
              error: true
            });
          }
        );
      }
    );
  }

  getCategories() {
    apiCall("/categories", "GET", {}, res => {
      this.setState({
        categories: res.data
      });
    });
  }

  searchPokemon() {
    this.setState(
      {
        isLoading: true
      },
      () => {
        apiCall(
          `/pokemon?key=${this.state.searchTerm}`,
          "GET",
          {},
          res => {
            this.setState({
              pokemons: res.data,
              isLoading: false
            });
          },
          () => {
            this.setState({
              isLoading: false,
              error: true
            });
            toast.error("Error while fetching pokemons.");
          }
        );
      }
    );
  }

  addPokemon = res => {
    this.setState({
      pokemons: [...this.state.pokemons, ...res],
      isLoading: false
    });
    if (res.length < 10) {
      this.setState({
        pokemons: [...this.state.pokemons, ...res],
        hasMore: false
      });
    }
  };

  searchOnChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
    this.search();
  };

  openModal = e => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = e => {
    this.setState({
      modalOpen: false
    });
  };

  onPokemonSelect = (action, id) => {
    if (action === "add") {
      this.setState({
        pokemonsSelected: [...this.state.pokemonsSelected, parseInt(id)]
      });
    } else {
      let array = [...this.state.pokemonsSelected];
      let index = array.indexOf(parseInt(id));
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ pokemonsSelected: array });
      }
    }
  };

  onTabChange = tab => {
    this.setState({
      tab
    });
  };

  onCategorySave = () => {
    this.setState({
      modalOpen: false,
      pokemonsSelected: []
    });
    this.getCategories();
  };

  onCategoryDelete = () => {
    this.setState({
      tab: "All"
    });
    this.getCategories();
  };

  render() {
    return (
      <div className="App-content">
        <div className="container">
          <div className="row">
            <Tabs
              tabs={[{ name: "All" }, ...this.state.categories]}
              currentTab={this.state.tab}
              onClick={this.onTabChange}
            />
          </div>
          {this.state.tab === "All" && (
            <div className="row">
              <TextInput
                className="search-input"
                value={this.state.searchTerm}
                onChange={this.searchOnChange}
                placeholder="Search pokemons"
              />
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              {this.state.tab === "All" &&
                this.state.pokemons.length > 0 &&
                this.state.pokemons.map(pokemon => (
                  <PokeItem
                    key={pokemon.id}
                    checked={this.state.pokemonsSelected.includes(pokemon.id)}
                    pokemon={pokemon}
                    onPokemonSelect={this.onPokemonSelect}
                  />
                ))}
              {this.state.tab === "All" && this.state.pokemons.length === 0 && (
                <div className="row">
                  <div className="col-md-12 text-center nothing-to-see">
                    {this.state.isLoading
                      ? "Loading..."
                      : "Nothing to see here..."}
                  </div>
                </div>
              )}
              {this.state.tab !== "All" && (
                <DragNDrop
                  category={this.state.tab}
                  onCategoryDelete={this.onCategoryDelete}
                />
              )}
            </div>
          </div>
        </div>
        {this.state.pokemonsSelected.length > 0 && (
          <div className="row">
            <FloatingButton text="Add to Category" onClick={this.openModal} />
            <ModalComponent
              open={this.state.modalOpen}
              closeModal={this.closeModal}
            >
              <Category
                categories={this.state.categories}
                pokemons={this.state.pokemonsSelected}
                onCategorySave={this.onCategorySave}
              />
            </ModalComponent>
          </div>
        )}
      </div>
    );
  }
}

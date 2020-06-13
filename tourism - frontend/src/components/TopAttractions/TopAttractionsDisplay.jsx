import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './TopAttractionsDisplay.css';
import PlacesDeck from "./PlacesDeck";

class TopAttractionsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places : [],
            currentPlace : {
                place_name : '',
                place_location : '',
                description : '',
                todo_activities :'',
                imgSrc : '',
                editDetails : false
            },
            modalOpen : false
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.handleOnChangeModal = this.handleOnChangeModal.bind(this);
        this.modalInputValidation = this.modalInputValidation.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);
        this.handleRemovePlace = this.handleRemovePlace.bind(this);
        this.handleOnClickEditCard = this.handleOnClickEditCard.bind(this);
        this.handleOnChangeCard = this.handleOnChangeCard.bind(this);
        this.handleOnSubmitChangeCard = this.handleOnSubmitChangeCard.bind(this);

        // Card Deck Array reordering
        this.reOrderArray = this.reOrderArray.bind(this);

        // API calls - to the Backend
        this.callAPIGetAllPlaces = this.callAPIGetAllPlaces.bind(this);

    }

    async callAPIGetAllPlaces(){
        const url = "http://localhost:3000/place";
        await fetch(url).then( res => res.json()).then( data => { this.setState({ places : data})}).catch( err => {
            console.log(err)});
    }

    componentWillMount() {
        this.callAPIGetAllPlaces();
    }

    handleOnChangeModal(e) {
        let formValues = {...this.state.currentPlace};
        let att_name = e.target.name;
        let att_value = e.target.value;
        formValues[att_name] = att_value;

        this.setState({
            currentPlace: formValues
        })
    }

    /**
     *   Modal user-input validation process before sending to the database
     */
    modalInputValidation(){
        let validForm = true;
        let curPlace = {...this.state.currentPlace};

        if(curPlace !== null && curPlace !== ''){
            if(curPlace.place_name === '' || curPlace.place_name == null || curPlace.place_name == undefined ){
                validForm = false;
            } else if ( curPlace.place_location === ''  || curPlace.place_name == null || curPlace.place_name == undefined ){
                validForm = false;
            } else if( curPlace.description=== ''  || curPlace.place_name == null || curPlace.place_name == undefined ){
                validForm = false;
            }
            return validForm;

        } else {
            validForm = false;
            return validForm;
        }
    }

    async handleSubmitModal(e){
        e.preventDefault();
        if(this.modalInputValidation()){
            let newPlace = {...this.state.currentPlace};
            if(this.state.currentPlace !== '' && this.state.currentPlace !== null){
                const url ="http://localhost:3000/place";
                const requestOptions = {
                    method : 'POST',
                    headers : { 'Content-Type': 'application/json' },
                    body : JSON.stringify(newPlace)
                };
                await fetch(url, requestOptions).then( res => res.json()).then( data => { console.log(data)}).catch((err) =>
                { console.log(err)});
                this.setState({
                    currentPlace : {
                        place_name : '',
                        place_location : '',
                        description : '',
                        todo_activities :'',
                        imgSrc : '',
                        editDetails : false
                    },
                    modalOpen : false
                });
                alert("New Place " + this.state.currentPlace.place_name + "  successfully added to the Database ! Thank You" );
                this.callAPIGetAllPlaces();
            }
        } else {
            // Input validation failure. => Empty fields
            alert("Error : Invalid Input, Please try Again !");
        }
    }

    /*
    *   Delete or Remove the Place - No longer provide guidance
    *       for Tourists in the particular removed location.
    *
    * */
    async handleRemovePlace(placeId){
        const url = "http://localhost:3000/place/" + placeId;
        const requestOptions = {
            method : "DELETE"
        };
        await fetch(url, requestOptions).then( res => res.json()).then( data => { console.log(data)}).catch(err => { console.log(err)});
        this.callAPIGetAllPlaces();
    }

    handleOnClickEditCard(placeId){
        let allPlaces = [...this.state.places];
        let editPlace = {};

        allPlaces.map((place) => {
           if( place._id == placeId){
               place.editDetails = true;
               editPlace = {...place};
           }
        });

        this.setState({
            places : allPlaces,
            currentPlace : editPlace
        });
    }

    handleOnChangeCard(e, placeId){
        let allPlaces = [...this.state.places];
        let currentPlaceInfo = {...this.state.currentPlace};
        let property = e.target.name;
        let value = e.target.value;

        allPlaces.map((place) => {
            if(place._id == placeId){
                place[property] = value;
                currentPlaceInfo[property] = value;
            }
        });

        this.setState({
            places : allPlaces,
            currentPlace : currentPlaceInfo
        })
    }

    /*
    * Updating the Place information based on the User inputs on the card,
    * Sending the changed values stored in the currentPlace object to the Database
    *
    * */
    async handleOnSubmitChangeCard(e, placeId){
        let allPlaces = [...this.state.places];
        let updatedPlace = {...this.state.currentPlace};

        if(this.modalInputValidation()){
            allPlaces.map((place) => {
                if(place._id == placeId){
                    place.editDetails = false;
                }
            });

            updatedPlace.editDetails = false;
            this.setState({
                places : allPlaces
            });

            const url = "http://localhost:3000/place/" + placeId;
            const requestOptions = {
                method : 'PUT',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify(updatedPlace)
            };
            await fetch(url, requestOptions).then( res => res.json()).then( data => { console.log(data)})
                .catch( err => { console.log(err)});
            this.callAPIGetAllPlaces();

            alert("Place : " + this.state.currentPlace.place_name + " updated Successfully !");
            this.setState({
                currentPlace : {
                    place_name : '',
                    place_location : '',
                    description : '',
                    todo_activities :'',
                    imgSrc : '',
                    editDetails : false
                }
            });
        }
    }

    //Modal open and close functions
    onOpenModal = () => {
        this.setState({ modalOpen: true });
    };

    onCloseModal = () => {
        this.setState({ modalOpen: false });
    };

    // Card Arrangement with only 3 cards in Row
    reOrderArray = () => {

        let allPlaces = [...this.state.places];
        let i, j, accum = [];
        let chunkSize = 3;

        for (i=0,j=allPlaces.length; i<j; i+=chunkSize) {
            accum = [...accum, allPlaces.slice(i,i+chunkSize)];
        }

        return accum;
    };

    render() {

        let reOrderedArr = this.reOrderArray();
        let allPlacesDeck = reOrderedArr.map((deckArr, index) => {
            return <PlacesDeck key={index} placesArray={deckArr} onDeletePlace={this.handleRemovePlace} onEditPlace={this.handleOnClickEditCard}
                        onChangeCardInfo={this.handleOnChangeCard} onSubmitChangedCard={this.handleOnSubmitChangeCard} />
        });

        return (
            <div className="card-body">

                {allPlacesDeck}

                {/* Add new Place Modal */}
                <div className="my-5 mx-5">
                    <button className="addPlace" onClick={this.onOpenModal}> + </button>
                    <Modal open={this.state.modalOpen} onClose={this.onCloseModal} styles={{ overlay : { background: "rgba(0,0,0,0.6)"}}} center>
                        <div className="card text-center">
                            <div className="card-header">
                                <h5 className="card-title"> Add new Top Attraction </h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => this.handleSubmitModal(e)}>
                                    <div className="form-group row mt-3">
                                        <label className="col-sm-2 col-form-label"> Place Name  </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="place_name" value={this.state.currentPlace.place_name}
                                                   onChange={this.handleOnChangeModal} placeholder="Place Name " />
                                        </div>
                                        <br/>
                                        <br/>
                                        <label className="col-sm-2 col-form-label"> Location </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="place_location" value={this.state.currentPlace.place_location}
                                                   onChange={this.handleOnChangeModal} placeholder="Location" />
                                        </div>
                                        <br/>
                                        <br/>
                                        <label className="col-sm-2 col-form-label"> Description </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="description" value={this.state.currentPlace.description}
                                                   onChange={this.handleOnChangeModal} placeholder="description about the place" />
                                        </div>
                                        <br/>
                                        <br/>
                                        <label className="col-sm-2 col-form-label"> To-do Activities </label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" name="todo_activities" value={this.state.currentPlace.todo_activities}
                                                   onChange={this.handleOnChangeModal} placeholder="e.g. Surfing, hiking ..." />
                                        </div>

                                        <input style={{marginTop : "20px", marginLeft: "18rem"}} type="submit" value="Add Place" className="btn btn-info w-25"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default TopAttractionsDisplay;
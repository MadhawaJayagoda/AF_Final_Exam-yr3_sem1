import React, {Component} from 'react';
import './PlaceCard.css';

class PlaceCard extends Component {
    render() {
        const { placeObj, onDeletePlace, onEditPlace, onChangeCardInfo, onSubmitChangedCard } = this.props;
        let imgSrc = String(placeObj.imgSrc);

        return (
            <div className="card placeItem">
                <img className="card-img-top" src={imgSrc}  alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{placeObj.place_name}</h5>
                    <p className="card-text">
                        <span><b> Location  : &nbsp; </b> {placeObj.editDetails ? <input type="text" name="place_location" value={placeObj.place_location} onChange={(e) => {onChangeCardInfo(e, placeObj._id)}} /> :  placeObj.place_location } </span> <br />
                        <span><b> Activities : &nbsp; </b> {placeObj.editDetails ? <input type="text" name="todo_activities" value={placeObj.todo_activities} onChange={(e) => {onChangeCardInfo(e, placeObj._id)}} /> : placeObj.todo_activities !== '' ? placeObj.todo_activities : null } </span> <br/>
                        <span><b> Description : &nbsp; </b> {placeObj.editDetails ? <textarea type="text" name="description" value={placeObj.description}  onChange={(e) => {onChangeCardInfo(e, placeObj._id)}} /> : placeObj.description } </span> <br />
                    </p>
                </div>
                <div className="btn-group row justify-content-center">
                    {placeObj.editDetails ? <button className="btn btn-warning w-50" onClick={(e) => onSubmitChangedCard(e, placeObj._id)} > <b>Update Info</b> </button> :
                        <span>
                            <button className="btn btn-danger mx-2 row justify-content-center" onClick={() => {onDeletePlace(placeObj._id)}}> <i className="fas fa-trash fa-lg px-1" /> </button>
                            <button className="btn btn-warning mx-2 row justify-content-center" onClick={() => {onEditPlace(placeObj._id)}}> <i className="fas fa-pencil fa-lg px-1" /> </button>
                        </span>
                    }
                </div>
                <br/>
            </div>
        );
    }
}

export default PlaceCard;
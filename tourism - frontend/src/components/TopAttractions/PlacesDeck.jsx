import React, {Component} from 'react';
import PlaceCard from "./PlaceCard";

class PlacesDeck extends Component {
    render() {
        const { placesArray, onDeletePlace, onEditPlace, onChangeCardInfo, onSubmitChangedCard } = this.props
        let allPlaceCard = placesArray.map((placeObj) => {
            return <PlaceCard key={placeObj._id} placeObj={placeObj} onDeletePlace={onDeletePlace} onEditPlace={onEditPlace}
                              onChangeCardInfo={onChangeCardInfo} onSubmitChangedCard={onSubmitChangedCard} />
        });

        return (
            <div className="card-deck mt-3">
                {allPlaceCard}
            </div>
        );
    }
}

export default PlacesDeck;
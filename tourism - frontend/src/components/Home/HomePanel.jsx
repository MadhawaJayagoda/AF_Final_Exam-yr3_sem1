import React, {Component} from 'react';
import './HomePanel.css';

class HomePanel extends Component {
    render() {
        return (
            <div className="card-body">
                <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                    <div className="imageSlides col-md-6 px-0 d-flex">
                        <div className="columnImage">
                            <img src={'/images/img-Sri-Dalada-Maligawa-pic-005.jpg'} className="rounded mx-auto d-block" />
                        </div>
                        <div className="columnImage">
                            <img src={'/images/Sri Padaya.jpg'} className="rounded mx-auto d-block"/>
                        </div>
                        <div className="columnImage">
                            <img src={'/images/galle-sri-lanka-gallery2.jpg'} className="rounded mx-auto d-block"/>
                        </div>
                    </div>
                </div>

                <br/>
                <br/>
                <div className="card">
                    <br/>
                    <h3 className="mx-auto mt-2">
                        <a className="text-dark" href="#"> Explore the Beauty of Sri Lanka </a>
                    </h3>
                    <br/>
                    <div className="card-body">
                        <div className="row d-flex justify-content-center">
                            <img className="card-img-right flex-auto d-none d-md-block" src={'/images/Sri-Lanka-Travel-Tips.jpg'}/>
                        </div>
                        <br/>
                        <br/>
                        <div className="mb-1 text-muted"> Saturday June 13, 2020 </div>
                        <p className="card-text mb-auto">Sri Lanka, officially the Democratic Socialist Republic of Sri Lanka,
                            is an island country in South Asia, located in the Indian Ocean southwest of the Bay of Bengal and southeast of the Arabian Sea.
                            It is geographically separated from the Indian subcontinent by the Gulf of Mannar and the Palk Strait. Sri Lanka is home to many cultures, languages and ethnicities.
                            The majority of the population are from the Sinhalese ethnicity, while a large minority of Tamils have also played an influential role in the island's history.
                            Moors, Burghers, Malays, Chinese, and the indigenous Vedda are also established groups.
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default HomePanel;
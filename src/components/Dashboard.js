import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const Dashboard = (props) => {

    const [isVehicleLoading, setIsVehicleLoading] = useState(true);
    const [vehicleLoadError, setVehicleLoadError] = useState(null);
    const [vehicles, setVehicles] = useState(null);

    useEffect(() => {
        const getVehicleList = async () => {
            try {
                setVehicleLoadError(null);
                const response = await axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + '/vehicles');
                setVehicles(response.data.data);
            } catch(err){
                setVehicleLoadError(err.message);
            } finally {
                setIsVehicleLoading(false);
            }
        }
        getVehicleList();

    }, []); //render only once

    const displayGetVehicle = () => {
        if(!isVehicleLoading){
            if(!vehicleLoadError){
                return (
                    <Fragment>
                        <div className="row">
                            {displayVehicleList()}
                        </div>
                        {displayAddVehicle()}
                    </Fragment>
                )
            } else {
                return (
                    <h6>{vehicleLoadError}</h6>
                )
            }
        } else {
            return (<Spinner/>)
        }
    }

    const displayVehicleList = () => {
        return vehicles.map(vehicle => {
            return (
                <div key={vehicle._id} className="col-sm-12 col-md-6 col-lg-4 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{vehicle.year} {vehicle.model}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">{vehicle.make}</h6>
                            <p className="card-text">{vehicle.name}</p>
                            <Link to={"/vehicles/" + vehicle._id} className="card-link">Details</Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const displayAddVehicle = () => {
        return (
            <div className="row text-center mt-2">
                <div className="col-12">
                    <Link to="/vehicles/add">
                        <button type="button" className="btn btn-outline-secondary col-lg-12">Add Vehicle</button>
                    </Link>
                </div>                
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <h1>Vehicles</h1>
            {displayGetVehicle()}
        </div>
    )
}

export default Dashboard;
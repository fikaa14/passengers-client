import { useState, useEffect } from "react";

const Passengers=() => {

    const [passengers, setPassengers]=useState([]);
    const [change, setChange]=useState("");

    const getPassengers=async () => {
        try {
            const response=await fetch(`https://jsonplaceholder.typicode.com/users`, {
                method: "GET"
            });

            setPassengers(await response.json());
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getPassengers();
    })

    const handleChange=async () => {
        try {
            const response=await fetch(`https://jsonplaceholder.typicode.com/users`, {
                method: "GET"
            });
            console.log(change);
            const responseJson=await response.json();

            setPassengers(passengers.filter((passenger) => { //filtriranje po imenu
                passenger.name.startsWith(change); //Ne radi ali nisam stigao da saznam zasto
            }));

            console.log(passengers);
        } catch (error) {
            console.error(error.message)
        }
    }

    return <div>
        <label>Search: </label>
        <input type="input" placeholder="Search by name" onChange={(e) => { handleChange(); setChange(e.target.value); }} />

        <table>
            <tbody>
                {passengers.map((passenger) => {
                    return <tr>
                        <th>{passenger.name}</th>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default Passengers;
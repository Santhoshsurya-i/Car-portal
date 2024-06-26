import { BookCreatedFlagContext } from "@/context/BookCreatedFlagContext";
import {  createBooking, getStoreLocations } from "@/services";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";

function Form({car}:any) {
  const [storeLocation, setStoreLocation] = useState<any>([]);
  const {showToastMsg,setShowToastMsg}=useContext(BookCreatedFlagContext)
  const [formValue,setFormValue]=useState({
    city:"",
    pickUpDate:"",
    dropOffDate:"",
    pickUpTime:"",
    dropOffTime:"",
    contactNumber:"",
    carId: ""
  })

  const today: any = new Date();
  useEffect(() => {
    getStoreLocation_();
  }, []);

  useEffect(()=>{
    if(car)
    {
      setFormValue({
        ...formValue,
        carId: car.id
      });
    }
  },[car])
  const getStoreLocation_ = async () => {
    const resp: any = await getStoreLocations();
    setStoreLocation(resp?.storesLocations);
  };

  const handleChange=(event:any)=>{
    setFormValue({
      ...formValue,
      [event.target.name]:event.target.value
    });
  }

  const handleSubmit=async()=>{
    
    const resp=await createBooking(formValue);
    
    if(resp)
    {
      setShowToastMsg(true);
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col w-full mb-5">
        <label className="text-gray-600">PickUp City</label>
        <select className="select 
        select-bordered w-full max-w-lg bg-gray-300"
        name="location" 
        onChange={handleChange}
       >
          <option disabled selected>
            PickUp City?
          </option>
          {storeLocation &&
            storeLocation.map((loc: any, index: number) => (
              <option key={index}>{loc?.city}</option>
            ))}
        </select>
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <div className="flex flex-col w-full">
          <label className="text-gray-600">Pick Up Date</label>
          <input
            type="date"
            min={today}
            onChange={handleChange}
            placeholder="Type here"
            name="pickUpDate"
            className="input input-bordered w-full max-w-lg bg-gray-300"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-600">Drop Off Date</label>
          <input
            type="date"
            onChange={handleChange}
            placeholder="Type here"
                name="dropOffDate"
            className="input input-bordered w-full max-w-lg bg-gray-300"
          />
        </div>
      </div>
      <div className="flex gap-5 ">
        <div className="flex flex-col w-full mb-5">
          <label className="text-gray-600">Pick Up Time</label>
          <input
            type="time"
            onChange={handleChange}
            name="pickUpTime"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg bg-gray-300"
          />
        </div>
        <div className="flex flex-col w-full mb-5">
          <label className="text-gray-600">Drop Off Time</label>
          <input
            type="time"
            name="dropOffTime"
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg bg-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-col w-full mb-5">
        <label className="text-gray-600">Contact Number</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={handleChange}
          name="contactNumber"
          className="input input-bordered w-full max-w-lg bg-gray-300"
        />
      </div>
      <div className="modal-action">
        <button className="btn text-gray-700 bg-gray-300">Close</button>
        <button
          className="btn bg-blue-500 text-white
hover:bg-blue-800"
            onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      
    </div>
  );
}

export default Form;
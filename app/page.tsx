"use client"
import CarsFilterOption from "@/components/Home/CarsFilterOption";
import CarsList from "@/components/Home/CarsList";            
import Hero from "@/components/Home/Hero";
import ToastMsg from "@/components/ToastMsg";
import { BookCreatedFlagContext } from "@/context/BookCreatedFlagContext";
import { getCarsList } from "@/services";
import { useEffect, useState } from "react";



export default function Home() {

  const [carsList,setCarsList]=useState<any>([])
  const [carBrandList,setCarBrandList]=useState<any>([])
  const [showToastMsg,setShowToastMsg]=useState<boolean>(false)
 useEffect(()=>{
  getCarsList_();
 },[])
  const getCarsList_=async()=>{
    const result:any=await getCarsList();
    setCarsList(result?.carsLists)
    setCarBrandList(result?.carsLists)
  }
   
  const filterCarList=(brand:string)=>{
    const filterList=carBrandList.filter((item:any)=>
    item.carBrand==brand);
    setCarsList(filterList);
  }

  const orderCarList=(order:any)=>{
    const sortedData = [...carBrandList].sort((a, b) =>
    order==-1? a.range - b.range:b.range - a.range);
    setCarsList(sortedData);
  }
useEffect(()=>{
  if(showToastMsg){
   setTimeout(function(){
    setShowToastMsg(false)

   },4000);
  }
},[showToastMsg])


return (
  <div className="p-5 sm:px-10 md:px-20">
    <BookCreatedFlagContext.Provider value={{showToastMsg,setShowToastMsg}}>
      <Hero/>
      <CarsFilterOption carsList={carBrandList}
      orderCarList={(value:string)=>orderCarList(value)}
      setBrand={(value:string)=>filterCarList(value)} />
      <CarsList carsList={carsList} />
      {showToastMsg?<ToastMsg msg={'Booking Created Successfully!'} />:null}
  </BookCreatedFlagContext.Provider>
  </div>
)}

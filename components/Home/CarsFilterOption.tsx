import React, { useEffect,useState } from "react";

function CarsFilterOption({carsList,setBrand,orderCarList}:any){

  const[brandList,setBrandList]=useState<any>();
  const BrandSet=new Set()

  useEffect(()=>{
    if(carsList)
    {
      filterCarList();
    }
  },[carsList])


  const filterCarList=()=>{
    carsList.forEach((element:any)=>{
      BrandSet.add(element.carBrand);

    });
    setBrandList(Array.from(BrandSet));
  }
  
  return (
    <div className="mt-10 flex items-center justify-between font-bold">
      <div>
        <h2 className="text-[20px] ">Our Car Portfolio</h2>
      </div>
      <div className="flex gap-5">
        <select className="select select-bordered bg-transparent w-full max-w-xs"
        onChange={(e)=>orderCarList(e.target.value)}>
          <option disabled selected>
            RANGE
          </option>
          <option value={-1}>Min to Max</option>
          <option value={1}>Max to Min</option>
        </select>
        <select className="select select-bordered bg-transparent md:block w-full max-w-xs hidden"
        onChange={(e)=>setBrand(e.target.value)}>
          <option disabled selected>
            Brand
          </option>
          {brandList && brandList.map((brand:string,index:number)=>(
              <option key={index}>{brand}</option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default CarsFilterOption;

import {request,gql} from "graphql-request"

const MASTER_URL="https://api-ap-south-1.hygraph.com/v2/clst0nwor008i07wb6nh0sesq/master"

export const getCarsList=async()=>{
    const query=gql`
    query CarsLists {
      carsLists {
        dccharging
        id
        name
        price
        publishedAt
        range
        image {
          url
        }
      }
    }
    `

      const result = await request(MASTER_URL,query);
      return result;
}
export const getStoreLocations=async()=>{
  const query=gql`
  query storeLocation {
    storesLocations{   
      city
    }
  }`

  const result = await request(MASTER_URL,query);
  return result;
}

export const createBooking=async(formValue:any)=>{
  const mutationQuery=gql`
  mutation MyMutation {
    createBooking(
      data: {
        contactNumber: "`+formValue.contactNumber+`",
        pickUpDate: "`+formValue.pickUpDate+`",
        pickUpTime: "`+formValue.pickUpTime+`",
        dropOffDate: "`+formValue.dropOffDate+`",
        dropOffTime: "`+formValue.dropOffTime+`",
        carId: {connect:
          {id: "`+formValue.carId+`"}}}
    ) {
      id
    }
  }
  `
  const result = await request(MASTER_URL,mutationQuery);
  return result;
}
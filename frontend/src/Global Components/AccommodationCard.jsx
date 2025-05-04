import SimpleButton from "./SimpleButton";

const AccommodationCard = ({ accommodation, onBook }) => {
    return (
      <div className="bg-slate-900 rounded-xl shadow-md overflow-hidden w-[300px] border border-orange-500">
        <img
          src= './accomodation.jpeg'
          alt="Accommodation"
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-white">
          <h3 className="text-lg font-semibold text-orange-500">{accommodation.location}</h3>
          <p>Capacity: {accommodation.capacity}</p>
          <p className = " pb-2">Price: Rs. {accommodation.price}</p>
          <SimpleButton text={'Book'} onClick={() => onBook(accommodation)} className="w-full mt-2" />
        </div>
      </div>
    );
  };
  
  export default AccommodationCard;
  
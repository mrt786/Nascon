const AccommodationCard = ({ accommodation, onBook }) => {
    return (
      <div className="bg-slate-900 rounded-xl shadow-md overflow-hidden w-[300px]">
        <img
          src= './accomodation.jpeg'
          alt="Accommodation"
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-white">
          <h3 className="text-lg font-semibold text-orange-500">{accommodation.location}</h3>
          <p>Capacity: {accommodation.capacity}</p>
          <p className = " pb-2">Price: Rs. {accommodation.price}</p>
          <button
            onClick={() => onBook(accommodation)}
            className="w-full bg-gradient-to-r from-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500 to-pink-500 text-white py-2 rounded-md "
          >
            Book
          </button>
        </div>
      </div>
    );
  };
  
  export default AccommodationCard;
  
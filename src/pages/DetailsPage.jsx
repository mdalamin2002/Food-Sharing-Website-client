import { useLoaderData } from "react-router";

const DetailsPage = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl p-6">
        {/* Food Image */}
        <img
          src={data.image}
          alt={data.foodName}
          className="w-full h-72 object-cover rounded-lg"
        />

        {/* Food Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-green-800">{data.foodName}</h1>

          <div className="text-gray-700 space-y-1">
            <p>
              <strong>Quantity:</strong> {data.quantity}
            </p>
            <p>
              <strong>Pickup Location:</strong> {data.pickupLocation}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              <span className="text-red-600">
                {new Date(data.expireDate).toLocaleString()}
              </span>
            </p>
            {data.notes && (
              <p>
                <strong>Notes:</strong> {data.notes}
              </p>
            )}
          </div>

          {/* Donor Info
          <div className="mt-4 flex items-center gap-4">
            <img
              src={data.donorImage}
              alt="donor"
              className="w-14 h-14 rounded-full border-2 border-green-600"
            />
            <div>
              <p className="font-semibold text-gray-800">{data.donorName}</p>
              <p className="text-sm text-gray-500">{data.donorEmail}</p>
            </div>
          </div> */}

          {/* Request Button */}
          <button
            // onClick={handleRequest}
            className="btn btn-success mt-6 w-full rounded-full"
          >
            Request This Food 🍽️
          </button>
        </div>
      </div>
    </div>
    );
};

export default DetailsPage;
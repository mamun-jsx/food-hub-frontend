import React from "react";

const staff = [
  {
    id: 1,
    name: "John Doe",
    specialty: "Master Chef",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1615109398623-88346a601842?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Maria Lopez",
    specialty: "Pastry Chef",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    id: 3,
    name: "Akira Tanaka",
    specialty: "Sushi Chef",
    country: "Japan",
    image:
      "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Fatima Khan",
    specialty: "Grill Chef",
    country: "Pakistan",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8fDA%3D",
  },
];

export default function Staff() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-4">Our Chefs</h2>
        <p className="text-center text-gray-600 mb-12">
          Meet our talented team of chefs from around the world.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              {/* Profile Picture */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-green-600 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>

              {/* Specialty */}
              <p className="text-green-600 font-medium">{member.specialty}</p>

              {/* Country */}
              <p className="text-gray-500">{member.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

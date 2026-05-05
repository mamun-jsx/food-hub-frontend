import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
          About <span className="text-primary">FoodHub</span>
        </h1>
        
        <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
          <p>
            Welcome to FoodHub, your premier destination for artisanal culinary experiences. 
            Founded in 2024, our mission is to connect passionate food lovers with the finest 
            local providers and chefs.
          </p>
          
          <p>
            We believe that great food should be accessible, sustainable, and crafted with care. 
            That&apos;s why we hand-pick every provider on our platform, ensuring they meet our 
            high standards for quality, freshness, and culinary creativity.
          </p>

          <div className="grid md:grid-cols-2 gap-8 py-12">
            <div className="bg-surface p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p>
                To create a global community where local flavors are celebrated and every meal 
                is an opportunity for connection and delight.
              </p>
            </div>
            <div className="bg-surface p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p>
                Empowering local chefs and providers while delivering exceptional, 
                chef-curated meals directly to your doorstep.
              </p>
            </div>
          </div>

          <p>
            Whether you&apos;re looking for a quick artisanal snack or a full-course gourmet 
            dinner, FoodHub is here to satisfy your cravings with excellence and warmth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

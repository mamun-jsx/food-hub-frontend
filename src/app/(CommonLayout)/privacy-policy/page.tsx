import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-600">
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h3>
            <p>
              FoodHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This 
              Privacy Policy explains how your personal information is collected, used, and 
              disclosed by FoodHub.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h3>
            <p>
              We collect information that you provide directly to us when you create an account, 
              place an order, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Contact information (such as name, email address, and phone number)</li>
              <li>Delivery address and preferences</li>
              <li>Payment information (processed securely through our partners)</li>
              <li>Order history and reviews</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h3>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Personalize your experience on our platform</li>
              <li>Communicate with you about orders, products, and promotions</li>
              <li>Improve our services and develop new features</li>
              <li>Protect the security and integrity of our platform</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">4. Sharing of Information</h3>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Food providers and delivery partners to fulfill your orders</li>
              <li>Service providers who perform functions on our behalf</li>
              <li>As required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">5. Security</h3>
            <p>
              We implement reasonable security measures to protect your information from 
              unauthorized access or disclosure. However, no method of transmission over the 
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">6. Your Choices</h3>
            <p>
              You can access, update, or delete your account information at any time through 
              your profile settings. You may also opt-out of promotional communications.
            </p>
          </section>

          <footer className="pt-8 border-t border-gray-100 text-sm italic">
            Last updated: May 5, 2024
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you. Get in touch 
            with our team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Email Us</h4>
                <p className="text-gray-600">support@foodhub.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Call Us</h4>
                <p className="text-gray-600">+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Our Office</h4>
                <p className="text-gray-600">123 Culinary St, Gourmet City, GC 12345</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-surface p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input placeholder="John Doe" />
                </Field>
                <Field>
                  <FieldLabel>Email Address</FieldLabel>
                  <Input type="email" placeholder="john@example.com" />
                </Field>
              </div>
              <Field>
                <FieldLabel>Subject</FieldLabel>
                <Input placeholder="How can we help?" />
              </Field>
              <Field>
                <FieldLabel>Message</FieldLabel>
                <textarea 
                  className="w-full min-h-[150px] p-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Your message here..."
                ></textarea>
              </Field>
              <Button className="w-full py-6 text-lg font-bold text-white rounded-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | QC Technologies",
  description: "Get in touch with QC Technologies for LED lights and toolboxes in Bayswater, WA",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're here to help you find the perfect lighting and storage solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <Phone className="text-red-500 mb-4" size={32} />
            <h3 className="font-oswald text-2xl font-bold text-white mb-2">Phone</h3>
            <a
              href="tel:0423102488"
              className="text-gray-400 hover:text-red-500 transition-colors text-lg"
            >
              0423 102 488
            </a>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <Mail className="text-red-500 mb-4" size={32} />
            <h3 className="font-oswald text-2xl font-bold text-white mb-2">Email</h3>
            <a
              href="mailto:sales@qctechnologies.com.au"
              className="text-gray-400 hover:text-red-500 transition-colors text-lg"
            >
              sales@qctechnologies.com.au
            </a>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <MapPin className="text-red-500 mb-4" size={32} />
            <h3 className="font-oswald text-2xl font-bold text-white mb-2">Address</h3>
            <p className="text-gray-400 text-lg">
              Unit 2, 3 Wicks Street
              <br />
              Bayswater WA 6053
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <Clock className="text-red-500 mb-4" size={32} />
            <h3 className="font-oswald text-2xl font-bold text-white mb-2">Hours</h3>
            <p className="text-gray-400 text-lg">
              Monday - Friday: 9:00 - 5:00
              <br />
              Saturday: 9:00 - 12:00
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl p-8 border border-red-500/30 text-center">
          <h3 className="font-oswald text-2xl font-bold text-white mb-4">
            Visit Our Showroom
          </h3>
          <p className="text-gray-300 mb-6">
            Come see our extensive range of LED lights and toolboxes in person.
            Our team is ready to help you find exactly what you need.
          </p>
          <a
            href="https://maps.google.com/?q=Unit+2,+3+Wicks+Street,+Bayswater+WA+6053"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}


/**
 * Special Therapy Page
 * Displays information about special therapy with chatbot interface
 */
export default function SpecialTherapyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Speak with Special Therapy 24/7
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Would you like to speak with us?</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Offering a new live chatbot service to my customers could be a great way to improve customer service 
            and help build customer loyalty. A live chatbot is a service that uses artificial intelligence to answer 
            customer inquiries in real time. This type of service can be beneficial for customers who have quick 
            questions or need immediate help with an issue. By providing a live chatbot service, I can help my 
            customers more efficiently and quickly. This can result in better customer satisfaction and increased 
            loyalty. Additionally, the live chatbot can be programmed to understand the customer's needs and provide 
            accurate answers. This can help reduce the need to transfer customers to a human representative and save 
            time for both the customer and my team. Live chatbot services can be a great way to give my customers 
            the best experience possible.
          </p>
        </div>

        {/* Chatbot Interface */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
            <div className="md:col-span-2">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-700">Hi how can I help you today?</p>
              </div>
              <input
                type="text"
                placeholder="Start typing here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 transition-colors duration-200 font-semibold">
              SUBMIT
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Our special therapy service provides personalized support tailored to your unique needs.
          </p>
          <p className="text-gray-600">
            Whether you need someone to talk to or guidance on specific issues, we're here to help 24/7.
          </p>
        </div>
      </section>
    </div>
  );
}

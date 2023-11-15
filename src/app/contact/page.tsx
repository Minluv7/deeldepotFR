import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <p className="text-2xl font-bold mb-4">Heb je vragen of hulp nodig?</p>
        <p className="text-lg">Contacteer dan het DeelDepot-ondersteuningsteam</p>
      </div>
      <form
        action="https://formspree.io/f/xknleqyj"
        method="POST"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Contacteer ons</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Bericht:
          </label>
          <textarea
            className="resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="message"
            id="message"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Verzenden
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;

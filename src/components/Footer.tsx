export default function Footer () {
    return(
<footer className="bg-teal-500 text-white">
  <div className="container mx-auto">
    <div className="flex flex-col md:flex-row md:justify-between">
     
      <div className="md:w-1/3">
        <a href="/contact">
            <h3 className="text-2xl font-bold mb-3 mt-4">Contacteer ons</h3>
            <ul className="text-teal-200 hover:text-white mr-4">
            <li className="mb-2">104 Koekeloestraat</li>
            <li className="mb-2">9000 Gent</li>
            <li className="mb-2">Email: info@deeldepot.com</li>
            <li className="mb-2">Telefoon: +32 454 56 78 90</li>
            </ul>
        </a>
      </div>
    </div>
    <div className="mt-6 text-center text-teal-200 hover:text-white mr-4">
      &copy; 2023 Deeldepot. Alle rechten voorbehouden.
    </div>
  </div>
</footer>
    )
}
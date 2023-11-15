
import {getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/auth';
import LastAdded from '@/components/LastAdded';

export default async function Home () {
  
    const session = await getServerSession(authOptions);
    
  return (
    <>
     {session ? (
      <div>
       <h1 className="text-3xl font-bold text-center my-4">Welkom bij DEELDEPOT {session.user?.email} - Je spirituele reis begint hier!</h1>
      </div>
    ) : (
      <h1 className="text-3xl font-bold text-center my-4">Welkom bij DEELDEPOT - Je spirituele reis begint hier!</h1>
    )}
    <div>
      <p className="font-sans text-sm text-gray-800 ml-20 mr-20 pb-4">
          Bij DEELDEPOT hebben we een diepe waardering voor de rijke en tijdloze wijsheid van het Soefisme. We geloven in de kracht van deze mystieke traditie en willen jou de mogelijkheid bieden om je te verdiepen in de diepgaande inzichten en spirituele verlichting die deze boeken te bieden hebben, en dat allemaal via onze unieke huuroptie.
      </p>
      <p className="font-sans text-sm text-gray-800 ml-20 mr-20 pb-4"> 
          Ontdek de Schoonheid van het Soefisme op Jouw Voorwaarden:
      </p>
      <p className="font-sans text-sm text-gray-800 ml-20 mr-20 pb-4">
          Het Soefisme, met zijn diepgaande filosofie en mystieke lessen, heeft de harten van mensen over de hele wereld al eeuwenlang geïnspireerd. Op DEELDEPOT vind je een uitgebreide verzameling boeken over het Soefisme en gerelateerde onderwerpen, beschikbaar om te huren. Deze boeken bieden inzicht in de zoektocht naar innerlijke vrede, liefde en spirituele groei.
      </p> 
      <p className="font-sans text-sm text-gray-800 ml-20 mr-20 pb-4">
        Waarom kiezen voor DEELDEPOT?
      </p>   
        
      <p className="font-sans text-sm text-gray-800 ml-20 mr-20 pb-4">
          Soefi Wijsheid: Onze collectie bevat een schat aan boeken die diep in de wereld van het Soefisme duiken. Ontdek poëzie, filosofie en praktische gidsen voor het begrijpen en beleven van deze spirituele traditie, en huur ze wanneer je maar wilt.

          Verbinding en Groei: Het Soefisme nodigt uit tot innerlijke groei en persoonlijke transformatie. Onze huuroptie maakt deze inzichten voor iedereen toegankelijk.
        
          Toegankelijkheid: Wij maken het gemakkelijk voor jou om deze kostbare bronnen van spirituele kennis te verkennen en te begrijpen, zonder de last van permanente aanschaf.
        
          Gemeenschap: Sluit je aan bij een gemeenschap van soefi-enthousiasten en deel je inzichten en ervaringen, allemaal terwijl je boeken huurt die bij jouw tempo passen.
      </p>
      <p className="font-sans text-sm text-gray-800 ml-20 mr-20 pb-4">
          Of je nu al vertrouwd bent met het Soefisme of gewoon nieuwsgierig bent naar deze oude wijsheid, DEELDEPOT is jouw portaal naar spirituele ontdekking, waar je boeken kunt huren en de inzichten van het Soefisme op jouw eigen tempo kunt verkennen.
        
      </p>
      <p className="font-sans text-sm text-gray-800 ml-20 mr-20 pb-4">
      Welkom bij DEELDEPOT, waar Soefisme tot leven komt door de bladzijden van de boeken die je kunt huren. Laten we samen op weg gaan naar spirituele verlichting. Veel leesplezier en ontdekkingstocht!
      </p>
      </div>
     <LastAdded/>
    </>
  )
}
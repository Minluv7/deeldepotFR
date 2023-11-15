"use client"
import { useMutation} from "@apollo/client";
import { createBooks, uploadImagesMutation } from "@/app/api/api";
import { useState } from "react";
import Modal from "react-modal";


const NewProduct = ({userId}: {userId?: String}) => {
  const [isOpen, setIsOpen] = useState(false)
    const [Title, setTitle] = useState('');
    const [Price, setPrice] = useState('');
    const [InStock, setInStock] = useState('');
    const [Language, setLanguage] = useState('');
    const [Description, setDescription] = useState('');
    const [Author, setAuthor] = useState('');
    const [Images, setImages] = useState<string>("");
    const [user, setUserId] = useState(userId);
    const [createProduct, createProductState] = useMutation(createBooks);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMedia, uploadMediaState] = useMutation(
      uploadImagesMutation,
      {
        onCompleted: (data, option) => {
          createProduct({
            variables: {
              Images: [data.upload.data.id],
              Title,
              Price: parseFloat(Price),
              InStock: parseInt(InStock),
              Language,
              Description,
              Author,
              userId: user,
            },
          });
        }
      }
      );

    const customStyles = {
      overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         width: '80%',
         maxWidth: '600px',
      }
   }

    enum LanguageList {
      Nederlands = "Nederlands",
      Engels = "Engels",
      Arabisch = "Arabisch",
      Turks = "Turks",
      Frans = "Frans",
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if(name === 'Title') setTitle(value);
        else if(name === 'Price') setPrice(value);
        else if(name === 'InStock') setInStock(value);
        else if(name === 'Language') setLanguage(value);
        else if(name === 'Description') setDescription(value);
        else if(name === 'Author') setAuthor(value);
        else if(name === 'Images') setImages(value);
       
       
    }

    const handleLanguageChange = (e: React.FormEvent<HTMLSelectElement>) => {
      // Hier wordt de geselecteerde taal ingesteld op basis van de waarde van het select-element
      setLanguage((e.target as HTMLSelectElement).value);
    };

    if (uploadMediaState.loading || createProductState.loading)
    return <div>loading...</div>;

    const fetchImageFromUrl = async (url: string) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const imageExtention = url.split(".").pop();
        const file = new File([blob], "image.png", { type: "image/png" });
        setSelectedFile(
          new File([blob], url, {
            type: `image/${imageExtention}`,
            lastModified: new Date().getTime(),
          })
        );
      } catch (error) {
        console.log("Error fetching image from url: ", error);
      }
    };

     const handleAddProduct = async () => {
       if (selectedFile) {
         uploadImages(selectedFile);
       }
     };
     const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
      if (!(event.target as HTMLInputElement).files![0]) return;
      const file = (event.target as HTMLInputElement).files![0];
      setSelectedFile(file);
    };

     const uploadImages = async (file: File): Promise<string> => {
       console.log("Selected File: ", file);
       try {
         uploadMedia({
         variables: {
             file,
           },
         });
         const { data } = await uploadMediaState;
         console.log(data.upload.data.id);
         return data.upload.data.id;
       } catch (error) {
         console.log("Error uploading media: ", error);
         return "";
       }
     };

    if (uploadMediaState.loading || createProductState.loading)
      return <div>failed to load</div>;
    

    return(
        <>
        <button  className="bg-teal-500 hover:bg-teal-600 ml-4 text-white font-semibold px-4 py-2 rounded-lg mb-8 focus:outline-none focus:ring focus:border-teal-300" onClick={() => setIsOpen(true)}>Voeg nieuw product toe</button>
         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <form>
        <div className="mb-4">
        <label htmlFor="Title" className="block text-gray-600 text-sm font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="Title"
          value={Title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
        />
      </div>
      <label
            
            htmlFor="fileInput"
            className="cursor-pointer bg-teal-500 text-white py-3 px-6 rounded-full hover:bg-teal-600 inline-block"
          >
            Kies een File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
        <p className="text-white text-sm mt-4">
          {selectedFile
            ? `📸 Selected File: ${selectedFile}`
            : "🚫 No file selected"}
        </p>
    <div className="mb-4">
    <label htmlFor="Price" className="block text-gray-600 text-sm font-semibold mb-2">
      Price
    </label>
    <input
      type="number"
      id="price"
      name="Price"
      value={Price}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
    />
    </div>
    <div className="mb-4">
    <label htmlFor="InStock" className="block text-gray-600 text-sm font-semibold mb-2">
      InStock
    </label>
    <input
    type="number"
    id="instock"
    name="InStock"
    value={InStock}
    onChange={handleChange}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-300"
  />
    </div>
    <div className="mb-4">
    <label htmlFor="LanguageList" className="block text-gray-600 text-sm font-semibold mb-2">
      Language
    </label>
    <select
    name="LanguageList"
    value={Language}
    onChange={handleLanguageChange}
    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
    ><option value="">Selecteer een taal</option>
    {Object.values(LanguageList).map((LanguageList, index) => (
      <option key={index} value={LanguageList}>
        {LanguageList}
      </option>
    ))}
    
    </select>
    </div>
    <div className="mb-4">
    <label htmlFor="Description" className="block text-gray-600 text-sm font-semibold mb-2">
      Description
    </label>
    <textarea
  id="description"
  name="Description"
  value={Description}
  onChange={handleChange}
  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
/>
    </div>
    <div className="mb-4">
    <label htmlFor="Author" className="block text-gray-600 text-sm font-semibold mb-2">
      Author
    </label>
    <input
  type="text"
  id="author"
  name="Author"
  value={Author}
  onChange={handleChange}
  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
/>
    </div>

    <button
    type="submit"
    onClick={handleAddProduct}
    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-teal-300"
  >
    Create
  </button>
        </form>
            <button onClick={() => setIsOpen(false)}>Sluit</button>
         </Modal>
        </>
    )

}

export default NewProduct;
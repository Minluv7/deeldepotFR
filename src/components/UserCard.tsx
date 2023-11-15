import React, {useState} from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/app/api/api";
import { uploadImagesMutation } from "@/app/api/api";

const UserCard= (user: UserCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateUser] = useMutation(UPDATE_USER);
    const [email, setEmail] = useState(user.data?.usersPermissionsUser?.data?.attributes?.email || "");
    const [username, setUsername] = useState(user.data?.usersPermissionsUser?.data?.attributes?.username || "");
    const userId = user.data?.usersPermissionsUser?.data?.id || null;
    // nieuwe staat om de bestandsinvoer bij te houden
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMedia, uploadMediaState] = useMutation(uploadImagesMutation,{
        onCompleted: (data) => {
            const imageId = data.upload.data.id;
            updateUser({
                variables: {
                    userId: userId,
                    data: {
                        image: imageId,
                    }
                    
                }
            })
        }
    });
   
    

const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'username') {
            setUsername(value);
        }
        console.log(`Field ${name} has been updated with value: ${value}`);
    };

    // functie om bestand te verwerken wanneer het is geselecteerd
    const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!(event.target as HTMLInputElement).files![0]) return;
        const file = (event.target as HTMLInputElement).files![0];
        setSelectedFile(file);
      };

      // functie om afbeeldingen te uploaden
     const handleAddProduct = async () => {
        if (selectedFile) {
          uploadImages(selectedFile);
        }
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

    if (uploadMediaState.loading)
    return <div>loading...</div>;


const handleCancel = () => {
        setIsEditing(false);
    };

const handleEdit = () => {
        setIsEditing(true);
    };
    
const handleSave = async () => {
    if (userId) {
    setIsEditing(false);

    const currentEmail = user.data?.usersPermissionsUser?.data?.attributes?.email ;
    const currentUsername = user.data?.usersPermissionsUser?.data?.attributes?.username ;

    if (email !== currentEmail || username !== currentUsername) {
        
    const updatedUserData = {
        id: userId,
        data: {
            email: email,
            username: username,
           
            },
        };
       
    await updateUser({
        variables: {
        userId: updatedUserData.id,
        data:{
            email: updatedUserData.data.email,
            username: updatedUserData.data.username,
            
            }
        },
    });
    
    }
    }
};

return (
    <section className="flex flex-col gap-4 mb-4 mt-4">
       <div className="flex flex-col items-center ">
        <p className="text-2xl text-center">{user.pagetype} pagina</p>
        <Image className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src={user.data?.usersPermissionsUser?.data?.attributes?.image?.data?.[0]?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_API_URL}${user.data?.usersPermissionsUser?.data?.attributes?.image?.data?.[0]?.attributes?.url}`
            : '/img/_.jpeg'
            }
            width={200}
            height={200}
            alt="Profile Pic"
            priority={true}
        />
        <div className="flex flex-col gap-4 mt-4">
        <label
            htmlFor="fileInput"
            className="cursor-pointer bg-teal-500 text-white py-3 px-4 rounded-full hover:bg-teal-600 inline-block"
          >
            Kies een File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
         
            <button
                type="submit"
                onClick={handleAddProduct}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-teal-300"
                >
                upload
            </button>
            </div>
  </div>
  <div className="flex flex-col gap-4 mr-20 ml-20">
        <div>
        {isEditing ? (
        <>
        <button 
            className="bg-teal-500 hover:bg-teal-600 self-end text-white font-semibold px-4 py-2 rounded-lg w-20 focus:outline-none focus:ring focus:border-teal-300" 
            onClick={handleSave}
        >
            Save
        </button>
        <button 
            className="bg-red-500 hover:bg-red-600 self-end text-white font-semibold px-4 py-2 rounded-lg w-20 focus:outline-none focus:ring focus:border-red-300" 
            onClick={handleCancel}
        >
            Cancel
        </button>
        </>
        ) : (
        <button 
            className="bg-teal-500 hover:bg-teal-600 self-end text-white font-semibold px-4 py-2 rounded-lg w-20 focus:outline-none focus:ring focus:border-green-300" 
            onClick={handleEdit}
        >
            Edit
        </button>
        )}
        
        </div>
        <label htmlFor="email" className='font-semibold'>
            Email:
        </label>
        <input className="text-1xl font-semibold"
            type="text"
            disabled={!isEditing}
            onChange={handleOnChange}
            name='email'
            value={email}
        />
        <label htmlFor="username" className='font-semibold'>
            Username:
        </label>
        <input className="text-1xl font-semibold"
        type="text"
        disabled={!isEditing}
        onChange={handleOnChange}
        name='username'
        value={username}
        />
</div>
    </section>
    );
};

export default UserCard;
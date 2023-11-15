type ProductAttributes = {
    id: number;
    Title: string;
    Description: string;
    Price: number;
    InStock: number;
    Language: string;
    Author: string;
    users_permissions_user:{
      data: {
        attributes :{
            username: string;
          }
      }
    }
    Images?: {
        data: {
          attributes: {
            url: string;
          }
        }[]
      }
      
    createdAt?: string | number | Date;
    updatedAt?: string | number | Date;
   
  };

  type Product = {
    id: number;
    attributes: ProductAttributes;
  }

type Products = Product[];
import axios from 'axios';
import {redirect} from 'next/navigation';
import { gql } from '@apollo/client';

export const getBooks =  gql`
query GetBooks{
  products {
    data {
      id
      attributes {
        Title
        Author
        Images {                  
          data {
            id
            attributes {
              url
                  }
                }
              }
        Price
        InStock
        Language
        Description
        createdAt
        users_permissions_user {
          data {
            id
            attributes {
            username
            }
          }
        }
      }
    }
  }
}`;

export const getselectedBooks = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
      query{
          products{
          data{
              id
              attributes{
              Title
              Author
              Images{data{attributes{url}}}
              Price
              InStock
              Language
              Description
              users_permissions_user {
                data {
                  id
                  attributes {
                      username
                    }
                }
              }
              createdAt
            }
          }
        }
      }`
      try {
        const response = await axios.post(url,{query});
        return response.data.data.products.data;
      } catch (error) {
        console.log(error);
        redirect('/error')
      }
  };

export const getBooksFromUser = gql`
    query GetBooksFromUser($userId: ID!) {
      products(filters: { users_permissions_user: { id: { eq: $userId } } }) {
        data {
          id
          attributes {
            Title
            Author
            Price
            InStock
            Language
            Description
            createdAt
            users_permissions_user {
              data {
                id
                attributes {
                    username
                  }
              }
            }
            Images {
              data {
                id
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }`;    
  export const getBookById = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
    const query = `
    query {
        product(id: ${id}) {
            data {
                id
                attributes {
                Title
                Author
                Images {data {attributes {url}}}
                Price
                InStock
                Language
                Description
                }
            }
        }
    }`;
    try {
        const response = await axios.post(url,{query});
        return response.data.data.product.data;
      } catch (error) {
        console.log(error);
        redirect('/error')
      }
};

export const getProductById = gql`
  query ($id: ID!){
    product(id: $id) {
      data {
        id
        attributes {
          Title
          Author
          Images {
            data {
              attributes {
                url
              }
            }
          }
          Price
          InStock
          Language
          Description
          users_permissions_user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export const uploadImagesMutation = gql`
  mutation ($file: Upload!) {
    upload(file: $file) {
      data {
        id
      }
    }
  }`;

export const createBooks = gql`
mutation createBooks ($Images: [ID], $Title: String!, $Description: String!, $InStock: Int, $userId: ID!, $Price: Float, $Author: String!, $Language: ENUM_PRODUCT_LANGUAGE! ) {
  createProduct(data: { Images: $Images, Title: $Title, Price: $Price, InStock: $InStock, Description: $Description, Language: $Language, Author: $Author, users_permissions_user: $userId }) {
    data {
      id
      attributes {
        Title
        Price
        InStock
        Language
        Description
        Author
        users_permissions_user {
          data {
            attributes {
              username
            }
          }
        }
        Images {
          data {
            attributes {
              name
            }
          }
        }
        createdAt
      }
    }
  }
}`;

export const updateProduct = async (product: Product) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
    mutation updateProduct($id: ID!, $data: ProductInput!) {
      updateProduct(id: $id, data: $data) {
        data {
          attributes{
            Title
            Price
            InStock
            Images{data{attributes{url}}}
            Description
            Language
            Author
          }
          }
        }
      }`;
      const variables = {
        id: product.id,
        data: {
          Title: product.attributes.Title,
          Price: product.attributes.Price,
          InStock: product.attributes.InStock,
          Description: product.attributes.Description,
          Language: product.attributes.Language,
          Author: product.attributes.Author,
        },
      };
    try {
        const response = await axios.post(url,{query,variables});
        return response.data.data.updateProduct.data;
      } catch (error) {
        console.log(error);
      }
      console.log('product:', product);
      console.log('variables:', variables);
    }

export const deleteProduct = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`;
    const query = `
    mutation {
        deleteProduct(id: "${id}") {
          data {
            id
          }
        }
      }`
    try {
        const response = await axios.post(url,{query});
        return response.data.data.deleteProduct.data;
      }
        catch (error) {
            console.log(error);
            redirect('/error')
        }
    };

export const rentRequests = gql`
  query RentRequests($userId: ID!) {
    rentRequests(
      filters: {
        product: {
          users_permissions_user: {
            id:{ eq: $userId}
          }
        }
      }
    ) {
      data {
        id
        attributes {
          amountRequested
          startDate
          endDate
          status
          product {
            data {
              id
              attributes {
                Title
              }
            }
          }
          hirer {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export const rentRequestsOwner = gql`
query RentRequests($hirerId: ID!) {
  rentRequests(
    filters: {
      hirer: {
        id: { eq: $hirerId }
      }
    }
  ) {
    data {
      id
      attributes {
        amountRequested
        startDate
        endDate
        status
        product {
          data {
            id
            attributes {
              Title
            }
          }
        }
        hirer {
          data {
            id
            attributes {
              username
            }
          }
        }
      }
    }
  }
}
`;

export const createRentalRequest = gql`
mutation CreateRentalRequest($data: RentRequestInput!) {
  createRentRequest(data: $data) {
    data {
      id
      attributes {
        hirer {
          data {
            attributes {
              username
            }
          }
        }
        amountRequested
        endDate
        startDate
        status
        product {
          data {
            id
            attributes {
              Title
            }
          }
        }
      }
      id
    }
  }
}`;

export const updateRentRequest = gql`
mutation UpdateRentRequest($id: ID!, $data: RentRequestInput!) {
  updateRentRequest(id: $id, data: $data) {
    data {
      id
      attributes {
        status
      }
    }
  }
}`;

export const GET_USER = gql`
  query GetUserImage($userId: ID!) {
    usersPermissionsUser(id: $userId) {
      data {
        id
        attributes {
          email
          username
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($userId: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $userId, data: $data) {
      data {
        id
        attributes {
          email
          username
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

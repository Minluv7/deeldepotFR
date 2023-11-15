export type RequestItem = {
    id: number | string;
    attributes: {
      amountRequested: number;
      status: string;
      endDate: Date | string | number;
      startDate: Date | string | number;
      hirer: {
        data: {
          id: number | string;
          attributes: {
            username: string;
          };
        };
      };
      product: {
        data: {
          id: number | string;
          attributes: {
            Title: string;
            users_permissions_user:{
              data: {
                id: number | string;
                attributes :{
                    username: string;
                  }
              }
            }
          };
        
        };
      };
      user: {
        data: {
          id: number | string;
          attributes: {
            username: string;
          };
        };
      };
    };
  };
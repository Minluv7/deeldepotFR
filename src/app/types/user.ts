interface UserCardProps {
    data?: {
      usersPermissionsUser?: {
        data?: {
            id: number | string | null;
          attributes?: {
            email?: string | null | undefined;
            username?: string | null | undefined;
            image?: {
                data?: Array<{
                    attributes?: {
                      url?: string | null | undefined;
                    };
                  }>;
            }
          };
        };
      };
    };
    pagetype: string;
  }
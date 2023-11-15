export { default } from 'next-auth/middleware';

export const config = {
  // api: {
  //   bodyParser: false
  // },
  matcher: [ "/requests", "/my-products", "/profile"]
};
## Coding Test for 'Full Stack Development' in NameSpaceIT

### Routings Frontend
1. Home `/`
2. Autn/Login `/auth`
3. Add New Product(Admin Only) `/dashboard/product/add`
4. Your Cart View `/product/cart`
7. User Self Ordesr  `/user/[username]/orders`

### API Routings 
1. NextAuth api `/api/auth/[...nextauth]`
2. Login API `/api/auth/login`
3. New User Create `/api/auth/register`
4. New Order `/api/order/create`
7. Get one product (Product ID) `/api/product/single-product/[productId]`
8. User get own orders `/api/user/order`
9. User get self `/api/user?username=` 

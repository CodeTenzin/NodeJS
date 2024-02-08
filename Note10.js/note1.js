// 1 - Introduction

/*

Built api endpoints
/api/genres
/api/movies
/api/customers
/api/rentals

Authentication: 
process of identifying if the user is who they say they are. login.
Authorization:
determining if the user has the right permissnion to perform the given operation.
eg: vidly making sure only logged in or authenticated user can perform operations
that modidy data. otherwise can only read data from endpoint. 
additional feature, only admins can delete data. 

Adding 2 new endpoint
Register: POST /api/users { name, email, password }
Login: POST /api/logins

email: {
    type: String,
    unique: true  <- ensures we are not saving 2 doc with same email.
}

*/

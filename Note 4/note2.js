// 2 - RESTful Services or REST API

/*

Client - front end
Server - back end

using HTTP protocol to connect.
REST - Representational State Transfer.
converntion for building HTTP services.

CRUD operations
Create, Read, Update and Delete data.

Eg: http://vidly.com/api/customers
address can start with http or https. 
domain - vidly.com
/api - convention to expose the resuful services. 
/customers - collection of customers in app. In REST referred to as a resource.

HTTP Methods
GET - get data
POST - create data
PUT - update data
DELETE - delete data

                        GET
Request                                 Response
GET /api/customers                      [ {id: 1, name: " "}, {id: 2, name: " "}]
GET /api/customers/1                    {id: 1, name: " "}

                        UPDATE
Request                                 Response
PUT /api/customers/1                    {id: 1, name: " "}
    { name: ""}

                        DELETE
Request                                 Response
DELETE /api/customers/1                  

                        CREATE
Request                                 Response
POST /api/customers                     {id: 1, name: " "}
    {name: ""}


    POST /api/customers
    GET /api/customers
    GET /api/customers/1
    PUT /api/customers/1
    DELETE /api/customers/1

 
*/

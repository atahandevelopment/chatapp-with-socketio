/**
 * @swagger
 * components:
 *        schemas:
 *            Register:
 *                type: object
 *                required:
 *                      - fullname
 *                      - email
 *                      - password
 *                      - role
 *                properties:
 *                      id:
 *                        type: string
 *                        description: The auto generated id of the account
 *                      fullname:
 *                        type: string
 *                        description: The fullname of the account
 *                      email:
 *                        type: string
 *                        description: The email of the account
 *                      password:
 *                        type: string
 *                        description: The password of the product
 *                      role:
 *                        type: string
 *                        description: The role of the account
 *                example:
 *                      id: 1
 *                      fullname: Example Name
 *                      email: example@gmail.com
 *                      password: beg45tetsfst4t3wtwsfgsg4g
 *                      role: admin
 */



/**
 * @swagger
 * tags:
 *    name: Register
 *    description: The Register managing the API
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Login user schema
 *     tags: [Register]
 *     description: Login user schema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: Fullname is the name of the account
 *               email:
 *                 type: string
 *                 description: Email is the email address of the account
 *               password:
 *                 type: string
 *                 description: Password is the password of the account
 *               role:
 *                 type: string
 *                 description: Password is the password of the account
 *               
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * components:
 *        schemas:
 *            Auth:
 *                type: object
 *                required:
 *                      - email
 *                      - password
 *                properties:
 *                      email:
 *                        type: string
 *                        description: The email of the account
 *                      password:
 *                        type: string
 *                        description: The password of the account
 *                example:
 *                      email: example@gmail.com
 *                      password: examplepass
 */



/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: The Login API
 */



/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     description: Login Api
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *                  $ref: '#components/schemas/Auth'
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email is the email address of the account
 *               password:
 *                 type: string
 *                 description: Password is the password of the account
 *               
 *     responses:
 *       200:
 *         description: Login successful
 *          
 *       400:
 *         description: Bad request (invalid input)
 *       500:
 *         description: Internal server error
 */


// http://localhost:5000/api/v1/user/all

/**
 * @swagger
 * tags:
 *    name: User
 *    description: The User managing the API
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Retrieve a list of all users
 *     parameters:
 *          - in: query
 *            name: id
 *            description: Filter users by id
 *            schema: 
 *                  type: string
 *          - in: query
 *            name: fullname
 *            description: Filter users by fullname
 *            schema:
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *               application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                            $ref: '#components/schemas/Register'
 *       500:
 *         description: Internal server error
 */


// http://localhost:5000/api/v1/user/get-me

/**
 * @swagger
 * /user/get-me:
 *   get:
 *     summary: Get own informations
 *     tags: [User]
 *     description: Retrieve a list of all users
 *     parameters:
 *          - in: query
 *            name: userId
 *            description: Filter users by id
 *            schema: 
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *               application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                            $ref: '#components/schemas/Register'
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * tags:
 *    name: Rooms
 *    description: Managing the room API
 */


/**
 * @swagger
 * components:
 *        schemas:
 *            Rooms:
 *                type: object
 *                required:
 *                      - name
 *                properties:
 *                      name:
 *                        type: string
 *                        description: Name of the Room
 *                example:
 *                      name: Example Chat
 */

// http://localhost:5000/api/v1/rooms/add-room

/**
 * @swagger
 * /rooms/add-room:
 *   post:
 *     summary: Add room api
 *     tags: [Rooms]
 *     description: Login user schema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name is the name of the account
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       500:
 *         description: Internal server error
 */


// http://localhost:5000/api/v1/rooms/get-rooms

/**
 * @swagger
 * /rooms/get-rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     description: Retrieve a list of all users
 *     parameters:
 *          - in: query
 *            name: id
 *            description: Filter users by id
 *            schema: 
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *               application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                            $ref: '#components/schemas/Register'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *    name: Room Messages
 *    description: The Room Messages managing the API
 */


/**
 * @swagger
 * components:
 *        schemas:
 *            RoomMessages:
 *                type: object
 *                required:
 *                      - from
 *                      - roomId
 *                      - room
 *                      - message
 *                properties:
 *                      from:
 *                        type: string
 *                        description: from user id
 *                      roomId:
 *                        type: string
 *                        description: posted message for room
 *                      room:
 *                        type: string
 *                        description: query for room messages
 *                      message:
 *                        type: string
 *                        description: message context
 *                example:
 *                      from: lnlkn23l4n4l12k
 *                      roomId: jwnaıwd1ı2en12ıe2n1
 *                      message: Merhaba dünya
 */



// http://localhost:5000/api/v1/public/add-msg

/**
 * @swagger
 * /public/add-msg:
 *   post:
 *     summary: Add room api
 *     tags: [Room Messages]
 *     description: Login user schema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 description: From user id
 *               roomId:
 *                 type: string
 *                 description: Room id for post message
 *               message:
 *                 type: string
 *                 description: Message Context
 *     responses:
 *       201:
 *         description: Message created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       500:
 *         description: Internal server error
 */


// http://localhost:5000/api/v1/public/get-msg

/**
 * @swagger
 * /public/get-msg:
 *   get:
 *     summary: Get all users
 *     tags: [Room Messages]
 *     description: Retrieve a list of all users
 *     parameters:
 *          - in: query
 *            name: from
 *            description: sender id
 *            schema: 
 *                  type: string
 *          - in: query
 *            name: room
 *            description: posted Room id
 *            schema: 
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *               application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                            $ref: '#components/schemas/RoomMessages'
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * tags:
 *    name: PrivateMessages
 *    description: The Private Messages managing the API
 */

/**
 * @swagger
 * components:
 *        schemas:
 *            PrivateMessages:
 *                type: object
 *                required:
 *                      - from
 *                      - to
 *                      - message
 *                properties:
 *                      from:
 *                        type: string
 *                        description: from user id
 *                      to:
 *                        type: string
 *                        description: to user id
 *                      message:
 *                        type: string
 *                        description: message context
 *                example:
 *                      from: lnlkn23l4n4l12k
 *                      to: jwnaıwd1ı2en12ıe2n1
 *                      message: Merhaba dünya
 */


// http://localhost:5000/api/v1/private/add-msg

/**
 * @swagger
 * /private/add-msg:
 *   post:
 *     summary: Add message for private
 *     tags: [PrivateMessages]
 *     description: Private Message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 description: From user id
 *               to:
 *                 type: string
 *                 description: To User id for post message
 *               message:
 *                 type: string
 *                 description: Message Context
 *     responses:
 *       201:
 *         description: Message created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       500:
 *         description: Internal server error
 */


// http://localhost:5000/api/v1/private/get-msg

/**
 * @swagger
 * /private/get-msg:
 *   get:
 *     summary: Get all users
 *     tags: [PrivateMessages]
 *     description: Retrieve a list of all users
 *     parameters:
 *          - in: query
 *            name: from
 *            description: sender id
 *            schema: 
 *                  type: string
 *          - in: query
 *            name: to
 *            description: posted Room id
 *            schema: 
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *               application/json:
 *                    schema:
 *                        type: array
 *                        items:
 *                            $ref: '#components/schemas/PrivateMessages'
 *       500:
 *         description: Internal server error
 */

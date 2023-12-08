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
 *    description: The User managing the API
 */



/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Create a new account
 *     tags: [Auth]
 *     description: Create a new account
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


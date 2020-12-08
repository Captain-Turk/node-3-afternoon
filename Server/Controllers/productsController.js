module.exports = {
    getAllProducts: (req, res) => {
        const dbInstance = req.app.get('db')

        dbInstance.read_all_products()
        .then(products=> {
            res.status(200).send(products)
        })
        .catch(err=> {  
            console.log(err)         
            res.status(500).send('Something went wrong!!!')
            
        })       
    },
    getOneProduct: (req,res ) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params

        dbInstance.read_product(id)
        .then(product=> {
            res.status(200).send(product)
        })
        .catch(err=> { 
            console.log(err)
            res.status(500).send('Something went wrong!')
           
        })
    },
    createProduct: (req, res) => {
        const dbInstance = req.app.get('db')
        const {name, description, price, image_url} = req.body
        
        dbInstance.create_product([name, description, price, image_url])
        .then(product=> {
            res.status(200).send(product) /**Be careful about this part instead of status &  send you can use SENDSTATUS as in DELETE, only GET request(s) needs seperate for better practice!!!*/
        })
        .catch(err=> { 
            console.log(err)
            res.status(500).send('Something went wrong!')
           
        })
    },
    updateProduct: (req, res) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        const {name, description, price, image_url} = req.body

        dbInstance.update_product([id, name, description,price, image_url])
        .then(product=> {
            res.status(200).send(product)/**Be careful about this part instead of status &  send you can use SENDSTATUS as in DELETE, only GET request(s) needs seperate for better practice!!!*/
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send('Something went wrong!')            
        })

    },
    deleteProduct: (req,res) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params

        dbInstance.delete_product(id)
        .then(()=> res.sendStatus(200))/**!!! SENDSTATUS */
        .catch(err=>{
            console.log(err)
            res.status(500).send('Something went wrong!')
        })


    }
}
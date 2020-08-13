const { User } = require("../model/user");
const { Company } = require("../model/company");


module.exports.delete_user = async (req, res) =>{
    try{
        let { id } = req.params;
            
     if(!id ){
             return res.status(400).json({
                 message: 'invalid id',
             });
         }
             else {
            
             let userFound = await User.find({user_id:id});
             
            if(userFound.length > 0){

                let result = await User.deleteOne({ user_id: id });
                console.log(result);
                res.status(200).json({
                    message:'Delete was successful'
                });  

            }
            else {
                res.status(404).json({
                    message:' account does not exist'
                })
            }
        
         } 
    }
    catch(e){
        res.status(500).json({
            message: 'server error',
        })
        console.log(e);
    }

    
}

module.exports.update_user = async (req, res) => {
    let id  = req.params.id;

    try{
        let {id,title, post} = req.body;
        console.log(title,post + ' test');
         if(!id || !title || !post){
             return res.status(400).json({
                 message: 'id, title or post cannot be empty',
             });
         }
         else {
             let newPost = {
                 id,
                 title,
                 post
             }
             let postFound = await Post.find({id:id});
             console.log(postFound);
            if(postFound.length > 0){

                let result = await Post.update({ id: id }, {
                    $set: {
                        title:newPost.title,
                        post: newPost.post
                    }
                });
                console.log(result);
                res.status(204).json(newPost);  

            }
            else {
                res.status(404).json({
                    message:'post does not exist'
                })
            }
        
         }
    }
    catch(e){
        res.status(500).json({
            message: 'server error',
        })
        console.log(e);
    }

}



module.exports.change_password = async (req, res) =>{
    try{
        let {id,title, post} = req.body;
        console.log(title,post + ' test');
         if(!id || !title || !post){
             return res.status(400).json({
                 message: 'id, title or post cannot be empty',
             });
         }
         else {
             let newPost = {
                 id,
                 title,
                 post
             }
             let postFound = await Post.find({id:id});
             console.log(postFound);
            if(postFound.length > 0){

                let result = await Post.update({ id: id }, {
                    $set: {
                        title:newPost.title,
                        post: newPost.post
                    }
                });
                console.log(result);
                res.status(204).json(newPost);  

            }
            else {
                res.status(404).json({
                    message:'post does not exist'
                })
            }
        
         }
    }
    catch(e){
        res.status(500).json({
            message: 'server error',
        })
        console.log(e);
    }

}






async function updateUser(user_id){

}

async function deleteUser(user_id){
// delete user 
}
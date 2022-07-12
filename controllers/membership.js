var MembershipDB = require('../models/membership');
const { v4: uuidv4 } = require('uuid');

// retrieve membership details
exports.findMembership = (req, res)=>{
    if(req.params.id){
        const id = req.params.id;
        MembershipDB.findOne({id:id})
            .then(data =>{
                if(!data){
                    return res.send({ 
                        success : true,
                        data : "",
                        message : "No billing information found "
                    })
                }else{
                    return res.send({ 
                        success : true,
                        data : data
                    })
                }
            })
            .catch(err =>{
                return res.status(500).send({ 
                    success : false,
                    message : "Internal server error"
                })
            })

    }
    else{
        MembershipDB.find()
            .then(memShip => {
                return res.send({ 
                    success : true,
                    data : memShip
                })
            })
            .catch(err => {
                return res.status(500).send({ 
                    success : false,
                    message : "Internal server error"
                })
            })
    }
}

// create and save new membership
exports.createMembership = (req,res)=>{
    // input validation
    if(!req.body){
        return res.status(400).send({ 
            success : false,
            message : "Content is missing"
        })
    }

    const memInfo = new MembershipDB({
        id : uuidv4(),
        user_id : req.body.user_id,
        total_cost : req.body.total_cost,
        plan_name : req.body.plan_name,
        start_date : req.body.start_date,
        end_date : req.body.end_date,
        is_inactive : req.body.is_inactive
    })

    // save details in the database
    memInfo.save(memInfo)
        .then(data => {
            return res.status(201).json({
                message:"Membership added",
                success:true,
                data:memInfo
            })
        })
        .catch(err =>{
            return res.status(500).json({
                message:"Internal server error",
                success:false
            });
        });
}

// Update membership
exports.updateMembership = (req, res)=>{
    if(!req.body){
        return res.status(400).send({ 
            success : false,
            message : "Content is missing"
        })
    }

    const id = req.params.id;
    MembershipDB.findOneAndUpdate({id:id}, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                return res.status(404).send({ 
                    success : false,
                    message : "No membership found "
                })
            }else{
                return res.status(200).json({
                    message:"Membership updated",
                    success:true
                })
            }
        })
        .catch(err =>{
            return res.status(500).json({
                message:"Internal server error",
                success:false
            });
        })
}
const Plan=require('../models/Plan');

exports.createplan= async (req,res)=>{
    try{
        const {title,description,price,duration}=req.body;
        
        const plan=await Plan.create(
            {
                title,
                description,
                price,
                duration,
                trainer: req.user.id
            }
        );

        res.status(201).json(plan);

    }catch(error){
        res.status(500).json({error: error.message});
    }

};

exports.getplan=async (req,res)=>{
    try{
        const plans=await Plan.findOne().populate('trainer','name email');
        res.json(plans);
    }catch(error){
        res.status(500).json({error: error.message});

    }
};

exports.updateplan= async (req,res)=>{
    try{
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        if(plan.trainer.toString() !== req.user.id){
            res.status(401).json({ message: "Not allowed" });
        }

        plan.title = req.body.title || plan.title;
        plan.description = req.body.description || plan.description;
        plan.price = req.body.price || plan.price;
        plan.duration = req.body.duration || plan.duration;

        await plan.save();

        res.json({message: "PLan updated"});


    }catch(error){
        res.status(500).json({error: error.message});
    }

}

exports.deleteplan= async (req,res)=>{
    try{
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        if(plan.trainer.toString() !== req.user.id){
            res.status(401).json({ message: "Not allowed" });
        }

        

        await plan.deleteOne();

        res.json({message: "PLan Deleted"});


    }catch(error){
        res.status(500).json({error: error.message});
    }

}



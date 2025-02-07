import User from "../models/user.model.js";


export const test = (req, res) => {
    res.json({message:"Api is working"})}
    ;


export const getUsers = async(req, res,next) => {
    
    try{

            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.sort === 'asc'? 1 : -1;

            const users = await User.find()
               .sort({ updatedAt: sortDirection })
               .skip(startIndex)
               .limit(limit);

               const usersWithoutPasswords = users.map((user)=>{
                const {password, ...rest}=user._doc;
                return rest;
               })
            const totalUsers = await User.countDocuments();
            const now = new Date();
            const oneMonthAgo= new Date(
                now.getFullYear(),
                now.getMonth()-1,
                now.getDate()
            )
            const lastMonthUsers = await User.countDocuments({
                updatedAt: { $gte: oneMonthAgo }
            })

            res.status(200).json({
                users:usersWithoutPasswords,

                totalUsers,
                lastMonthUsers,
            })
    
    }catch(e){
        next(e)
    }
}

export const deleteUser = async (req, res,next) => {
   

    try{
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({message:"User deleted successfully"})
    }catch(e){
        next(e);
    }};


    export const updatedProfile = async (req, res, next) => {
      try {
        const { userId, email } = req.body;
    
        if (!userId || !email) {
          return res.status(400).json({ message: "User ID and email are required" });
        }
    
        // Check if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid user ID" });
        }
    
        // Check if the email is already in use by another user
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(400).json({ message: "Email is already in use" });
        }
    
        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { email },
          { new: true }
        );
    
        if (!updatedUser) {
          console.error(`User not found with ID: ${userId}`);
          return res.status(404).json({ message: "User not found" });
        }
    
        res.json(updatedUser);
      } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
    


    export const updatedProfilePicture = async (req, res, next) => {
        try {
            const { userId,profilePicture } = req.body;
          
              // Update the user in the database
              const updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePicture},
                { new: true }
              );
          
              if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
              }
          
              res.json(updatedUser);
            } catch (error) {
              console.error("Error updating profile:", error);
              res.status(500).json({ message: "Internal server error" });
            }
          }
        ;
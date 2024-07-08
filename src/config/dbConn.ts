import mongoose from 'mongoose'
const MONGO_URI = process.env.DATABASE_URI || ''

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
    } catch (err) {
        console.log(err)
    }
}

export default connectDB
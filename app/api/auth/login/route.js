import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

const { connectDB } = require("@/lib/dbConnection"); 
const { NextResponse } = require("next/server");



export async function POST(req) {
    try{
        const {email , password } = await req.json();

        const SS_password = await bcrypt.hash(password, 10);

        const db = await connectDB();

        const [rows] = await db.execute("SELECT * FROM login WHERE UserEmail = ?", [email]);

        if(rows.length === 0){
            return NextResponse.json({error: "User is Not Found"},{status: 404});
        }

        const data = rows[0];

        const isPasswordValid = await bcrypt.compare(password, data.UserPassword);

        const token = jwt.sign({ id: data.Id, email: data.UserEmail }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        console.log(token)

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
        }

        const response =  NextResponse.json({ status: 'success', message: "Login successful", data });

        response.headers.set(
            "Set-cookie", serialize("token",token,{httpOnly:true,path:"/",maxAge: 3600})
         );

         return response;
    }
    catch (err) {
        console.error("Login Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
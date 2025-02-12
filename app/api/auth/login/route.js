const { connectDB } = require("@/lib/dbConnection"); 
const { NextResponse } = require("next/server");


export async function POST(req) {
    try{
        const {email , password } = await req.json();

        const db = await connectDB();

        // console.log('this is DB Status: -',db);

        const [rows] = await db.execute("SELECT * FROM login WHERE UserEmail = ?", [email]);

        if(rows.length === 0){
            return NextResponse.json({error: "User is Not Found"},{status: 404});
        }

        const data = rows[0];
        
        if (password != data.UserPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful", data });
    }
    catch (err) {
        console.error("Login Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
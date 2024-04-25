import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json();
    // Add data to the database
    return NextResponse.json({ message: "User registered"});
}
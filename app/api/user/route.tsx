import { NextResponse } from 'next/server'

export async function POST() {
    // Add data to the database
    return NextResponse.json({ message: "User registered"});
}
import connectMongo from '@/lib/connect-mongo';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
export async function GET() {
    try {
        await connectMongo();
        const users = await User.find();
        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
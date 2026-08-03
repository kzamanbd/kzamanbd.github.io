import { user } from '@/lib/metadata';
import { NextResponse } from 'next/server';

export async function POST() {
    // generate random token
    const token = Math.random().toString(36).substring(7);
    // response json with token
    return NextResponse.json({
        token: token,
        user: user,
        message: 'Login successful'
    });
}

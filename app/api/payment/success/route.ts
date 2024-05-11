import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log('Success', request);
    return NextResponse.redirect(new URL('/payment/success', request.url), 303);
}

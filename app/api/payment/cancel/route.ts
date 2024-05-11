import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log('cancel', request);
    return NextResponse.redirect(new URL('/payment/cancel', request.url), 303);
}

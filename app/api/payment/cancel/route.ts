import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    return NextResponse.redirect(new URL('/payment/cancel', request.url), 303);
}

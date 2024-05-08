import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const reqBody = await request.json();
    const secret_key = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

    try {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reqBody.token}`;

        const res = await fetch(url, {
            method: 'POST'
        });
        if (!res.ok) {
            return NextResponse.json(
                {
                    error: 'Captcha verification failed!',
                    success: false
                },
                { status: 500 }
            );
        }
        const data = await res.json();

        return NextResponse.json({
            message: 'Captcha verification success!!',
            success: true
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Captcha verification failed!',
                success: false
            },
            { status: 500 }
        );
    }
}

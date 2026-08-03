import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'GET'
        });
        if (!res.ok) {
            return NextResponse.json(
                {
                    error: 'Failed to fetch photos!',
                    success: false
                },
                { status: 500 }
            );
        }
        const data = await res.json();

        return NextResponse.json({
            photos: data,
            success: true
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Failed to fetch photos!',
                success: false,
                error: error
            },
            { status: 500 }
        );
    }
}

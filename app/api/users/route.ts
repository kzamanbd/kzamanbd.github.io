import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET'
        });
        if (!res.ok) {
            return NextResponse.json(
                {
                    error: 'Failed to fetch users!',
                    success: false
                },
                { status: 500 }
            );
        }
        const data = await res.json();

        return NextResponse.json({
            users: data,
            success: true
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Failed to fetch users!',
                success: false
            },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({
        message: 'License activated',
        success: true,
        isSuccessful: true,
        key: '3063BDEC-318A-4E4F-99D6-635FD0292F3F',
        device_id: '9618a15dbe4b3140487a8f96fe2058e72a3db0b3eaf2e21819622502a2b10157'
    });
}


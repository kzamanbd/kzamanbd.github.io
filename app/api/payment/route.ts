import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // generate unique id for each transaction id
    const randomString = Math.random().toString(36).substring(7);
    const transactionId = `${randomString.toUpperCase()}${Math.random().toString(36).substring(7).toUpperCase()}`;
    console.log('Transaction ID:', transactionId);

    const sslUrl = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

    const formData = new FormData();
    const storeId = process.env.NEXT_PUBLIC_STORE_ID as string;
    const storePassword = process.env.NEXT_PUBLIC_STORE_PASSWORD as string;

    formData.append('store_id', storeId);
    formData.append('store_passwd', storePassword);
    formData.append('currency', 'BDT');
    formData.append('tran_id', transactionId.toString());
    formData.append('total_amount', '500');
    formData.append('success_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success?id=${transactionId}`);
    formData.append('fail_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel?id=${transactionId}`);
    formData.append('cancel_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel?id=${transactionId}`);
    formData.append('ipn_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn?id=${transactionId}`);
    formData.append('cus_name', 'Kamruzzaman');
    formData.append('cus_email', 'kzamanbn@gmail.com');
    formData.append('cus_add1', 'Dhaka');
    formData.append('cus_add2', 'Dhaka');
    formData.append('cus_city', 'Dhaka');
    formData.append('cus_state', 'Dhaka');
    formData.append('cus_postcode', '1000');
    formData.append('cus_country', 'Bangladesh');
    formData.append('cus_phone', '01711111111');
    formData.append('cus_fax', '01711111111');
    formData.append('shipping_method', 'NO');
    formData.append('num_of_item', '1');
    formData.append('product_name', 'Test Product');
    formData.append('product_category', 'Test Category');
    formData.append('product_profile', 'general');
    formData.append('product_amount', '50');
    formData.append('product_vat', '0');

    try {
        const res = await fetch(sslUrl, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) {
            return NextResponse.json(
                {
                    error: 'Payment initiation failed!',
                    success: false
                },
                { status: 500 }
            );
        }
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            {
                error: 'Payment initiation failed!',
                success: false,
                message: error.message || 'Internal server error'
            },
            { status: 500 }
        );
    }
}
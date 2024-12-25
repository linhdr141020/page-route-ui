import { NextRequest, NextResponse } from "next/server";
import { verifyShopifyHMAC } from "./utils/auth";

const {
    SHOPIFY_APP_API_SECRET_KEY
} = process.env;
export async function middleware(request) {
    const shopOrigin = request.nextUrl.searchParams.get("shop");
    const checked = !shopOrigin || await verifyShopifyHMAC(
        new URLSearchParams(request.nextUrl.searchParams),
        SHOPIFY_APP_API_SECRET_KEY
    );
    if (!checked) return Response.json(
        { success: false, message: "invalid hmac" },
        {status: 401}
    );
    const response = NextResponse.next();
    if(shopOrigin) {
        response.headers.set('Content-Security-Policy', `frame-ancestors https://${shopOrigin} https://admin.shopify.com`); 
    }
    return response;
};
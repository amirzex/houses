
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Home | خانه رویایی خودت رو پیدا کن",
    description: "پلتفرم اجاره، خرید و فروش ویلا و اقامتگاه‌های ایران",
};

export const shabnam = localFont({
    src: [
        {
            path: "../assets/fonts/shabnam/Farsi-Digits-Without-Latin/Shabnam-Bold-FD-WOL.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-shabnam",
    display: "swap",
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies()

    const token = cookieStore.get('accessToken')

    const isLoggedIn = !!token?.value
    return (
        <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
            <body className={`${shabnam.variable} ${shabnam.className}`}>
                <Providers>
                    <LayoutWrapper isLoggedIn={isLoggedIn}>
                        {children}
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                className: "!rounded-2xl !shadow-[var(--shadow-soft)] !font-bold !text-sm",
                                style: {
                                    background: "var(--card)",
                                    color: "var(--foreground)",
                                },
                            }}
                        />
                    </LayoutWrapper>
                </Providers>
            </body>
        </html>
    );
}

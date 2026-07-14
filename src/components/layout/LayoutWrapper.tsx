"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./header/page";
import Footer from "./footer/page";

interface LayoutWrapperProps {
    children: ReactNode;
    isLoggedIn: boolean;
}

const LayoutWrapper = (props: LayoutWrapperProps) => {

    const { children, isLoggedIn } = props;

    const pathname = usePathname();
    const isPanel = pathname.startsWith("/panel");
    const isFakeGateway = pathname.startsWith("/payment/");

    return (
        <>
            {!isPanel && !isFakeGateway && <Header isLoggedIn={isLoggedIn} />}
            {children}
            {!isPanel && !isFakeGateway && <Footer />}
        </>
    );
}


export default LayoutWrapper;

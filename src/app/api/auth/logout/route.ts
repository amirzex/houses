import { NextResponse } from "next/server";

export async function POST() {
  try {

    const nextResponse = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );

    nextResponse.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), 
    });


    nextResponse.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}

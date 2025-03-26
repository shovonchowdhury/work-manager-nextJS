import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    // console.log(token)

    const requestedUrl = request.nextUrl.pathname;

    // if(requestedUrl === '/api/login')
    //     return NextResponse.next();

    if(requestedUrl === '/logIn' || requestedUrl === '/signUp')
    {
        if(token)
            return NextResponse.redirect(new URL('/profile/user', request.url))
    }
    else
    {
        if(!token)
            {
                return NextResponse.redirect(new URL('/logIn', request.url))
            }
    }

    
    return NextResponse.next();

  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/addTask','/showTask','/logIn','/signUp','/profile/user'],
}
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isLoginRoute = path === "/admin/login";

  // Security headers on all matched admin traffic (site-wide headers also in next.config)
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  if (!url || !anonKey) {
    if (isAdminRoute && !isLoginRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        response.headers.set("X-Frame-Options", "DENY");
        response.headers.set("X-Content-Type-Options", "nosniff");
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    isAdmin = Boolean(adminRow);
  }

  if (isAdminRoute && !isLoginRoute) {
    if (!user || !isAdmin) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", path);
      if (user && !isAdmin) {
        loginUrl.searchParams.set("error", "forbidden");
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isLoginRoute && user && isAdmin) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = "/admin";
    dashUrl.search = "";
    return NextResponse.redirect(dashUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};

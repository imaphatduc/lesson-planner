import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import {
  MyLessonsContext,
  MyLessonsProvider,
} from "./contexts/MyLessonsContext";
import "./app.css";
import { use } from "react";
import { Moon, Sun } from "lucide-react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lesson Planner" },
    { name: "description", content: "Plan your lessons!" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MyLessonsProvider>
          <NavbarLayout>{children}</NavbarLayout>
        </MyLessonsProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  const { darkMode, setDarkMode } = use(MyLessonsContext);

  return (
    <div>
      <button
        className="mt-4 ml-4 p-2 hover:bg-neutral-300 hover:dark:bg-neutral-600 rounded-md cursor-pointer"
        onClick={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
      >
        {darkMode ? <Moon /> : <Sun />}
      </button>
      <div className="h-screen">{children}</div>
    </div>
  );
};

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

"use client";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import GlobalStateProvider, { useGlobalState } from "./GlobalStateProvider";

function LayoutInner({ children }) {
  const { lockedOpen } = useGlobalState();
  return (
    <html lang="en">
      <head>
        <title>WittyTech Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="app-layout">
          <Sidebar />
          <main className={`main-content${lockedOpen ? " sidebar-fixed" : ""}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

export default function Layout({ children }) {
  return (
    <GlobalStateProvider>
      <LayoutInner>{children}</LayoutInner>
    </GlobalStateProvider>
  );
}

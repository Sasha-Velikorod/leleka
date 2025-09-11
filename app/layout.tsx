import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <TanStackProvider>
          {children}
          {modal}
        </TanStackProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}

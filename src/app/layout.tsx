import { ThemeProvider } from "next-themes";
import { Progress } from "@/components/ui/progress"; // ✅ Import Progress Bar

export const metadata = {
  title: "Data Dashboard App",
  description: "Build Authentication app using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {/* ✅ Global Progress Bar - Appears on Every Page */}
          <div className="p-4">
            <Progress />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

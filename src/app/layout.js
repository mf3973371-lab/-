import { Tajawal } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import CustomCursor from "@/components/CustomCursor";
import GoogleAuthProvider from "@/components/GoogleAuthProvider";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata = {
  title: "منصة الرعاية الصحية",
  description: "صحتك في يدك بتجربة تليق بك",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-mesh text-foreground">
        <GoogleAuthProvider>
          <CustomCursor />
          <SplashScreen />
          {children}
        </GoogleAuthProvider>
      </body>
    </html>
  );
}

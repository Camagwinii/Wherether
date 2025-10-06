import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner";
import { WeatherDashboard } from "./pages/weather-dashboard";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "./components/loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [fade, setFade] = useState("opacity-100"); // Tailwind opacity classes

  useEffect(() => {
    // Loader shows first
    const loaderTimer = setTimeout(() => {
      // Fade out loader
      setFade("opacity-0 transition-opacity duration-1000");
      setTimeout(() => {
        setShowLoader(false);
        setShowVideo(true);
        setFade("opacity-0"); // reset for video fade-in
      }, 1000); // 1s fade out
    }, 3000);

    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    // Video fade in
    if (showVideo) {
      setTimeout(() => setFade("opacity-100 transition-opacity duration-1000"), 50); // small delay for fade-in

      const videoTimer = setTimeout(() => {
        // Fade out video
        setFade("opacity-0 transition-opacity duration-1000");
        setTimeout(() => setShowVideo(false), 1000); // after fade out, show app
      }, 5000); // video duration

      return () => clearTimeout(videoTimer);
    }
  }, [showVideo]);

  if (showLoader)
    return (
      <div className={`fixed inset-0 flex items-center justify-center bg-black ${fade}`}>
        <Loader />
      </div>
    );

  if (showVideo)
    return (
      <div className={`fixed inset-0 flex items-center justify-center bg-black ${fade}`}>
        <video
          src="/vid/intro.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

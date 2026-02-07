import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Button onClick={() => navigate("/")} size="lg">
          Go Home
        </Button>
      </div>
    </div>
  );
}

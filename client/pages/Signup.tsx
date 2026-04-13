import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowRight, Check } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate form
      if (
        !formData.name ||
        !formData.email ||
        !formData.company ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Navigate to role selection
      navigate("/role-selection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex">
      {/* Left side - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent to-primary p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <span className="text-2xl font-bold text-white">WorkflowAI</span>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Get Started with WorkflowAI
          </h1>

          <div className="space-y-4">
            {[
              {
                title: "Reduce Manual Work",
                description: "Automate repetitive tasks and focus on strategy",
              },
              {
                title: "AI-Powered Decisions",
                description:
                  "Let advanced AI analyze documents and make decisions",
              },
              {
                title: "Scale Effortlessly",
                description:
                  "Handle 10x more workflows without additional team size",
              },
              {
                title: "Real-time Monitoring",
                description:
                  "Track automation progress and metrics in live dashboards",
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/60 text-sm">
          &copy; 2024 WorkflowAI. All rights reserved.
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex lg:hidden items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary">WorkflowAI</span>
            </Link>
            <h2 className="text-3xl font-bold text-secondary mb-2">
              Create Account
            </h2>
            <p className="text-slate-600">
              Join thousands of companies automating workflows
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Your Company Inc"
                value={formData.company}
                onChange={handleChange}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="h-11"
              />
              <p className="text-xs text-slate-500">
                Minimum 8 characters recommended
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-11"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer mt-4">
              <input type="checkbox" className="w-4 h-4 rounded mt-1" />
              <span className="text-sm text-slate-600">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 gap-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-600">
                  Or sign up with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11">
              Continue with Google
            </Button>
          </form>

          <p className="text-center text-slate-600 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:text-primary/80">
              Sign in
            </Link>
          </p>

          <p className="text-center text-slate-500 text-xs mt-6">
            This is a demo application. No real data is stored.
          </p>
        </div>
      </div>
    </div>
  );
}

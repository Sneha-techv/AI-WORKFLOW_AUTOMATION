
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Users, Briefcase, ArrowRight, MessageSquare } from "lucide-react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      switch (selectedRole) {
        case "customer-service":
          navigate("/customer/dashboard");
          break;
        case "employee":
          navigate("/dashboard");
          break;
        case "hr":
          navigate("/ats-dashboard");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: "hr",
      title: "HR / ATS Manager",
      icon: Briefcase,
      description: "Manage hiring, resumes, and candidate workflows",
      features: [
        "Create & Manage Job Roles",
        "Resume Parsing & Scoring",
        "Candidate Shortlisting",
        "ATS Dashboard",
        "Recruitment Workflow Tracking",
        "AI Candidate Evaluation",
      ],
      color: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      accentColor: "bg-green-100",
    },
    {
      id: "customer-service",
      title: "Customer Service",
      icon: MessageSquare,
      description: "Manage support tickets, customer queries, and AI-assisted responses",
      features: [
        "Ticket queue management",
        "AI-suggested response review",
        "Customer satisfaction tracking",
        "SLA monitoring & alerts",
        "Knowledge base management",
        "Real-time performance metrics",
      ],
      color: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      accentColor: "bg-blue-100",
    },
    {
      id: "employee",
      title: "Employee",
      icon: Users,
      description: "Complete onboarding tasks and manage your workflow",
      features: [
        "View onboarding progress",
        "Assigned task management",
        "Document uploads",
        "Workflow notifications",
        "Personal profile management",
        "Progress tracking",
      ],
      color: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      accentColor: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary">WorkflowAI</span>
          </Link>
          <div className="text-slate-600">Select Your Role</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Choose Your Role
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select the role that best describes your position to access your
            personalized dashboard
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => (
            <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`p-8 rounded-xl border-2 transition-all text-left ${
              selectedRole === role.id
              ? `${role.borderColor} bg-gradient-to-br ${role.color} shadow-lg border-current`
              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
               }`}
               >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${role.accentColor}`}
              >
                <role.icon className="w-6 h-6 text-slate-700" />
              </div>

              <h3 className="text-xl font-semibold text-secondary mb-2">
                {role.title}
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                {role.description}
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-200">
                {role.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {selectedRole === role.id && (
                <div className="mt-6 p-3 bg-primary/10 rounded-lg flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                  <span className="text-sm font-medium text-primary">
                    Selected
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            size="lg"
            className="gap-2 px-8"
          >
            {isLoading ? "Loading..." : "Continue to Dashboard"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
          <p className="text-slate-600 text-sm">
            You can change your role anytime in settings
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-16 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Demo Mode</h3>
          <p className="text-slate-700 text-sm mb-4">
            This is a role-based AI workflow automation system.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><strong>HR:</strong> Manage hiring & ATS workflows</li>
            <li><strong>Customer Service:</strong> Handle tickets & complaints</li>
            <li><strong>Employee:</strong> Manage tasks & onboarding</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Brain,
  Workflow,
  Mail,
  FileText,
  BarChart3,
  Users,
  ArrowRight,
  Check,
  MessageSquare,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary">WorkflowAI</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition">
              Features
            </a>
            <a href="#integrations" className="text-slate-600 hover:text-slate-900 transition">
              Integrations
            </a>
            <a href="#workflow" className="text-slate-600 hover:text-slate-900 transition">
              How It Works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
            Automate Your Business Workflows with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI + n8n
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Intelligent automation for HR onboarding, resume screening, invoice
            processing, and email handling. Let AI make decisions, and n8n
            execute workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="gap-2">
                View Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-8 border-t border-slate-200">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                10K+
              </div>
              <p className="text-slate-600">Workflows Automated</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">
                95%
              </div>
              <p className="text-slate-600">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">
                24/7
              </div>
              <p className="text-slate-600">Automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Core Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to automate business processes intelligently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Decision Making",
                description:
                  "Advanced AI analyzes unstructured data, resumes, emails, and invoices to make intelligent decisions",
              },
              {
                icon: Workflow,
                title: "Workflow Automation",
                description:
                  "n8n triggers automated workflows based on AI decisions, reducing manual work",
              },
              {
                icon: Mail,
                title: "Email Automation",
                description:
                  "Automated email notifications and communications triggered by workflow events",
              },
              {
                icon: FileText,
                title: "Resume Screening",
                description:
                  "AI-powered resume analysis and automatic candidate scoring and shortlisting",
              },
              {
                icon: BarChart3,
                title: "Invoice Processing",
                description:
                  "Intelligent invoice data extraction and automated approval workflows",
              },
              {
                icon: Users,
                title: "HR Onboarding",
                description:
                  "Streamlined employee onboarding with automated task assignment and tracking",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              AI & API Integrations
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Unified platform connecting AI, workflow automation, and data APIs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Decision API",
                description:
                  "Intelligent analysis for resume screening, invoice data extraction, and email classification",
                features: [
                  "Resume analysis & scoring",
                  "Invoice data extraction",
                  "Email classification",
                  "Smart decision routing",
                ],
                gradient: "from-primary/20 to-blue-100",
                border: "border-primary/30",
              },
              {
                title: "n8n Workflow Engine",
                description:
                  "Executes workflows based on AI decisions and manages process orchestration",
                features: [
                  "Workflow automation",
                  "Event-based triggers",
                  "Data transformation",
                  "Process monitoring",
                ],
                gradient: "from-accent/20 to-purple-100",
                border: "border-accent/30",
              },
              {
                title: "Email & Data APIs",
                description:
                  "Connects Gmail/SMTP for email automation and manages candidate/employee data",
                features: [
                  "Email automation",
                  "Data management",
                  "Database integration",
                  "Real-time notifications",
                ],
                gradient: "from-slate-200 to-slate-100",
                border: "border-slate-300",
              },
            ].map((integration, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border ${integration.border} bg-gradient-to-br ${integration.gradient} transition-all hover:shadow-lg`}
              >
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {integration.title}
                </h3>
                <p className="text-slate-700 mb-6 text-sm">
                  {integration.description}
                </p>
                <div className="space-y-2">
                  {integration.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Visualization */}
      <section id="workflow" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A seamless flow from document submission to intelligent automation
            </p>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { icon: FileText, label: "Upload", color: "bg-blue-100" },
                { label: "→", color: "transparent" },
                { icon: Brain, label: "AI Analysis", color: "bg-purple-100" },
                { label: "→", color: "transparent" },
                { icon: Workflow, label: "n8n Workflow", color: "bg-green-100" },
                { label: "→", color: "transparent" },
              ].map((step, index) => (
                <div key={index}>
                  {step.icon ? (
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${step.color}`}
                      >
                        <step.icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <p className="text-xs font-semibold text-slate-600 text-center">
                        {step.label}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-2xl text-slate-400">{step.label}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
              {[
                { label: "Resume/Invoice Upload", color: "bg-blue-100" },
                { label: "", color: "transparent" },
                { label: "Decision Making", color: "bg-purple-100" },
                { label: "", color: "transparent" },
                { label: "Automation Triggered", color: "bg-green-100" },
                { label: "", color: "transparent" },
              ].map((step, index) => (
                <div key={index}>
                  {step.color !== "transparent" ? (
                    <p className="text-xs text-slate-600 text-center">
                      {step.label}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-300 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-primary mb-2">1s</p>
                <p className="text-sm text-slate-600">Average Processing Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent mb-2">100%</p>
                <p className="text-sm text-slate-600">Automated Decisions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary mb-2">Real-time</p>
                <p className="text-sm text-slate-600">Dashboard Updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Role-Based Dashboards
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each role has a dedicated dashboard with specific permissions and
              insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Customer Service Dashboard",
                icon: MessageSquare,
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
              },
              {
                title: "Employee Dashboard",
                icon: Users,
                features: [
                  "Personal profile",
                  "Onboarding progress",
                  "Assigned tasks",
                  "Task notifications",
                  "Document upload",
                  "Progress tracking",
                ],
                color: "from-purple-50 to-purple-100",
                borderColor: "border-purple-200",
              },
            ].map((dashboard, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border ${dashboard.borderColor} bg-gradient-to-br ${dashboard.color} hover:shadow-lg transition`}
              >
                <h3 className="text-xl font-semibold text-secondary mb-4">
                  {dashboard.title}
                </h3>
                <ul className="space-y-3">
                  {dashboard.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            Ready to Automate Your Workflows?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Start your free trial today and experience intelligent automation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#workflow">
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-semibold">WorkflowAI</span>
              </div>
              <p className="text-sm text-white/60">
                AI-powered business process automation
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#features" className="text-white/60 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#integrations" className="text-white/60 hover:text-white">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#workflow" className="text-white/60 hover:text-white">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="text-white/60 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="text-white/60 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
            <p>&copy; 2024 WorkflowAI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

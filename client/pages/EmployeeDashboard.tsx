import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Zap,
  CheckCircle,
  Clock,
  FileText,
  LogOut,
  Settings,
  Bell,
  Menu,
  User,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function EmployeeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const employeeInfo = {
    employeeId: "EMP-2024-001",
    fullName: "Alice Green",
    email: "alice@company.com",
    phone: "+1 (555) 012-3456",
    dob: "May 15, 1992",
    gender: "Female",
    address: "123 Tech Lane, Silicon Valley, CA",
    emergencyContact: "Bob Green (+1 (555) 987-6543)",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary">WorkflowAI</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Bell className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
            <Link to="/login">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <LogOut className="w-5 h-5 text-slate-600" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-64 bg-white border-r border-slate-200 p-6 min-h-screen`}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Menu
          </h2>
          <nav className="space-y-2">
            {[
              { label: "Overview", icon: CheckCircle },
              { label: "Onboarding", icon: Clock },
              { label: "Tasks", icon: FileText },
              { label: "Profile", icon: User },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                  activeTab === item.label
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Welcome, {employeeInfo.fullName}
            </h1>
            <p className="text-slate-600">
              {activeTab === "Onboarding"
                ? "Review your collected onboarding information"
                : "Your onboarding journey is progressing smoothly"}
            </p>
          </div>

          {activeTab === "Overview" && (
            <>
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-2">
                      Onboarding Progress
                    </h2>
                    <p className="text-slate-600 text-sm mb-4">
                      You're making excellent progress! Complete all steps to get fully onboarded.
                    </p>
                  </div>
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-secondary mb-4">
                    Your Profile
                  </h2>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-secondary">{employeeInfo.fullName}</p>
                    <p className="text-sm text-slate-600">Senior Developer</p>
                  </div>
                  <div className="space-y-3 border-t border-slate-200 pt-4">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Email</p>
                      <p className="text-sm font-medium text-slate-900">{employeeInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Department</p>
                      <p className="text-sm font-medium text-slate-900">Engineering</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Start Date</p>
                      <p className="text-sm font-medium text-slate-900">Jan 15, 2024</p>
                    </div>
                  </div>
                </div>

                {/* Onboarding Progress */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-secondary mb-6">
                    Onboarding Checklist
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Complete Profile Setup",
                        description: "Add your profile information and preferences",
                        completed: true,
                      },
                      {
                        title: "IT Equipment Assignment",
                        description: "Receive laptop, access cards, and other equipment",
                        completed: true,
                      },
                      {
                        title: "Training Materials",
                        description: "Review company policies and training documents",
                        completed: true,
                      },
                      {
                        title: "Team Introduction",
                        description: "Scheduled meeting with your team lead",
                        completed: false,
                      },
                      {
                        title: "System Access Setup",
                        description: "Configure access to all required systems",
                        completed: false,
                      },
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 pt-1">
                          {step.completed ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <Clock className="w-6 h-6 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              step.completed ? "text-slate-600 line-through" : "text-slate-900"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-sm text-slate-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-3">Overall Progress</p>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                        style={{ width: "60%" }}
                      />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mt-2">
                      60% Complete
                    </p>
                  </div>
                </div>
              </div>

              {/* Assigned Tasks */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
                <h2 className="text-lg font-bold text-secondary mb-6">
                  Assigned Tasks
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      task: "Review Company Handbook",
                      deadline: "Today",
                      priority: "High",
                      status: "Pending",
                    },
                    {
                      task: "Complete Security Training",
                      deadline: "Tomorrow",
                      priority: "High",
                      status: "In Progress",
                    },
                    {
                      task: "Set Up 2FA Authentication",
                      deadline: "This Week",
                      priority: "Medium",
                      status: "Not Started",
                    },
                    {
                      task: "Schedule 1-on-1 with Manager",
                      deadline: "Next Week",
                      priority: "Medium",
                      status: "Not Started",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{item.task}</p>
                        <p className="text-sm text-slate-600">
                          Due: {item.deadline}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            item.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.priority}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-200 text-slate-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "Onboarding" && (
            <div className="space-y-8">
              {/* Basic Employee Information Section */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                  <div className="text-2xl">🧑‍💼</div>
                  <div>
                    <h2 className="text-lg font-bold text-secondary">
                      1️⃣ Basic Employee Information
                    </h2>
                    <p className="text-xs text-slate-500">Standard onboarding attributes collected during submission</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee ID</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.employeeId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.fullName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date of Birth</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.dob}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gender</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.gender}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.address}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2 p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Emergency Contact</p>
                      <p className="text-slate-900 font-medium">{employeeInfo.emergencyContact}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified during onboarding form submission</span>
                    </div>
                    <Button variant="outline" size="sm">Edit Information</Button>
                  </div>
                </div>
              </div>

              {/* Onboarding Checklist (also shown in Onboarding tab) */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-secondary mb-6">
                  Onboarding Checklist
                </h2>
                <div className="space-y-4">
                  {[
                    { title: "Complete Profile Setup", completed: true },
                    { title: "IT Equipment Assignment", completed: true },
                    { title: "Training Materials", completed: true },
                    { title: "Team Introduction", completed: false },
                    { title: "System Access Setup", completed: false },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 pt-1">
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-500" />
                        )}
                      </div>
                      <p className={`font-medium ${step.completed ? "text-slate-600 line-through" : "text-slate-900"}`}>
                        {step.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Tasks" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-secondary mb-6">Assigned Tasks</h2>
              <p className="text-slate-600 italic">No complex tasks currently assigned. Check back later.</p>
            </div>
          )}

          {activeTab === "Profile" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-secondary mb-6">Profile Settings</h2>
              <p className="text-slate-600 italic">Profile management is currently handled by HR.</p>
            </div>
          )}

          {/* Notifications (Always visible at bottom) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mt-8">
            <h2 className="text-lg font-bold text-secondary mb-6">
              Recent Notifications
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Welcome to the Team!",
                  message: "Your onboarding workflow has been initiated",
                  time: "2 hours ago",
                  icon: "✓",
                },
                {
                  title: "Equipment Ready",
                  message: "Your equipment is ready for pickup at the IT desk",
                  time: "5 hours ago",
                  icon: "📦",
                },
                {
                  title: "Training Materials Available",
                  message: "New training materials have been added to your dashboard",
                  time: "1 day ago",
                  icon: "📚",
                },
              ].map((notification, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
                >
                  <div className="text-2xl flex-shrink-0">{notification.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

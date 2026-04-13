import { useState, useEffect } from "react";

import {
  uploadResume,
  getCandidates,
  submitComplaint,
  getRoles,
  createRole,
  addSkillsToRole,
} from "@shared/api";

import { parseResumeFromPdf } from "../lib/parse-resume";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { Plus, LogOut } from "lucide-react";
import { auth } from "../lib/auth";

export default function ATSDashboard() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);

  // ✅ IMPORTANT FIX: NO empty string default
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(undefined);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [newRoleName, setNewRoleName] = useState("");
  const [roleSkills, setRoleSkills] = useState([{ name: "", type: "required" }]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      const rolesData = await getRoles();
      const safeRoles = Array.isArray(rolesData) ? rolesData : [];

      setRoles(safeRoles);

      // ✅ safe auto-select (NO empty string)
      if (!selectedRoleId && safeRoles.length > 0) {
        const firstId = safeRoles[0]?.id;
        if (firstId != null) {
          setSelectedRoleId(String(firstId));
        }
      }
    } catch (error) {
      console.error("Roles error:", error);
      toast.error("Failed to load roles");
    }

    try {
      const candidatesData = await getCandidates();
      setCandidates(Array.isArray(candidatesData) ? candidatesData : []);
    } catch (error) {
      console.error("Candidates error:", error);
      toast.error("Failed to load candidates");
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // ---------------- UPLOAD ----------------
  const handleFileUpload = async (e: any) => {
    e.preventDefault();

    if (!file || !selectedRoleId) {
      toast.error("Select role and file");
      return;
    }

    setLoading(true);

    try {
      const parsedData = await parseResumeFromPdf(file);

      const result = await uploadResume(
        file,
        Number(selectedRoleId),
        parsedData
      );

      if (result?.error) throw new Error(result.error);

      toast.success("Resume uploaded successfully");
      setFile(null);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ROLE CREATE ----------------
  const handleCreateRole = async (e: any) => {
    e.preventDefault();

    try {
      const role = await createRole(newRoleName);

      const validSkills = roleSkills.filter((s) => s.name);

      if (validSkills.length > 0) {
        await addSkillsToRole(role.id, validSkills);
      }

      toast.success("Role created");

      setNewRoleName("");
      setRoleSkills([{ name: "", type: "required" }]);

      if (role?.id != null) {
        setSelectedRoleId(String(role.id));
      }

      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Role creation failed");
    }
  };

  // ---------------- COMPLAINT ----------------
  const handleComplaintSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await submitComplaint(userName, email, description);

      toast.success(`Routed to ${res?.department ?? "support"}`);

      setUserName("");
      setEmail("");
      setDescription("");
    } catch (error) {
      toast.error("Complaint failed");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">ATS Dashboard</h1>

        <Button variant="ghost" onClick={() => auth.logout()}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="hr">HR Dashboard</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
        </TabsList>

        {/* ---------------- UPLOAD ---------------- */}
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Resume</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-4">

                {/* ✅ FIXED SELECT (NO EMPTY VALUES) */}
                <Select
                  value={selectedRoleId}
                  onValueChange={(v) => setSelectedRoleId(v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent>
                    {roles
                      .filter((r) => r?.id != null)
                      .map((role, i) => (
                        <SelectItem
                          key={role.id ?? i}
                          value={String(role.id)}
                        >
                          {role?.name ?? "Unnamed Role"}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e: any) =>
                    setFile(e.target.files?.[0] ?? null)
                  }
                />

                <Button disabled={loading}>
                  {loading ? "Processing..." : "Upload"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- ROLES ---------------- */}
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Create Role</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleCreateRole} className="space-y-4">
                <Input
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Role name"
                />

                <Button type="submit">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- HR ---------------- */}
        <TabsContent value="hr">
          <Card>
            <CardHeader>
              <CardTitle>Candidates</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Exp</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {candidates.map((c, i) => (
                    <TableRow key={c?.id ?? i}>
                      <TableCell>{c?.name ?? "-"}</TableCell>
                      <TableCell>{c?.email ?? "-"}</TableCell>
                      <TableCell>{c?.skills ?? "-"}</TableCell>
                      <TableCell>{c?.experience ?? 0}</TableCell>
                      <TableCell>{c?.score ?? 0}</TableCell>
                      <TableCell>{c?.status ?? "Pending"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- COMPLAINTS ---------------- */}
        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>Submit Complaint</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleComplaintSubmit} className="space-y-3">
                <Input
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Textarea
                  placeholder="Complaint"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
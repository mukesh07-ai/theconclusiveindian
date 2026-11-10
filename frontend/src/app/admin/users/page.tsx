"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  Users,
  UserPlus,
  Search,
  Shield,
  KeyRound,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  AlertCircle,
  Clock,
  Lock,
} from "lucide-react";

interface AdminUserItem {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  roles: string[];
  must_change_password?: boolean;
  permissions?: string[];
  last_login_at?: string;
  created_at?: string;
}

const ROLES_INFO: Record<string, { label: string; desc: string; color: string }> = {
  super_admin: {
    label: "सुपर एडमिन",
    desc: "संपूर्ण सिस्टम, विन्यास, सुरक्षा एवं डेटाबेस नियंत्रण",
    color: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  admin: {
    label: "व्यवस्थापक (Admin)",
    desc: "सामग्री, विज्ञापन, पेज एवं असाइन किए गए उपयोगकर्ताओं का प्रबंधन",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  editor: {
    label: "संपादक (Editor)",
    desc: "समाचार समीक्षा, संपादन, अनुमोदन, शेड्यूलिंग एवं प्रकाशन",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  reporter: {
    label: "संवाददाता (Reporter)",
    desc: "आर्टिकल आलेख तैयार करना, मीडिया अपलोड एवं अनुमोदन हेतु प्रेषण",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  advertisement_manager: {
    label: "विज्ञापन प्रबंधक",
    desc: "विज्ञापन अभियान, प्लेसमेंट, रचनात्मक सामग्री एवं सीटीआर ट्रैकिंग",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  staff: {
    label: "स्टाफ सदस्य",
    desc: "केवल व्यवस्थापक द्वारा निर्धारित विशिष्ट मॉड्यूल्स तक सीमित पहुंच",
    color: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  },
};

const AVAILABLE_PERMISSIONS = [
  { id: "articles:create", label: "आर्टिकल निर्माण (Create Articles)" },
  { id: "articles:publish", label: "आर्टिकल प्रकाशन एवं अनुमोदन (Publish Articles)" },
  { id: "articles:delete", label: "आर्टिकल विलोपन (Delete Articles)" },
  { id: "pages:manage", label: "पेज व डायनेमिक सेक्शन नियंत्रण (Manage Pages)" },
  { id: "ads:manage", label: "विज्ञापन अभियान प्रबंधन (Manage Advertisements)" },
  { id: "media:manage", label: "मीडिया लाइब्रेरी अपलोड एवं नियंत्रण (Manage Media)" },
  { id: "users:manage", label: "उपयोगकर्ता एवं RBAC प्रबंधन (Manage Users)" },
  { id: "settings:manage", label: "वेबसाइट सेटिंग्स एवं विन्यास (Site Settings)" },
];

export default function AdminUsersPage() {
  const { user: currentUser } = useAdminAuth();
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [activeUser, setActiveUser] = useState<AdminUserItem | null>(null);

  // Forms
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "reporter",
    temporaryPassword: "",
    mustChangePassword: true,
    permissions: [] as string[],
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    role: "reporter",
    isActive: true,
    permissions: [] as string[],
  });

  const [generatedTempPassword, setGeneratedTempPassword] = useState<string | null>(null);
  const [copiedPass, setCopiedPass] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err: unknown) {
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    setActionSuccess(null);

    try {
      const res = await adminService.createUser({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        role: formData.role,
        temporary_password: formData.temporaryPassword || undefined,
        must_change_password: formData.mustChangePassword,
        permissions: formData.permissions,
      });

      setActionSuccess(`उपयोगकर्ता "${res.full_name}" सफलतापूर्वक बनाया गया!`);
      setShowAddModal(false);
      setFormData({
        fullName: "",
        email: "",
        role: "reporter",
        temporaryPassword: "",
        mustChangePassword: true,
        permissions: [],
      });
      fetchUsers();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "उपयोगकर्ता बनाने में त्रुटि");
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) return;
    setActionError(null);
    setActionSuccess(null);

    try {
      await adminService.updateUser(activeUser.id, {
        full_name: editFormData.fullName.trim(),
        email: editFormData.email.trim(),
        role: editFormData.role,
        is_active: editFormData.isActive,
        permissions: editFormData.permissions,
      });

      setActionSuccess("उपयोगकर्ता विवरण सफलतापूर्वक अद्यतन किए गए!");
      setShowEditModal(false);
      setActiveUser(null);
      fetchUsers();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "अपडेट में त्रुटि हुई");
    }
  };

  const handleResetPassword = async () => {
    if (!activeUser) return;
    setActionError(null);
    try {
      const res = await adminService.resetUserPassword(activeUser.id);
      setGeneratedTempPassword(res.temporary_password);
      setActionSuccess("नया अस्थाई पासवर्ड उत्पन्न किया गया!");
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "पासवर्ड रीसेट असफल रहा");
    }
  };

  const handleDeleteUser = async (userToDelete: AdminUserItem) => {
    if (!confirm(`क्या आप निश्चित रूप से "${userToDelete.full_name}" का खाता हटाना चाहते हैं?`)) {
      return;
    }

    try {
      await adminService.deleteUser(userToDelete.id);
      fetchUsers();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "उपयोगकर्ता हटाने में त्रुटि");
    }
  };

  const openEditModal = (userItem: AdminUserItem) => {
    setActiveUser(userItem);
    setEditFormData({
      fullName: userItem.full_name,
      email: userItem.email,
      role: userItem.roles[0] || "reporter",
      isActive: userItem.is_active,
      permissions: userItem.permissions || [],
    });
    setShowEditModal(true);
  };

  const openResetModal = (userItem: AdminUserItem) => {
    setActiveUser(userItem);
    setGeneratedTempPassword(null);
    setCopiedPass(false);
    setActionError(null);
    setShowResetModal(true);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRoleFilter === "all" || u.roles.includes(selectedRoleFilter);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-amber-500" />
            <span>उपयोगकर्ता एवं भूमिका प्रबंधन (Users & RBAC)</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            संवाददाताओं, संपादकों एवं प्रशासकों के खाते, अस्थाई पासवर्ड एवं विशेषाधिकार नियंत्रित करें
          </p>
        </div>

        <button
          onClick={() => {
            setActionError(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          <UserPlus className="w-4 h-4" />
          <span>नया खाता बनाएं</span>
        </button>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm flex items-center justify-between">
          <span>{actionSuccess}</span>
          <button onClick={() => setActionSuccess(null)} className="text-slate-400 hover:text-white text-xs">
            बंद करें
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center justify-between">
          <span>{actionError}</span>
          <button onClick={() => setActionError(null)} className="text-slate-400 hover:text-white text-xs">
            बंद करें
          </button>
        </div>
      )}

      {/* Filters & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="नाम या ईमेल से खोजें..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">भूमिका फ़िल्टर:</label>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">सभी भूमिकाएं (All Roles)</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="reporter">Reporter</option>
            <option value="advertisement_manager">Ad Manager</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">उपयोगकर्ता सूची लोड हो रही है...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="font-semibold text-white">कोई उपयोगकर्ता नहीं मिला</p>
            <p className="text-xs text-slate-500 mt-1">खोज मापदंड बदलें अथवा नया खाता जोड़ें।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">उपयोगकर्ता (User)</th>
                  <th className="p-4 font-semibold">भूमिका (Role)</th>
                  <th className="p-4 font-semibold">स्थिति (Status)</th>
                  <th className="p-4 font-semibold">अंतिम लॉगिन</th>
                  <th className="p-4 font-semibold text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((u) => {
                  const roleKey = u.roles[0] || "staff";
                  const roleCfg = ROLES_INFO[roleKey] || ROLES_INFO.staff;
                  return (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 text-sm">
                            {u.full_name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{u.full_name}</span>
                              {currentUser?.id === u.id && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-normal">
                                  आप (You)
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${roleCfg.color}`}
                        >
                          {roleCfg.label}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          {u.is_active ? (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>सक्रिय</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-rose-400 font-medium">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>निलंबित</span>
                            </span>
                          )}
                          {u.must_change_password && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                              अस्थाई पासवर्ड
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-xs text-slate-400">
                        {u.last_login_at ? (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>{new Date(u.last_login_at).toLocaleDateString("hi-IN")}</span>
                          </div>
                        ) : (
                          <span className="text-slate-600">अभी तक नहीं</span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openResetModal(u)}
                            className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
                            title="पासवर्ड रीसेट करें"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(u)}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                            title="प्रोफ़ाइल व अनुमतियाँ संपादित करें"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {currentUser?.id !== u.id && (
                            <button
                              onClick={() => handleDeleteUser(u)}
                              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                              title="खाता हटाएं"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Create User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-1">नया समाचार कक्ष उपयोगकर्ता जोड़ें</h2>
            <p className="text-xs text-slate-400 mb-6">
              क्लाइंट व्यवस्थापक अथवा पत्रकार/संपादक हेतु नया खाता बनाएं
            </p>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">पूरा नाम (Full Name)</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="उदा. अमित शर्मा"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">आधिकारिक ईमेल (Email Address)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="reporter@theconclusiveindian.in"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">सिस्टम भूमिका (System Role)</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="super_admin">Super Admin (संपूर्ण नियंत्रण)</option>
                  <option value="admin">Admin (सामग्री व उपयोगकर्ता व्यवस्थापक)</option>
                  <option value="editor">Editor (समीक्षा व प्रकाशन)</option>
                  <option value="reporter">Reporter (संवाददाता/ड्राफ्ट लेखक)</option>
                  <option value="advertisement_manager">Advertisement Manager (विज्ञापन प्रबंधक)</option>
                  <option value="staff">Staff (सीमित स्टाफ)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  {ROLES_INFO[formData.role]?.desc}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  प्रारंभिक अस्थाई पासवर्ड (Temporary Password - वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={formData.temporaryPassword}
                  onChange={(e) => setFormData({ ...formData, temporaryPassword: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="रिक्त छोड़ने पर स्वतः उत्पन्न होगा"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="mustChange"
                  checked={formData.mustChangePassword}
                  onChange={(e) => setFormData({ ...formData, mustChangePassword: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500"
                />
                <label htmlFor="mustChange" className="text-xs text-slate-300 select-none">
                  प्रथम लॉगिन पर पासवर्ड बदलना अनिवार्य करें (Force Password Change)
                </label>
              </div>

              {/* Granular Permissions */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  विशिष्ट अनुकूलित अनुमतियाँ (Custom Permissions)
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:bg-slate-800/40 cursor-pointer text-xs text-slate-300"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(perm.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData((prev) => ({
                            ...prev,
                            permissions: checked
                              ? [...prev.permissions, perm.id]
                              : prev.permissions.filter((p) => p !== perm.id),
                          }));
                        }}
                        className="w-3.5 h-3.5 rounded text-amber-500 bg-slate-900 border-slate-700"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20"
                >
                  खाता बनाएं
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit User */}
      {showEditModal && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-1">उपयोगकर्ता प्रोफ़ाइल संपादित करें</h2>
            <p className="text-xs text-slate-400 mb-6">{activeUser.email}</p>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">पूरा नाम</label>
                <input
                  type="text"
                  required
                  value={editFormData.fullName}
                  onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">सिस्टम भूमिका</label>
                <select
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="reporter">Reporter</option>
                  <option value="advertisement_manager">Advertisement Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={editFormData.isActive}
                  onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500"
                />
                <label htmlFor="isActiveToggle" className="text-xs text-slate-300 select-none">
                  खाता सक्रिय रखें (Account Active)
                </label>
              </div>

              {/* Granular Permissions */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  विशिष्ट अनुकूलित अनुमतियाँ
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:bg-slate-800/40 cursor-pointer text-xs text-slate-300"
                    >
                      <input
                        type="checkbox"
                        checked={editFormData.permissions.includes(perm.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setEditFormData((prev) => ({
                            ...prev,
                            permissions: checked
                              ? [...prev.permissions, perm.id]
                              : prev.permissions.filter((p) => p !== perm.id),
                          }));
                        }}
                        className="w-3.5 h-3.5 rounded text-amber-500 bg-slate-900 border-slate-700"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20"
                >
                  परिवर्तन सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {showResetModal && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">पासवर्ड रीसेट करें</h2>
            <p className="text-xs text-slate-400 mb-4">
              उपयोगकर्ता: <strong className="text-white">{activeUser.full_name}</strong> ({activeUser.email})
            </p>

            {generatedTempPassword ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30">
                  <p className="text-xs text-slate-400 mb-1">नया अस्थाई पासवर्ड उत्पन्न किया गया:</p>
                  <div className="flex items-center justify-between font-mono font-bold text-amber-400 text-base">
                    <span>{generatedTempPassword}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedTempPassword);
                        setCopiedPass(true);
                        setTimeout(() => setCopiedPass(false), 2000);
                      }}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {copiedPass ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  कृपया यह पासवर्ड क्लाइंट अथवा संवाददाता को सुरक्षित रूप से प्रेषित करें। अगली बार लॉगिन करने पर उन्हें तुरंत अपना नया निजी पासवर्ड सेट करने को कहा जाएगा।
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    पूर्ण हुआ
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  इस कार्रवाई से वर्तमान पासवर्ड निरस्त हो जाएगा एवं एक सुरक्षित अस्थाई पासवर्ड सृजित किया जाएगा।
                </p>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    रद्द करें
                  </button>
                  <button
                    onClick={handleResetPassword}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20"
                  >
                    अस्थाई पासवर्ड उत्पन्न करें
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

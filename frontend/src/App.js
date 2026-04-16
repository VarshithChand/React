import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API = "http://backend:5000";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/users`);
      const data = await res.json();
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    if (!form.first_name || !form.email) {
      setError("First Name and Email are required");
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (!res.ok) throw new Error("Failed to add user");
      
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        contact: ""
      });
      setError("");
      await fetchUsers();
    } catch (err) {
      setError("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);
        const res = await fetch(`${API}/users/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete user");
        await fetchUsers();
      } catch (err) {
        setError("Failed to delete user");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      padding: "2rem 1rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <div style={{
        maxWidth: "56rem",
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "2.25rem",
            fontWeight: 700,
            color: "#0f172a",
            marginBottom: "0.5rem",
            margin: "0 0 0.5rem 0"
          }}>User Management</h1>
          <p style={{
            fontSize: "1rem",
            color: "#475569",
            margin: 0
          }}>Manage your user database efficiently</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "0.5rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start"
          }}>
            <span style={{
              color: "#dc2626",
              fontWeight: 600,
              fontSize: "1.25rem",
              flexShrink: 0
            }}>⚠</span>
            <div>
              <p style={{
                color: "#991b1b",
                fontWeight: 500,
                marginBottom: "0.25rem",
                margin: "0 0 0.25rem 0"
              }}>Error</p>
              <p style={{
                color: "#b91c1c",
                fontSize: "0.875rem",
                margin: 0
              }}>{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid #e2e8f0",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: "1.5rem",
            margin: "0 0 1.5rem 0"
          }}>Add New User</h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}>
            {/* First Name */}
            <div>
              <label style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#475569",
                marginBottom: "0.5rem"
              }}>
                First Name <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="John"
                value={form.first_name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  color: "#1e293b",
                  backgroundColor: "#ffffff",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "transparent";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 2px #3b82f6";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            
            {/* Last Name */}
            <div>
              <label style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#475569",
                marginBottom: "0.5rem"
              }}>Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Doe"
                value={form.last_name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  color: "#1e293b",
                  backgroundColor: "#ffffff",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "transparent";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 2px #3b82f6";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            
            {/* Email */}
            <div>
              <label style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#475569",
                marginBottom: "0.5rem"
              }}>
                Email <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  color: "#1e293b",
                  backgroundColor: "#ffffff",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "transparent";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 2px #3b82f6";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            
            {/* Contact */}
            <div>
              <label style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#475569",
                marginBottom: "0.5rem"
              }}>Contact</label>
              <input
                type="tel"
                name="contact"
                placeholder="+1 (555) 000-0000"
                value={form.contact}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  color: "#1e293b",
                  backgroundColor: "#ffffff",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "transparent";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 2px #3b82f6";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>
          
          <button
            onClick={addUser}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = "#2563eb";
            }}
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "0.5rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              fontSize: "1rem",
              fontFamily: "inherit",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? (
              <>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
                Adding...
              </>
            ) : (
              <>
                <span>+</span>
                Add User
              </>
            )}
          </button>
        </div>

        {/* Users Table Card */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          marginBottom: "2rem"
        }}>
          <div style={{
            padding: "1.5rem",
            borderBottom: "1px solid #e2e8f0"
          }}>
            <h2 style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#0f172a",
              margin: 0
            }}>
              Users <span style={{ color: "#64748b", fontSize: "1.125rem" }}>({users.length})</span>
            </h2>
          </div>
          
          {users.length === 0 ? (
            <div style={{
              padding: "3rem",
              textAlign: "center"
            }}>
              <p style={{
                fontSize: "1.125rem",
                color: "#64748b",
                margin: 0
              }}>No users yet. Add one to get started!</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse"
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0"
                  }}>
                    <th style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#0f172a"
                    }}>First Name</th>
                    <th style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#0f172a"
                    }}>Last Name</th>
                    <th style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#0f172a"
                    }}>Email</th>
                    <th style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#0f172a"
                    }}>Contact</th>
                    <th style={{
                      padding: "1rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#0f172a"
                    }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        transition: "background-color 0.15s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <td style={{
                        padding: "1rem 1.5rem",
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        fontWeight: 500
                      }}>{user.first_name}</td>
                      <td style={{
                        padding: "1rem 1.5rem",
                        fontSize: "0.875rem",
                        color: "#475569"
                      }}>{user.last_name || "—"}</td>
                      <td style={{
                        padding: "1rem 1.5rem",
                        fontSize: "0.875rem",
                        color: "#475569"
                      }}>{user.email}</td>
                      <td style={{
                        padding: "1rem 1.5rem",
                        fontSize: "0.875rem",
                        color: "#475569"
                      }}>{user.contact || "—"}</td>
                      <td style={{
                        padding: "1rem 1.5rem",
                        fontSize: "0.875rem"
                      }}>
                        <button
                          onClick={() => deleteUser(user.id)}
                          disabled={loading}
                          onMouseEnter={(e) => {
                            if (!loading) e.target.style.backgroundColor = "#fee2e2";
                          }}
                          onMouseLeave={(e) => {
                            if (!loading) e.target.style.backgroundColor = "#fef2f2";
                          }}
                          style={{
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                            padding: "0.375rem 0.75rem",
                            border: "none",
                            borderRadius: "0.5rem",
                            cursor: loading ? "not-allowed" : "pointer",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            fontSize: "0.875rem",
                            fontFamily: "inherit",
                            opacity: loading ? 0.5 : 1
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "0.875rem",
          color: "#64748b"
        }}>
          <p style={{ margin: 0 }}>
            Total users: <span style={{ fontWeight: 600, color: "#0f172a" }}>{users.length}</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
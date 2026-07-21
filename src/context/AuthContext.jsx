import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "ecobazaar_users";
const SESSION_KEY = "ecobazaar_session";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem(SESSION_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const getStoredUsers = () => {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        } catch {
            return [];
        }
    };

    // TODO: replace with real POST /registration
    const register = ({ name, email, password, role }) => {
        const users = getStoredUsers();
        if (users.some((u) => u.email === email)) {
            throw new Error("An account with this email already exists");
        }
        const newUser = { _id: `u_${Date.now()}`, name, email, password, role };
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
        const { password: _pw, ...safeUser } = newUser;
        setUser(safeUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
        return safeUser;
    };

    // TODO: replace with real POST /login
    const login = (email, password) => {
        const users = getStoredUsers();
        const match = users.find((u) => u.email === email && u.password === password);
        if (!match) throw new Error("Invalid email or password");
        const { password: _pw, ...safeUser } = match;
        setUser(safeUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
        return safeUser;
    };

    // Dev-only helper: instantly log in as a given role without registering first.
    // Useful for testing ProtectedRoute during development — remove once real auth is wired.
    const devLoginAs = (role) => {
        const safeUser = { _id: `dev_${role}`, name: `Demo ${role}`, email: `${role}@demo.com`, role };
        setUser(safeUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
        return safeUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, devLoginAs, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
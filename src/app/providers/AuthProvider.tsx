import { createContext, useState, type ReactNode } from "react";

export type User = {
    username: string;
    password: string;
};

interface UserContext {
    user: User | null;
    signIn: (newUser: User | null, callback: () => void) => void;
    signOut: (callback: () => void) => void;
}

export const AuthContext = createContext<UserContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const signIn = (newUser: User | null, callback: () => void) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
        }
        callback();
    };
    const signOut = (callback: () => void) => {
        setUser(null);
        localStorage.removeItem("user");
        callback();
    };
    const value = {
        user,
        signIn,
        signOut,
    };
    return <AuthContext value={value}>{children}</AuthContext>;
}

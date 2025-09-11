"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, get, set } from "firebase/database";

import { auth, db, googleProvider } from "@/lib/firebase";
import { User, Address } from "@/types";

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<{ success: boolean, message: string}>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  signInWithGoogle: () => Promise<boolean>
}

interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("saint-paul-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get uid
      const uid = firebaseUser.uid;

      // Reference to user's data in Realtime Database
      const userRef = ref(db, `users/${uid}`)
      const snapshot = await get(userRef)

      if (!snapshot.exists()) {
        console.error("User profile not found in database")
        return false
      }

      const profile = snapshot.val();

      const address = profile.address ? {
          address: profile.address.address ?? "",
          street: profile.address.street ?? "",
          city: profile.address.city ?? "",
          state: profile.address.state ?? "",
          zipCode: profile.address.zipCode ?? "",
          country: profile.address.country ?? ""
      } : null
      
      const appUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        address: address ?? {} as Address,
        joinDate: profile.joinDate,
        totalSpent: 0,
        totalOrders: 0,
      }

      setUser(appUser);
      localStorage.setItem("saint-paul-user", JSON.stringify(appUser));
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 3); // +3 hour
      document.cookie = `loggedIn=true; path=/; expires=${expiry.toUTCString()}`;
      
      return true;

    } catch(error: any) {
      console.log("Login failed: ", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const signup = async (userData: SignupData): Promise<{ success: boolean, message: string }> => {
    setIsLoading(true)

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const firebaseUser = userCredential.user;
      const uid = firebaseUser.uid

      // 2. Construct user object
      const fullUser: User = {
        id: uid,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        // address: profileData.address,
        joinDate: new Date().toISOString().split("T")[0], // e.g. "2025-08-31"
        role: "user",
        totalSpent: 0,
        totalOrders: 0,
      }

      // 3. Store user profile in Realtime Database
      await set(ref(db, `users/${uid}`), fullUser)

      // 4. Set state and localStorage (optional)
      setUser(fullUser)
      localStorage.setItem("saint-paul-user", JSON.stringify(fullUser))

      return { success: true, message: "User created."};
    } catch(error) {
        console.error("Signup failed:", error)
        return { success: false, message: error instanceof Error ? error.message : "Couldn't sign up."};
    } finally {
      setIsLoading(false);
    }
  }

  const signInWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = userCredential.user;
      const uid = firebaseUser.uid;

      // 2. Check if user profile exists in DB
      const userRef = ref(db, `users/${uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // 3. If not, create profile with available info
        const profileData: User = {
          id: uid,
          email: firebaseUser.email || "",
          firstName: firebaseUser.displayName?.split(" ")[0] || "",
          lastName: firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
          phone: firebaseUser.phoneNumber || "",
          address: {
            address: '',
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
          joinDate: new Date().toISOString().split("T")[0],
          totalOrders: 0,
          totalSpent: 0,
        }

        await set(userRef, profileData);

        setUser(profileData)
        localStorage.setItem("saint-paul-user", JSON.stringify(profileData))
        return true
      }

      // 4. Else load existing profile
      const existingProfile = snapshot.val() as User
      setUser(existingProfile)
      localStorage.setItem("saint-paul-user", JSON.stringify(existingProfile))
      return true

    } catch(error) {
      console.log("Login failed: ", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("saint-paul-user")
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("saint-paul-user", JSON.stringify(updatedUser))
    setIsLoading(false)
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        setUser,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

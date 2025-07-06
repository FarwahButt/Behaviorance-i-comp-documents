"use client";
import { useSearchParams } from "next/navigation";
import Accnav from "../components/accnav";
import Afooter from "../components/afooter";


export default function Accsetting(){
    const searchParams = useSearchParams();
    const userName = searchParams.get("userName") || "User";
    return(
        <div>
            <Accnav/>
        <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {/* Change Password Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Change Password</h2>
          <form className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Change Password
            </button>
          </form>
        </div>

        {/* Email Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Email Settings</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Primary Email"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Secondary Email"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Update Emails
            </button>
          </form>
        </div>

        {/* Link Account */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Link Account</h2>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Link Social Account
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Two-Factor Authentication
          </h2>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
            Enable 2FA
          </button>
        </div>

        {/* Deactivate Account */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Deactivate Account</h2>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
    <Afooter/>
    </div>
    )
}
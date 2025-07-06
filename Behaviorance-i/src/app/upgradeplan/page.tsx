"use client";
import Accnav from "../components/accnav";
import Afooter from "../components/afooter";

export default function upgradeplan(){
    return(
        <div>
            <Accnav/>
<div className="flex flex-col items-center bg-gray-50 py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800">Find the perfect plan for your business</h1>
        <p className="text-lg text-gray-600 mt-2">Your current plan is Behaviorance Surveys</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="border rounded-lg bg-white shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Plan (Free)</h2>
          <p className="text-gray-600 mb-6">For individuals and small teams exploring basic behavioral compliance.</p>
          <ul className="space-y-2 text-gray-600">
            <li>✔ Single user access</li>
            <li>✔ 5 behavioral compliance reports per month</li>
            <li>✔ Limited behavioral data insights </li>
            <li>✔ Basic behavioral risk detection </li>
            <li>✔ Email-only support</li>
          </ul>
          <p className="mt-6 text-sm text-gray-400">Your current plan</p>
        </div>

        {/* Paid Plan */}
        <div className="border rounded-lg bg-white shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Professional Plan ($199/month)</h2>
          <p className="text-gray-600 mb-6">For mid-sized organizations needing advanced behavioral monitoring.</p>
          <ul className="space-y-2 text-gray-600">
            <li>✔ Up to 10 users</li>
            <li>✔ 20 behavioral compliance reports per month</li>
            <li>✔ Real-time behavioral risk alerts</li>
            <li>✔ Access to Secure Sense dashboards</li>
            <li>✔ Role-based access controls</li>
            <li>✔ Email and chat support</li>
          </ul>
          <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Buy now
          </button>
          <a href="/Start a free trial" className="hover:underline text-blue-500">
          Start a free trial
        </a>
        </div>

        {/* Custom Plan */}
        <div className="border rounded-lg bg-white shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Enterprise Plan ($599/month)</h2>
          <p className="text-gray-600 mb-6">For large organizations requiring comprehensive behavioral compliance and custom solutions.</p>
          <ul className="space-y-2 text-gray-600">
            <li>✔ Unlimited users</li>
            <li>✔ Unlimited compliance reports</li>
            <li>✔ AI-powered behavioral risk predictions</li>
            <li>✔ Integration with enterprise systems</li>
            <li>✔ Dedicated account manager</li>
            <li>✔ 24/7 priority support</li>
          </ul>
          <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Request quote
          </button>
          <a href="/Start a free trial" className="hover:underline text-blue-500">
          Start a free trial
        </a>
        </div>
      </div>
    </div>

    <Afooter/>
    </div>
    )
}
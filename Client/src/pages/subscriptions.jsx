import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/subscriptions") 
      .then((res) => {
        setSubs(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setSubs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-6">
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-3xl font-extrabold mb-2">
          My <span className="text-indigo-400">Subscriptions</span>
        </h1>
        <p className="text-slate-400 mb-8">
          Manage and track your active fitness plans
        </p>

        {loading ? (
          <p className="text-slate-400">Loading subscriptions...</p>
        ) : subs.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center">
            <p className="text-slate-400 text-lg">
              You haven’t subscribed to any plan yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subs.map((s) => (
              <div
                key={s._id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6
                           hover:border-indigo-500 transition-all duration-300 shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">{s.plan.title}</h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {s.plan.description}
                </p>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-400 font-semibold">
                    Active
                  </span>
                  <span className="text-slate-400">
                    Ends: {new Date(s.expiryDate).toLocaleDateString()}
                  </span>
                </div>

                <button
                  className="w-full mt-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500
                             text-white font-semibold transition"
                >
                  Continue Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/plans")
      .then((res) => {
        
        if (Array.isArray(res.data)) {
          setPlans(res.data);
        } else if (Array.isArray(res.data.plans)) {
          setPlans(res.data.plans);
        } else {
          setPlans([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const demoPlans = [
    {
      _id: "demo1",
      title: "Beginner Fat Loss",
      description:
        "A 30-day beginner-friendly fat loss plan designed by certified trainers.",
      price: 999,
    },
    {
      _id: "demo2",
      title: "Muscle Gain Pro",
      description:
        "Advanced muscle building program with progressive overload workouts.",
      price: 1499,
    },
    {
      _id: "demo3",
      title: "Home Workout Plan",
      description: "No-equipment home workouts to stay fit and consistent.",
      price: 799,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-indigo-500">Fit</span>PlanHub
          </h1>
          <button
            onClick={() => navigate("/subscriptions")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm"
          >
            My Subscriptions
          </button>
        </div>
      </header>

  
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold mb-4">
          Discover <span className="text-indigo-400">Powerful</span> Fitness
          Plans
        </h2>
        <p className="text-slate-400 max-w-2xl">
          Follow certified trainers, subscribe to expert-designed programs, and
          stay consistent with structured fitness plans.
        </p>
      </section>

     
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {loading ? (
          <p className="text-slate-400">Loading plans...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(plans.length > 0 ? plans : demoPlans).map((p) => (
              <div
                key={p._id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6
                   hover:border-indigo-500 transition-all duration-300
                   hover:-translate-y-1 shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>

                <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                  {p.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-indigo-400 font-bold text-xl">
                    ₹{p.price}
                  </span>

                  <button
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold
                       hover:bg-indigo-500 transition"
                  >
                    View Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

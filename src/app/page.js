'use client';
import { useState } from "react";

export default function Home() {
  const [formType, setFormType] = useState("updates");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Simple scrolling endorsement wall mock data
  const [endorsements, setEndorsements] = useState([
    { name: "Jane Doe", reason: "Doug always listens and takes action." },
    { name: "John Smith", reason: "He’s dedicated to protecting the WSR lifestyle." }
    // This will be dynamic when connected to a real backend
  ]);

  const formspreeAction = "https://formspree.io/f/xzbnpzjw"; // Replace with your own Formspree endpoint if needed

  const platformList = [
    "Manage the reserve fund to ensure we have the financial reserves to meet expected and unexpected demands.",
    "Minimize unnecessary assessment increases while preserving and enhancing the WSR unique lifestyle—serving everyone from young families to empty nesters.",
    "Ensure transparency in all board decisions, contracts, and spending.",
    "Provide wise financial stewardship with all vendors, contractors, and commitments—keep assessments from becoming unreasonable; require all changes to be thoroughly documented, communicated, and transparent.",
    "Powerful Homeowner Voice: As one of the first two homeowner-elected board members (with the rest still developer-appointed), I’ll champion real mechanisms for homeowner input, ensuring your voices and needs drive Windsong Ranch’s future."
  ];

  const timeline = [
    { date: "August 7", event: "Special Meeting Notice" },
    { date: "August 14, 6 PM", event: "Meet the Candidates" },
    { date: "August 20", event: "Voting Opens (Vote HOA Now)" },
    { date: "September 2", event: "Voting Closes" },
    { date: "September 3", event: "Results Announced" }
  ];

  function handleTypeChange(e) {
    setFormType(e.target.value);
    setForm({ name: "", email: "", phone: "", message: "" });
    setSubmitted(false);
  }

  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // If endorsement, add to wall (mocked for now)
    if (formType === "endorsement") {
      setEndorsements((prev) => [
        { name: form.name, reason: form.message }, ...prev
      ]);
    }
    // Submit to Formspree (will send to dbcharles@me.com)
    const formEl = e.target;
    formEl.submit();
  }

  return (
    <main className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-8 mb-8">
      {/* Top Banner */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-4xl font-extrabold text-wsr-red tracking-widest mb-1">VOTE</div>
        <div className="flex w-full justify-between items-center mb-3">
          <img src="/wsr-logo.png" alt="Windsong Ranch Logo" className="h-16" />
          <img src="/headshot.jpg" alt="Doug Charles" className="h-20 w-20 rounded-full border-4 border-wsr-navy shadow-lg" />
        </div>
        <h1 className="text-2xl font-bold text-wsr-navy text-center mt-2">Doug Charles for Windsong Ranch HOA Board of Directors</h1>
        <div className="text-center text-wsr-navy text-sm mt-1">
          dbcharles@me.com &bull; (317) 941-1212<br />
          4360 Mill Branch Drive, Prosper, TX
        </div>
      </div>

      {/* Bio */}
      <div className="mb-5 text-center">
        <span className="block font-semibold">Dedicated Neighbor • Proven Civic Leader • Financial Strategist</span>
        <span className="block text-wsr-navy mt-1 mb-1">
          With over 25 years of executive experience—including 2 terms on the Town of Prosper Planning & Zoning Commission, Bond Committee, and multiple HOA Boards—Doug brings deep expertise in budgeting, vendor management, and community engagement. <b>Strong advocate for Windsong Ranch and the broader West Side.</b>
        </span>
        <div className="bg-wsr-gray border-l-4 border-wsr-red p-2 italic text-wsr-navy">
          “I believe our assessments, contracts, and community resources should always reflect the will and interests of the homeowners—not just a few. My goal is to <b>maintain and improve the Windsong Ranch lifestyle and exceptional amenities, today and tomorrow.</b>”
        </div>
      </div>

      {/* Platform */}
      <div className="mb-5">
        <div className="text-lg font-bold text-wsr-navy mb-2">My Commitments to Windsong Ranch:</div>
        <ul className="space-y-2">
          {platformList.map((pt, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-wsr-red text-xl mr-2">✔</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <div className="text-lg font-bold text-wsr-red mb-1">Election Timeline & Voting Rules</div>
        <ul className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-1 text-wsr-navy">
          {timeline.map((item, idx) => (
            <li key={idx} className="flex items-center">
              <span className="font-semibold">{item.date}:</span>
              <span className="ml-2">{item.event}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 font-bold text-wsr-navy">There is <span className="text-wsr-red">1 vote per address by a Title Owner</span>.</div>
      </div>

      {/* Endorsement Wall */}
      <div className="mb-8">
        <div className="text-md font-bold text-wsr-navy mb-1">Recent Endorsements</div>
        <div className="h-16 overflow-y-auto border rounded bg-wsr-gray p-2">
          <ul className="space-y-1">
            {endorsements.map((e, idx) => (
              <li key={idx}>
                <span className="font-semibold">{e.name}</span>
                {e.reason ? <span className="ml-1 text-xs text-wsr-navy italic">– {e.reason}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Get Involved Form */}
      <div className="mb-5">
        <div className="text-lg font-bold text-wsr-navy mb-2">Get Involved</div>
        {!submitted ? (
          <form action={formspreeAction} method="POST" onSubmit={handleSubmit} className="space-y-3">
            <select
              name="formType"
              value={formType}
              onChange={handleTypeChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="updates">Sign up for Email/Text Updates</option>
              <option value="endorsement">Endorse Doug</option>
              <option value="meeting">Request a Meeting</option>
              <option value="volunteer">Volunteer for Door Knocking</option>
              <option value="host">Host Home Meeting</option>
            </select>
            <input
              name="name"
              placeholder="Your Name"
              required
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={handleInputChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={handleInputChange}
            />
            {(formType === "updates" || formType === "volunteer") && (
              <input
                name="phone"
                type="tel"
                placeholder="Mobile Number (for text updates)"
                className="w-full border p-2 rounded"
                value={form.phone}
                onChange={handleInputChange}
              />
            )}
            {(formType === "endorsement" || formType === "meeting" || formType === "host") && (
              <textarea
                name="message"
                placeholder={formType === "endorsement" ? "Why do you endorse Doug?" : "Message"}
                className="w-full border p-2 rounded"
                value={form.message}
                onChange={handleInputChange}
                rows={3}
              />
            )}
            <button
              type="submit"
              className="bg-wsr-red text-white font-bold py-2 px-6 rounded hover:bg-red-800"
            >Submit</button>
          </form>
        ) : (
          <div className="bg-green-100 text-green-800 p-3 rounded text-center font-semibold">
            Thank you for your support! Your form was submitted.
          </div>
        )}
      </div>
    </main>
  );
}

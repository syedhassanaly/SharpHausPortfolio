"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactMessage } from "@/lib/api";

const initialState = { name: "", email: "", message: "", "bot-field": "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <form
      name="contact"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="bg-ink-800 p-6 sm:p-10 rounded-3xl border-2 border-brand-500/30 shadow-2xl"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Leave this field empty:
          <input
            name="bot-field"
            value={form["bot-field"]}
            onChange={onChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mb-5 sm:mb-8">
        <div>
          <label htmlFor="name" className="sr-only">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your Name"
            required
            minLength={2}
            maxLength={100}
            className="w-full px-5 sm:px-6 py-4 bg-ink-900 border-2 border-brand-500/30 rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            maxLength={150}
            value={form.email}
            onChange={onChange}
            placeholder="Your Email"
            required
            className="w-full px-5 sm:px-6 py-4 bg-ink-900 border-2 border-brand-500/30 rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <textarea
        id="message"
        rows={6}
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="Tell us about your project..."
        required
        minLength={10}
        maxLength={5000}
        className="w-full px-5 sm:px-6 py-4 bg-ink-900 border-2 border-brand-500/30 rounded-xl text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none transition-all mb-5 sm:mb-8 resize-none"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-8 py-4 sm:py-5 bg-gradient-to-r from-brand-500 to-brand-600 text-ink-900 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 size={20} className="animate-spin" />}
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p role="status" className="mt-4 flex items-center gap-2 text-emerald-400 text-sm sm:text-base">
          <CheckCircle2 size={18} /> Message sent successfully — we'll be in
          touch soon!
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 flex items-center gap-2 text-red-400 text-sm sm:text-base">
          <AlertCircle size={18} /> {errorMsg}
        </p>
      )}
    </form>
  );
}

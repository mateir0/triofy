"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactContent } from "@/content/contact";
import Button from "@/components/ui/Button";
import type { SelectField } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [customService, setCustomService] = useState("");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    contactContent.fields.forEach((field) => {
      if (field.required && !values[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === "email" && values[field.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field.name])) {
        newErrors[field.name] = "Please enter a valid email address";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setFormState("loading");
    try {
      const payload = {
        ...values,
        _honeypot: honeypot,
        ...(values.budget === "Custom Budget" && customBudget ? { budget: `Custom: ${customBudget}` } : {}),
        ...(values.service === "Custom" && customService ? { service: `Custom: ${customService}` } : {}),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-white text-2xl font-bold mb-2">{contactContent.success.heading}</h3>
        <p className="text-[#A7B0B8]">{contactContent.success.message}</p>
      </motion.div>
    );
  }

  if (formState === "error") {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚠</div>
        <h3 className="text-white text-2xl font-bold mb-2">{contactContent.error.heading}</h3>
        <p className="text-[#A7B0B8] mb-6">{contactContent.error.message}</p>
        <Button onClick={() => setFormState("idle")} variant="secondary">Try Again</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot — hidden from users, catches bots */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <input
          type="text"
          name="_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {contactContent.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-[#A7B0B8] mb-2">
            {field.label}
            {field.required && <span className="text-[#F4C542] ml-1">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
              rows={5}
              className="w-full bg-[#132331] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#A7B0B8]/50 focus:outline-none focus:border-[#F4C542]/50 transition-colors resize-none"
            />
          ) : field.type === "select" ? (
            <>
              <select
                id={field.name}
                name={field.name}
                value={values[field.name] ?? ""}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                className="w-full bg-[#132331] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F4C542]/50 transition-colors"
              >
                <option value="">{field.placeholder}</option>
                {(field as SelectField).options.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {field.name === "budget" && values.budget === "Custom Budget" && (
                <input
                  type="text"
                  id="customBudget"
                  name="customBudget"
                  placeholder="Enter your budget (e.g. $1,200/mo)"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  className="w-full mt-3 bg-[#132331] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#A7B0B8]/50 focus:outline-none focus:border-[#F4C542]/50 transition-colors"
                />
              )}
              {field.name === "service" && values.service === "Custom" && (
                <textarea
                  id="customService"
                  name="customService"
                  placeholder="Describe the service you're looking for..."
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  rows={3}
                  className="w-full mt-3 bg-[#132331] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#A7B0B8]/50 focus:outline-none focus:border-[#F4C542]/50 transition-colors resize-none"
                />
              )}
            </>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
              className="w-full bg-[#132331] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#A7B0B8]/50 focus:outline-none focus:border-[#F4C542]/50 transition-colors"
            />
          )}
          <AnimatePresence>
            {errors[field.name] && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors[field.name]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={formState === "loading"}
        className="w-full"
      >
        Send Message
      </Button>
    </form>
  );
}

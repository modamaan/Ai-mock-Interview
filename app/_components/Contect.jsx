"use client";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contect = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send message. Please try again.");
        return;
      }

      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-800">Get In Touch</h2>
      <p className="mt-4 text-lg text-gray-600">
        Have any questions? Reach out to us and we&apos;ll get back to you as
        soon as possible.
      </p>
      <div className="mt-8">
        <form onSubmit={onSubmit} className="max-w-xl mx-auto flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1">
            <Label htmlFor="contact-name">Your Name</Label>
            <Input
              id="contact-name"
              type="text"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="contact-email">Your Email</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="contact-message">Your Message</Label>
            <Textarea
              id="contact-message"
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contect;

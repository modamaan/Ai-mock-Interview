"use client";
import { db } from "@/utils/db";
import { Newsletter } from "@/utils/schema";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const Contect = () => {
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(name, email, message);

    if (name && email && message) {
      setLoading(true);
      try {
        const resp = await db.insert(Newsletter).values({
          newName: name,
          newEmail: email,
          newMessage: message,
          createdAt: moment().format("YYYY-MM-DD"),
        });

        if (resp) {
          toast("User Response recorded successfully");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          toast("Error recording response");
        }
      } catch (error) {
        console.error(error);
        toast("Error recording response");
      } finally {
        setLoading(false);
      }
    } else {
      toast("No data entered");
    }
  };
  return (
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-800">Get In Touch</h2>
      <p className="mt-4 text-lg text-gray-600">
        Have any questions? Reach out to us and we'll get back to you as soon as
        possible.
      </p>
      <div className="mt-8">
        <form onSubmit={onSubmit} className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleInputChange(setName)}
            className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={handleInputChange(setMessage)}
            className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg"
            rows="4"
          />
          <button
            type="submit"
            className="px-6 py-3 text-lg font-semibold bg-black text-white rounded-lg shadow-lg hover:bg-gray-700"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contect;

"use client";

import { useEffect } from "react";
import { clearRegistration } from "@/lib/registration";

/** The booking is done once the visitor reaches the LMS, so the stored form data goes. */
export function ClearRegistration() {
  useEffect(() => clearRegistration(), []);
  return null;
}

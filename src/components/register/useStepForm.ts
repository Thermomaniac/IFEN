"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { REGISTER_PATH } from "@/data/course";
import { saveStep, useRegistration, type Fields } from "@/lib/registration";
import { validate, type Errors, type FieldRule } from "@/lib/registrationForm";
import { markStepNavigation } from "./StepLayout";

/**
 * Values live in the registration store and are saved on every keystroke, so
 * Go Back, the browser back button or a reload never lose what was typed.
 * Errors appear on submit, or on blur once a field has content; fixing a field
 * clears its message straight away.
 */
export function useStepForm(
  step: "participant" | "billing",
  rules: FieldRule[],
  next: string,
  defaults: Fields = {},
) {
  const stored = useRegistration()[step];
  const values: Fields = { ...defaults, ...stored };
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const recheck = (name: string, nextValues: Fields) => {
    const rule = rules.find((r) => r.name === name);
    if (!rule) return;
    const message = validate([rule], nextValues)[name];
    setErrors((prev) => {
      const rest = { ...prev };
      delete rest[name];
      return message ? { ...rest, [name]: message } : rest;
    });
  };

  const onChange = (name: string, value: string) => {
    const nextValues = { ...values, [name]: value };
    saveStep(step, nextValues);
    if (errors[name]) recheck(name, nextValues);
  };

  const onBlur = (name: string) => {
    if (attempted || values[name]?.trim()) recheck(name, values);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(rules, values);
    setErrors(found);
    setAttempted(true);
    if (Object.keys(found).length > 0) {
      // Wait a frame so the summary exists before moving focus to it.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    saveStep(step, values);
    markStepNavigation();
    router.push(`${REGISTER_PATH}/${next}`);
  };

  return { values, errors, onChange, onBlur, onSubmit, summaryRef };
}

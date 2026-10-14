"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { REGISTER_PATH } from "@/data/course";
import { saveStep, useRegistration, type Fields } from "@/lib/registration";
import { validate, type Errors, type FieldRule } from "@/lib/registrationForm";
import { markStepNavigation } from "./StepLayout";

/** Another booking's store (mentor booking): its values, how to save them and its route base. */
export type StepStore = {
  values: Fields;
  save: (values: Fields) => void;
  basePath: string;
};

/**
 * Values live in the registration store and are saved on every keystroke, so
 * Go Back, the browser back button or a reload never lose what was typed.
 * Errors appear on submit, or on blur once a field has content; fixing a field
 * clears its message straight away.
 *
 * `step` names the course registration step, or passes another flow's store.
 * `next` is the step slug to open after a valid submit, or a function to run instead
 * (a last step that pays rather than navigates).
 */
export function useStepForm(
  step: "participant" | "billing" | StepStore,
  rules: FieldRule[],
  next: string | (() => void),
  defaults: Fields = {},
) {
  const registration = useRegistration();
  const {
    values: stored,
    save,
    basePath,
  }: StepStore = typeof step === "string"
    ? {
        values: registration[step],
        save: (fields) => saveStep(step, fields),
        basePath: REGISTER_PATH,
      }
    : step;
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
    save(nextValues);
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
    save(values);
    if (typeof next === "function") return next();
    markStepNavigation();
    router.push(`${basePath}/${next}`);
  };

  return { values, errors, onChange, onBlur, onSubmit, summaryRef };
}

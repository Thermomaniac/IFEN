import { redirect } from "next/navigation";
import { REGISTER_PATH } from "@/data/course";

export default function RegisterIndex() {
  redirect(`${REGISTER_PATH}/participant`);
}

import API_BASE_URL from "@/config";
import PersonalCabinet from "@/src/components/PersonalCabinet/PersonalCabinet";
import { User } from "@/src/types/types";
import axios, { AxiosError } from "axios";

export default function Persolal() {
  return (
    <section>
      <PersonalCabinet />
    </section>
  );
}

import DashWrapper from "@/Components/Wrappers/DashWrapper";
import LogIncheckWrapper from "@/Components/Wrappers/LogIncheckWrapper";
import DashboardPage from "@/Components/Pages/DashboardPage";
import Image from "next/image";
import { Spinner } from "react-bootstrap";

export default function Home() {
  return (
    <div className=" " >
        <DashWrapper>
      
          <DashboardPage />
        </DashWrapper>

    </div>
  );
}

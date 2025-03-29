import Image from "next/image";
import HomeContent from "./components/HomeContent";


export const metadata = {
  title: "Home : Work Manager"
}
export default function Home() {
  return (
   <div>
     <div><HomeContent/></div>
    
   </div>
  );
}

import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Page = () => {
  const cookies = new Cookies();
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
    cookies.remove("userid");
  }, []);
  return <></>;
};

export default Page;

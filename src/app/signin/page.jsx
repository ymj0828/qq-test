"use client";
import { useGetRecipientsList } from "@/hooks/recipients";

const SignInPage = () => {
  const { data } = useGetRecipientsList();
  console.log(data);
  return (
    <>
      <div>SignInPage</div>
    </>
  );
};

export default SignInPage;

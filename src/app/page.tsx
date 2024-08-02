'use client'
import { addCategories } from "@/actions/category";
import { Button } from "@/components/ui/button";
// import {auth,signOut} from "@/auth"
import {useSession, signOut} from "next-auth/react"
export default function Home() {
  // const session = await auth()
  // console.log(session)
  const session = useSession()
  console.log(session)
  const makeCategories = async () => {
    await addCategories()
  }
  return (
    <main>
      {/* {JSON.stringify(session)} */}
      {/* <Button onClick={() => signOut()}>Signout</Button> */}
      {/* {JSON.stringify(session)} */}
      <Button onClick={makeCategories}>Make</Button>
    </main>
  );
}

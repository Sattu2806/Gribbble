import { Suspense } from "react";
import ShowPage from "./(Show)/_components/Homepage";

export default function Home() {

  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <ShowPage/>
      </Suspense>
    </main>
  );
}

import Navbar from "@/app/(Show)/_components/Nav/Navbar";
import ProfileInfo from "./ProfileInfo";
import Menu from "./Menu";

export default function ProfileLayout ({
    children,
    params
}:{
    children: React.ReactNode;
    params:{
        userId:string
    }
}) {
    return(
        <section>
            <Navbar />
            <ProfileInfo/>
            <Menu params={params} />
            {children}
        </section>
    )
}
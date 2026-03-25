"use client"
import { useRouter } from "next/navigation";
import { courses, userProgress } from "@/utils/schema"
import Card from "./Card";
import { useTransition,useEffect } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import {usePathname} from 'next/navigation'
import { toast } from "sonner";


type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}


export const List = ({courses,activeCourseId}:Props)=>{
    const pathname = usePathname()
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const onClick = (id: number)=>{
        if(pending) return



        if(id === activeCourseId){            
            if (pathname === "/dashboard/courses") {
                return router.push('/dashboard/learn');
            } else {
                return router.push('/learn');
            }
        }

        startTransition(()=>{
            upsertUserProgress(id)
            .catch(()=> toast.error("Something went wrong"))
        })
    }
   
    return(
        <div className="pt-6 grid grid-cols-2 gap-2 lg:grid-cols-5 lg:gap-4 p-3" >
            {courses.map((course)=>(
                <Card key={course.id}
                id={course.id}
                title={course.title}
                imageSrc={course.imageSrc}
                onClick={onClick}
                disabled={pending}
                active={course.id === activeCourseId} />
            ))}
        </div>
    )
}
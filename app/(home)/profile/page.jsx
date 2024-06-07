
"use client";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";

export default function Page() {
    const { data: session, status } = useSession();
    const user = session?.user;
    return (
        <div className="w-full max-w-[600px] mx-auto">
            {status === "authenticated" ? (
                <div className="flex flex-col gap-4  rounded-lg bg-gray-50 px-6">
                    <div>
                        <Label className="font-semibold">電郵</Label>
                        {/* <Label className="font-semibold">Email</Label> */}
                        
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <Label className="font-semibold">英文名</Label>
                        {/* <Label className="font-semibold">English name</Label> */}
                        <p>{user.englishName}</p>
                    </div>
                    <div>
                        <Label className="font-semibold">英文姓</Label>
                        {/* <Label className="font-semibold">English surname</Label> */}
                        <p>{user.englishSurname}</p>
                    </div>
                    <div>
                        <Label className="font-semibold">中文名</Label>
                        {/* <Label className="font-semibold">Chinese name</Label> */}
                        <p>{user.chineseName}</p>
                    </div>
                    <div>
                        <Label className="font-semibold">中文姓</Label>
                        {/* <Label className="font-semibold">Chinese surname</Label> */}
                        <p>{user.chineseSurname}</p>
                    </div>
                    <div>
                        <Label className="font-semibold">地址</Label>
                        {/* <Label className="font-semibold">Chinese surname</Label> */}
                        <p>{user.address || "尚未填寫"}</p>
                    </div>
                    <div>
                        <Label className="font-semibold">電話</Label>
                        <div>
                            {user.code}
                            &nbsp;
                            {user.phone}
                        </div>
                    </div>
                    <div>
                        <Label className="font-semibold">是否同意接收推廣資訊</Label>
                        {/* <Label className="font-semibold">Promotion recevial</Label> */}
                        <p>{user.promotion ? "YES" : "NO"}</p>
                    </div>
                    <div>
                        <Label className="font-semibold">狀態</Label>
                        {/* <Label className="font-semibold">Status</Label> */}
                        <p>{user.status}</p>
                    </div>
                </div>
            ) : status === "unauthenticated" ? (
                <div>
                    尚未登录
                </div>
            ) : null
            }
        </div >
    );
}
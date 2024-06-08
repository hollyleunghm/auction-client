
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import codeList from "@/lib/code";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
export default function Page() {
    const { data: session, status } = useSession();
    const onSubmit = (data) => {
        data.promotion = data.promotion === "1" ? true : false;
        mutation.mutate(data);
    }
    const mutation = useMutation({
        mutationFn: async (data) => {
            let result = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return await result.json();
        }
    })
    const form = useForm({
        defaultValues: {}
    });
    const {
        register,
        handleSubmit,
        reset,
        watch
    } = form;
    useEffect(() => {
        if (status === "authenticated") {
            session.user.promotion = session.user.promotion ? "1" : "0";
            reset(session.user);
        }
    }, [status]);
    useEffect(() => { }, [mutation.data]);
    return (
        <div className="w-full max-w-[800px] mx-auto">
            {status === "authenticated" ? (
                <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col rounded-lg bg-gray-50 px-6 gap-4">
                    <div className="flex gap-4 w-full items-end justify-between">
                        <div className="w-full">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="Email" required {...register("email")} readOnly />
                        </div>
                        <div>
                            <Link href="edit/email">
                                <Button color="primary">更換電郵</Button>
                            </Link>
                        </div>
                    </div>
                    <div >
                        <Label htmlFor="englishName">English name</Label>
                        <Input id="englishName" name="englishName" placeholder="English name" required {...register("englishName")} />
                    </div>
                    <div >
                        <Label htmlFor="englishSurname">English surname</Label>
                        <Input id="englishSurname" name="englishSurname" placeholder="English surname" required {...register("englishSurname")} />
                    </div>
                    <div >
                        <Label htmlFor="chineseName">Chinese name</Label>
                        <Input id="chineseName" name="chineseName" placeholder="Chinese name" required {...register("chineseName")} />
                    </div>
                    <div >
                        <Label htmlFor="chineseSurname">Chinese surname</Label>
                        <Input id="chineseSurname" name="chineseSurname" placeholder="Chinese surname" required {...register("chineseSurname")} />
                    </div>
                    <div >
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" name="address" placeholder="address" required {...register("address")} />
                    </div>
                    <div >
                        <Label htmlFor="phone">Phone</Label>
                        <div className="flex gap-4">
                            <select className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm " name="" id="" {...register("countryAndRegion")}>
                                {
                                    codeList.map((item, index) => {
                                        return (
                                            <option key={index} value={item.en}>
                                                <div className="w-full leading-9">
                                                    {item.cn}{item.code}
                                                </div>
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder=""
                                required
                                pattern="[0-9]*"
                                {...register("phone")}
                            /> </div>
                    </div>
                    <div >
                        <Label htmlFor="promotion">Promotion recevial</Label>
                        {session.user.promotion.toString()}
                        <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" {...register("promotion")}>
                            <option value="1" className="h-9">Yes</option>
                            <option value="0" className="h-9">No</option>
                        </select>
                    </div>
                    <div>
                        <Button className="w-full bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" type="submit"  >Submit</Button>
                    </div>
                </form>
            ) : status === "unauthenticated" ? (
                <div>
                    尚未登录
                </div>
            ) : null
            }
        </div >
    );
}
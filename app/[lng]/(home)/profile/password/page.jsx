
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm, } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";

import {
    useMutation
} from "@tanstack/react-query";
export default function Page() {

    const mutation = useMutation({
        mutationFn: async (data) => {
            let result = await fetch("/api/password/", {
                body: JSON.stringify(data),
                method: "POST"
            });
            return await result.json();
        },
    });
    const onSubmit = (data) => {
        if (data.newPassword1 !== data.newPassword2) {
            toast.error("密碼不一致");
        }
        mutation.mutate(data);
    };
    const form = useForm({
        defaultValues: {}
    });
    const {
        register,
        handleSubmit
    } = form;
    useEffect(() => {
        console.log(mutation.data);
        if (mutation.data) {

            let res = mutation.data;
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.msg);
            }
        }
    }, [mutation]);
    return (
        <div className="w-full max-w-[800px] mx-auto">
            <ToastContainer autoClose={2000} position="top-center" />

            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col rounded-lg bg-gray-50 p-6 gap-4">
                <div>
                    <Label>舊密碼</Label>
                    <Input
                        type="password"
                        placeholder="舊密碼"
                        required
                        minLength={6}
                        maxLength={20}
                        {...register("password")}
                    />
                </div>

                <div>
                    <Label>新密碼</Label>
                    <Input
                        type="password"
                        placeholder="新密碼"
                        required
                        minLength={6}
                        maxLength={20}
                        {...register("newPassword1")}
                    />
                </div>
                <div>
                    <Label>確認新密碼</Label>
                    <Input
                        type="password"
                        placeholder="確認新密碼"
                        required
                        minLength={6}
                        maxLength={20}
                        {...register("newPassword2")}
                    />
                </div>

                <div>
                    <Button disabled={mutation.isPending} className="w-full  bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" type="submit">Submit</Button>
                </div>
            </form>

        </div >
    );
}
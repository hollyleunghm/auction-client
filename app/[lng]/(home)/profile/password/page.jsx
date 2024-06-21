
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm, } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "@/app/i18n/client";

import {
    useMutation
} from "@tanstack/react-query";
export default function Page({ params }) {
    const { t } = useTranslation(params.lng);
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
            toast.error(t("PasswordsAreInconsistent"));
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
                    <Label>{t("oldPassword")}</Label>
                    <Input
                        type="password"
                        placeholder={t("oldPassword")}
                        required
                        minLength={6}
                        maxLength={20}
                        {...register("password")}
                    />
                </div>

                <div>
                    <Label>{t("newPassword")}</Label>
                    <Input
                        type="password"
                        placeholder={t("newPassword")}
                        required
                        minLength={6}
                        maxLength={20}
                        {...register("newPassword1")}
                    />
                </div>
                <div>
                    <Label>{t("confirmNewPassword")}</Label>
                    <Input
                        type="password"
                        placeholder={t("confirmNewPassword")}
                        required
                        minLength={6}
                        maxLength={20}
                        {...register("newPassword2")}
                    />
                </div>

                <div>
                    <Button disabled={mutation.isPending} className="w-full  bg-[#f0d300] text-black transition-all hover:bg-[#f0d300] hover:opacity-80" type="submit">{t("submit")}</Button>
                </div>
            </form>

        </div >
    );
}

"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import codeList from "@/lib/code";
export default function Page() {

    const { data: session, status } = useSession();
    const onSubmit = (data) => console.log(data)
    const [readOnly, setReadOnly] = useState(false);
    const form = useForm({
        defaultValues: {}
    });
    const {
        register,
        handleSubmit,
        reset,
        control,
        watch
    } = form;
    useEffect(() => {
        if (status === "authenticated") {
            reset(session.user);
        }
    }, [status])
    const f = watch();
    return (
        <div className="w-full max-w-[800px] mx-auto">
            {JSON.stringify(session)}
            {status === "authenticated" ? (
                <form action="" onSubmit={handleSubmit} className="flex flex-col rounded-lg bg-gray-50 px-6 gap-4">
                    <div >
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" placeholder="Email" required {...register("email")} />
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
                        <Label htmlFor="phone">Phone</Label>
                        <div className="flex gap-4">
                            <Controller
                                control={control}
                                name="countryAndRegion"
                                render={({ field }) => (
                                    <Select className="w-72" onValueChange={field.onChange} defaultValue={session.user.countryAndRegion}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select countryAndRegion code" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                codeList.map((item, index) => {
                                                    return (
                                                        <SelectItem key={index} value={item.en}>{item.cn}{item.code}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                )}
                            />
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
                        <Controller
                            control={control}
                            name="promotion"
                            render={
                                ({ field }) => (
                                    <Select id="promotion" onValueChange={field.onChange} defaultValue={session.user.promotion ? "1" : "0"}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Promotion recevial" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Yes</SelectItem>
                                            <SelectItem value="0">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )
                            }
                        >

                        </Controller>
                    </div>
                    <div >
                        <Label htmlFor="status">Status</Label>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <Select id="status" onValueChange={field.onChange} required defaultValue={session.user.status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Activated">Activated</SelectItem>
                                        <SelectItem value="Deactivated">Deactivated</SelectItem>
                                    </SelectContent>
                                </Select>)}>

                        </Controller>
                    </div>

                    <div>
                        {/* disabled={mutation.isPending} */}
                        <Button className="w-full" type="submit"  >Submit</Button>
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
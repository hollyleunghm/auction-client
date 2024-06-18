
"use client";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/app/i18n/client";
export default function Page({ user, lng }) {
    const { t } = useTranslation(lng);
    return (
        <div className="w-full max-w-[600px] mx-auto">
            <div className="flex flex-col gap-4  rounded-lg bg-gray-50 px-6">
                <div>
                    <Label className="font-semibold">{t("email")}</Label>
                    {/* <Label className="font-semibold">Email</Label> */}

                    <p>{user.email}</p>
                </div>
                <div>
                    <Label className="font-semibold">{t("englishName")}</Label>
                    {/* <Label className="font-semibold">English name</Label> */}
                    <p>{user.englishName}</p>
                </div>
                <div>
                    <Label className="font-semibold">{t("englishSurname")}</Label>
                    {/* <Label className="font-semibold">English surname</Label> */}
                    <p>{user.englishSurname}</p>
                </div>
                <div>
                    <Label className="font-semibold">{t("chineseName")}</Label>
                    {/* <Label className="font-semibold">Chinese name</Label> */}
                    <p>{user.chineseName}</p>
                </div>
                <div>
                    <Label className="font-semibold">{t("chineseSurname")}</Label>
                    {/* <Label className="font-semibold">Chinese surname</Label> */}
                    <p>{user.chineseSurname}</p>
                </div>
                <div>
                    <Label className="font-semibold">{t("address")}</Label>
                    {/* <Label className="font-semibold">Chinese surname</Label> */}
                    <p>{user.address || t("notFilledInYet")}</p>
                </div>
                <div>
                    <Label className="font-semibold">{t("phone")}</Label>
                    <div>
                        {user.code}
                        &nbsp;
                        {user.phone}
                    </div>
                </div>
                <div>
                    <Label className="font-semibold">{t("receivePromotional")}</Label>
                    {/* <Label className="font-semibold">Promotion recevial</Label> */}
                    <p>{user.promotion ? "YES" : "NO"}</p>
                </div>
                <div>
                    <Label className="font-semibold">{t("status")}</Label>
                    {/* <Label className="font-semibold">Status</Label> */}
                    <p>{user.status === "1" ? t("activated") : t("deactivated")}</p>
                </div>
            </div>
        </div >
    );
}
"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
// ...

export async function authenticate(
    prevState,
    formData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "認證失敗";
                default:
                    return "服務器内部錯誤";
            }
        }
        throw error;
    }
}
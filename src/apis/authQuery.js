import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "./auth";
import { redirect } from "react-router";
export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async ({ email, password }) => {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetchLogin({ email, password });
        },
        onError: (error, variables) => {
            console.error(`Error logging in:`, error);
            throw error; // Throw the error after logging it
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data?.data.token);
            console.log('reponse data', data)
            console.log(`Successfully logged in!`);
        },
        onSettled: () => {
        }
    })
}



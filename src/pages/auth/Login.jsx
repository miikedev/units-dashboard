

import { useEffect, useState } from "react";
import { Button, Form, Input } from "@heroui/react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router";
import { useLoginMutation } from "@/apis/authQuery";
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(null);
    const { data, mutate, isSuccess, isError, error, isPending } = useLoginMutation();
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        setSubmitted(data);

        mutate(data)

    };
    useEffect(() => {
        if (isSuccess) {
            // Show success message
            // Navigate to dashboard after a short delay
            const timer = setTimeout(() => {
                navigate("/dashboard")
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [isSuccess, navigate])

    console.log(submitted)

    return (
        <Card className="py-4 max-w-[350px]">
            <CardHeader className="pb-0 pt-2 px-3 flex-col items-center text-start w-full">
                <Image src={Logo} alt="Logo" className="rounded-full h-11 w-11" />
                <h1 className="text-2xl font-bold text-start">Login</h1>
                <p className="text-small text-default-400 text-center mt-2">ကာကွယ်ရေးဝန်ကြီးဋ္ဌာန ခန့်အပ်ခြင်းဆိုင်ရာ အချက်အလက်များ</p>
            </CardHeader>
            <CardBody>
                <Form className="w-full max-w-xs flex flex-col gap-4 my-4" validationBehavior="native" onSubmit={onSubmit}>
                    <Input
                        size="md"
                        radius="none"
                        isRequired
                        errorMessage="Please enter a valid email"
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        className="bg-none"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onValueChange={setEmail}
                    />
                    <Input
                        size="md"
                        radius="none"
                        isRequired
                        errorMessage="Please enter a valid password"
                        label="Password"
                        labelPlacement="outside"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onValueChange={setPassword}
                    />
                    <Button
                        type="submit"
                        size="md"
                        color="default"
                        disabled={isPending}
                        radius="none"
                    >
                        {isPending ? "Submitting..." : isSuccess ? "Success!" : "Submit"}
                    </Button>
                    {isError && <p className="text-red-500 text-sm mt-2">{error?.message || "An error occurred during login."}</p>}
                    {/* {submitted && (
                        <div className="text-small text-default-500">
                            You submitted: <code>{JSON.stringify(submitted)}</code>
                        </div>
                    )} */}
                </Form>
            </CardBody>
        </Card>
    );
}


export default Login
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loader";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace("/dashboard");
  };

  return (
    <main className="flex items-center justify-center h-full">
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) setSubmitError("");
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full justify-center sm:w-[400px] space-y-6 flex flex-col"
        >
          <Link
            href="/"
            className="
          w-full
          flex
          justify-left
          items-center"
          >
            {/* <Image
              src={"/vercel.svg"}
              alt="Logo of the application"
              width={50}
              height={50}
            /> */}
            <span
              className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
            >
              RealEdt.
            </span>
          </Link>
          <FormDescription
            className="
        text-foreground/60"
          >
            <p className="font-semibold text-white text-sm">
              An all-In-One Collaboration and Productivity Platform
            </p>
          </FormDescription>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            type="submit"
            className="w-full p-6"
            size="lg"
            disabled={isLoading}
          >
            {!isLoading ? "Login" : <Loader />}
          </Button>
          <span className="self-container">
            <span className="text-white font-semibold">
              Dont have an account?{" "}
            </span>
            <Link href="/signup" className="text-primary">
              Sign Up
            </Link>
          </span>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;

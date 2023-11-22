"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Modal from "@/components/ui/modal";
import { onClickLoginClose, onClickRegisterOpen } from "@/redux/modalSlice";
import { useDispatch } from "react-redux";
import AuthButton from "@/components/ui/auth-button";
import { signIn } from "next-auth/react";

// !! Form Schema
const formSchema = z.object({
  email: z.string({
    required_error: "Title is required",
  }),
  password: z.string({
    required_error: "Title is required",
  }),
});

// !! Interface
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInFormModal({ isOpen, onClose }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ** Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ** Handle Form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // !!
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (response?.ok) {
        form.reset();
        dispatch(onClickLoginClose());
        toast({
          description: "Login successfully",
        });
        router.refresh();
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Cannot login to your account, please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // ** Hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Welcome back"
      description="Login to your BooQnb account"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="booqnb@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full font-bold"
            disabled={isLoading}
            type="submit"
          >
            Login
          </Button>

          <div className="space-y-2 pt-4">
            <AuthButton
              icon="/icons/google-icon.svg"
              title="Continue with Google"
              onClickHandler={() => signIn("google")}
            />
            <AuthButton
              icon="/icons/github-icon.svg"
              title="Continue with Github"
              onClickHandler={() => signIn("github")}
            />
          </div>

          <div className="flex items-center text-xs justify-center gap-x-2 py-2">
            <p className="text-muted-foreground">First time using BooQnb ?</p>
            <p
              className="font-bold bg-transparent cursor-pointer hover:underline"
              onClick={() => {
                dispatch(onClickLoginClose());
                dispatch(onClickRegisterOpen());
              }}
            >
              Create an account
            </p>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

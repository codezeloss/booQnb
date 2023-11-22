"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { onClickLoginClose } from "@/redux/modalSlice";
import Modal from "@/components/ui/modal";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/ui/heading";
import { categories } from "@/components/navbar/Categories";
import CategoryInput from "@/components/ui/category-input";
import useCountries from "@/hooks/useCountries";
import dynamic from "next/dynamic";
import Counter from "@/components/Counter";

// !! Form Schema
const formSchema = z.object({
  category: z.string({
    required_error: "Category is required",
  }),
  location: z.string({
    required_error: "Location is required",
  }),
  guestCount: z.number({
    required_error: "Quest count is required",
  }),
  roomCount: z.number({
    required_error: "Room count is required",
  }),
  bathroomCount: z.number({
    required_error: "Bathroom count is required",
  }),
  imageSrc: z.string({
    required_error: "Image is required",
  }),
  price: z.number({
    required_error: "Price is required",
  }),
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});

// !! Interface
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal({ isOpen, onClose }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAll, getByValue } = useCountries();

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
  }, [step]);

  // **

  // ** Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: "",
      guestCount: 0,
      roomCount: 0,
      bathroomCount: 0,
      imageSrc: "",
      price: 0,
      title: "",
      description: "",
    },
  });

  const category = form.watch("category");
  const location = form.watch("location");
  const guestCount = form.watch("guestCount");
  const roomCount = form.watch("roomCount");
  const bathroomCount = form.watch("bathroomCount");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

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

  // !! BODY CONTENT
  let bodyContent = (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <Heading
            title="Which of these describes your place ?"
            subtitle="Pick a category"
          />

          <FormControl>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {categories.map((item, index) => (
                <div key={index} className="col-span-1">
                  <CategoryInput
                    icon={item.icon}
                    label={item.label}
                    onClick={() => form.setValue("category", item.label)}
                    selected={category === item.label}
                  />
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <Heading
              title="Where is your place located ?"
              subtitle="Help guests find you!"
            />

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {getAll().map((item, index) => (
                  <SelectItem
                    key={index}
                    className="w-full flex items-center cursor-pointer "
                    value={item.value}
                  >
                    <span className="mr-2">{item.flag}</span> {item.label},{" "}
                    <span className="text-muted-foreground">{item.region}</span>
                  </SelectItem>
                ))}
              </SelectContent>
              <Map center={getByValue(location)?.latlng} />
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have ?"
        />

        <FormField
          control={form.control}
          name="guestCount"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormControl>
                <Counter
                  title="Guests"
                  subtitle="How many guests do you allow?"
                  value={guestCount}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomCount"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormControl>
                <Counter
                  title="Rooms"
                  subtitle="How many rooms do you have?"
                  value={roomCount}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bathroomCount"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormControl>
                <Counter
                  title="Bathrooms"
                  subtitle="How many bathrooms do you have?"
                  value={bathroomCount}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = <div>IMAGES</div>;
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = <div>DESCRIPTION</div>;
  }

  if (step === STEPS.PRICE) {
    bodyContent = <div>PRICE</div>;
  }

  return (
    <Modal
      title="BooQnb your Home!"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {bodyContent}

          <div className="flex items-center gap-x-2 pt-4">
            {step > 0 && (
              <Button
                variant="secondary"
                className="w-full font-bold"
                disabled={isLoading}
                type="button"
                onClick={onBack}
              >
                Back
              </Button>
            )}
            <Button
              variant="default"
              className="w-full font-bold"
              disabled={isLoading}
              type={actionLabel === "Next" ? "button" : "submit"}
              onClick={onNext}
            >
              {actionLabel}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
